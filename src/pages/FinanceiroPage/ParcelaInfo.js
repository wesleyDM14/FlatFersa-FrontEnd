import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";
import { FaCheck, FaFilePdf, FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { logoutUser } from "../../services/userService";
import {
    aprovarPagamento, editarValoresFatura, enviarComprovante, gerarCodigoPix,
    getFaturaById, registrarLeitura, reprovarPagamento
} from "../../services/financeiroService";

import {
    PrestacaoDetailMainContainer, PrestacaoDetailHeaderContainer, PrestacaoDetailHeaderTitle,
    PrestcaoDetailContentContainer, PrestacaoDetailLeftColumn, PrestacaoDetailRightColumn,
    PrestacaoDetailValueContainer, PrestacaoDetailLabel, PrestacaoDetailValue,
    PrestacaoDetailPagamentoContainer, QrCodePagamento, QrCodeCopiaEColaContainer, QrCodeCopiaECola,
    PrestacaoDetailButtonContainer, BackButton, SubmitButton, RejectButton,
    ComprovanteContainer, ComprovanteTitle, ComprovanteImg,
    LoadingContainer, PdfPreview,
} from "./FinanceiroPage.styles";

import { modalStyles } from "../../styles/ModalStyles";
import { FormInput } from "../../components/FormLib";
import { Image, FormInputArea, StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle, StyledFormArea, ButtonGroup } from "../ClientPage/ClientPage.styles";
import { FormInputLabelRequired } from "../ContractPage/ContractPage.styles";

const STATUS_LABELS = {
    PENDENTE: 'Pendente',
    EM_ANALISE: 'Em Análise',
    PAGO: 'Pago',
    ATRASADO: 'Atrasado',
    CANCELADO: 'Cancelado',
    CONTESTADO: 'Contestado'
};

const ParcelaInfo = ({ user }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();
    const { faturaId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [fatura, setFatura] = useState(null);

    const [pix, setPix] = useState(null);

    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    const [modalLeituraIsOpen, setModalLeituraIsOpen] = useState(false);
    const [modalPagamentoIsOpen, setModalPagamentoIsOpen] = useState(false);
    const [modalValoresIsOpen, setModalValoresIsOpen] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileType, setFileType] = useState(null);

    const isAdmin = user?.role === 'ADMIN';

    const handleLogout = () => logoutUser(navigate);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const f = await getFaturaById(faturaId);
            setFatura(f);

            if (f.status === 'PENDENTE' || f.status === 'ATRASADO') {
                const pixData = await gerarCodigoPix(faturaId);
                setPix(pixData);
            }
        } catch (error) {
            console.error("Erro ao carregar detalhes da fatura", error);
        } finally {
            setLoading(false);
        }
    }, [faturaId]);

    useEffect(() => {
        if (user && user.id) fetchAll();
    }, [user, fetchAll]);

    const handleAction = async (actionFn, ...args) => {
        setLoadingAction(true);
        try {
            await actionFn(...args);
            await fetchAll();
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao executar ação.");
        } finally {
            setLoadingAction(false);
        }
    };

    if (!user) return null;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading || !fatura ? (
                <LoadingContainer><ThreeDots color={'#4e4e4e'} /></LoadingContainer>
            ) : (
                <PrestacaoDetailMainContainer>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <PrestacaoDetailHeaderContainer style={{ border: 'none', padding: 0, margin: 0 }}>
                            <PrestacaoDetailHeaderTitle>
                                Fatura {new Date(fatura.mesReferencia).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                            </PrestacaoDetailHeaderTitle>
                            <span style={{
                                backgroundColor: fatura.status === 'PAGO' ? '#d1fae5' : '#fee2e2',
                                color: fatura.status === 'PAGO' ? '#059669' : '#dc2626',
                                padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.9rem'
                            }}>
                                {STATUS_LABELS[fatura.status] || fatura.status}
                            </span>
                        </PrestacaoDetailHeaderContainer>

                        <BackButton onClick={() => navigate(isAdmin ? '/financeiro' : '/meus-pagamentos')} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <FaArrowLeft /> Voltar
                        </BackButton>
                    </div>

                    <PrestcaoDetailContentContainer>
                        {/* COLUNA ESQUERDA: COMPROVANTE / PIX */}
                        <PrestacaoDetailLeftColumn>
                            <ComprovanteContainer>
                                <ComprovanteTitle>Pagamento / Comprovante</ComprovanteTitle>
                                {fatura.comprovanteUrl ? (
                                    <a href={fatura.comprovanteUrl} target="_blank" rel="noreferrer">
                                        <ComprovanteImg src={fatura.comprovanteUrl} alt="Comprovante" />
                                    </a>
                                ) : fatura.status === 'PAGO' ? (
                                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                                        <FaCheck size={50} color="#10b981" />
                                        <p style={{ color: '#10b981', fontWeight: 'bold' }}>Pago com Sucesso</p>
                                    </div>
                                ) : (
                                    <PrestacaoDetailPagamentoContainer>
                                        <p style={{ fontWeight: 'bold' }}>Escaneie para pagar:</p>
                                        {pix?.base64 && <QrCodePagamento src={pix.base64} />}
                                        {pix?.payload && (
                                            <>
                                                <p style={{ fontSize: '0.8rem', marginTop: 10 }}>Pix Copia e Cola:</p>
                                                <QrCodeCopiaEColaContainer>
                                                    <QrCodeCopiaECola>{pix.payload}</QrCodeCopiaECola>
                                                </QrCodeCopiaEColaContainer>
                                            </>
                                        )}
                                    </PrestacaoDetailPagamentoContainer>
                                )}
                            </ComprovanteContainer>
                        </PrestacaoDetailLeftColumn>

                        {/* COLUNA DIREITA: DADOS */}
                        <PrestacaoDetailRightColumn>
                            {isAdmin && (
                                <PrestacaoDetailValueContainer>
                                    <PrestacaoDetailLabel>Cliente:</PrestacaoDetailLabel>
                                    <PrestacaoDetailValue>{fatura.contrato?.cliente?.nome}</PrestacaoDetailValue>
                                </PrestacaoDetailValueContainer>
                            )}
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Vencimento:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>{new Date(fatura.dataVencimento).toLocaleDateString('pt-BR')}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Aluguel:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>R$ {parseFloat(fatura.valorAluguel).toFixed(2)}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>

                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Consumo de Energia:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>
                                    {fatura.consumoTotal ? `${fatura.consumoTotal} kWh (cobrado: ${fatura.consumoCobrado} kWh)` : 'Leitura não lançada'}
                                </PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Valor Energia:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>R$ {parseFloat(fatura.valorEnergia || 0).toFixed(2)}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>

                            {fatura.valorMulta > 0 && (
                                <PrestacaoDetailValueContainer>
                                    <PrestacaoDetailLabel>Multa/Juros:</PrestacaoDetailLabel>
                                    <PrestacaoDetailValue>R$ {parseFloat(fatura.valorMulta).toFixed(2)}</PrestacaoDetailValue>
                                </PrestacaoDetailValueContainer>
                            )}
                            {(fatura.acrescimoAplicado > 0 || fatura.descontoAplicado > 0) && (
                                <PrestacaoDetailValueContainer>
                                    <PrestacaoDetailLabel>Ajustes:</PrestacaoDetailLabel>
                                    <PrestacaoDetailValue>
                                        +R$ {parseFloat(fatura.acrescimoAplicado).toFixed(2)} / -R$ {parseFloat(fatura.descontoAplicado).toFixed(2)}
                                    </PrestacaoDetailValue>
                                </PrestacaoDetailValueContainer>
                            )}
                            {fatura.observacao && (
                                <PrestacaoDetailValueContainer>
                                    <PrestacaoDetailLabel>Observação:</PrestacaoDetailLabel>
                                    <PrestacaoDetailValue>{fatura.observacao}</PrestacaoDetailValue>
                                </PrestacaoDetailValueContainer>
                            )}

                            <PrestacaoDetailValueContainer style={{ borderTop: '2px solid #eee', paddingTop: 10, marginTop: 10 }}>
                                <PrestacaoDetailLabel style={{ fontSize: '1.2rem' }}>Total:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue style={{ fontSize: '1.2rem', color: '#3b82f6' }}>
                                    R$ {parseFloat(fatura.valorTotal || 0).toFixed(2)}
                                </PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>

                            {/* BOTÕES DE AÇÃO */}
                            <PrestacaoDetailButtonContainer>
                                {isAdmin && (
                                    <>
                                        {fatura.status !== 'PAGO' && fatura.status !== 'CANCELADO' && (
                                            <SubmitButton onClick={() => setModalLeituraIsOpen(true)}>
                                                {fatura.consumoTotal ? 'Corrigir Leitura' : 'Registrar Leitura'}
                                            </SubmitButton>
                                        )}

                                        {fatura.status === 'EM_ANALISE' && (
                                            <SubmitButton onClick={() => handleAction(aprovarPagamento, fatura.id)}>Aprovar Pagamento</SubmitButton>
                                        )}

                                        {fatura.status !== 'PAGO' && fatura.status !== 'CANCELADO' && (
                                            <SubmitButton onClick={() => {
                                                if (window.confirm("Marcar esta fatura como PAGA?")) handleAction(aprovarPagamento, fatura.id);
                                            }}>Marcar Pago</SubmitButton>
                                        )}

                                        {fatura.status === 'PAGO' && (
                                            <RejectButton onClick={() => {
                                                const motivo = window.prompt("Motivo do estorno:");
                                                if (motivo) handleAction(reprovarPagamento, fatura.id, motivo);
                                            }}>Estornar</RejectButton>
                                        )}

                                        {fatura.status === 'EM_ANALISE' && (
                                            <RejectButton onClick={() => {
                                                const motivo = window.prompt("Motivo da reprovação do comprovante:");
                                                if (motivo) handleAction(reprovarPagamento, fatura.id, motivo);
                                            }}>Reprovar Comprovante</RejectButton>
                                        )}

                                        <SubmitButton onClick={() => setModalValoresIsOpen(true)}>Ajustar Multa/Desconto</SubmitButton>
                                    </>
                                )}

                                {!isAdmin && (fatura.status === 'PENDENTE' || fatura.status === 'ATRASADO') && (
                                    <SubmitButton onClick={() => setModalPagamentoIsOpen(true)}>Enviar Comprovante</SubmitButton>
                                )}
                            </PrestacaoDetailButtonContainer>
                        </PrestacaoDetailRightColumn>
                    </PrestcaoDetailContentContainer>

                    {/* MODAL LEITURA */}
                    <Modal isOpen={modalLeituraIsOpen} onRequestClose={() => setModalLeituraIsOpen(false)} style={modalStyles}>
                        <StyledFormArea>
                            <h3>Registrar Leitura</h3>
                            <Formik
                                initialValues={{ leituraAtual: fatura.leituraAtual || 0, arquivo: null }}
                                validationSchema={Yup.object({ leituraAtual: Yup.number().min(0).required() })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    await handleAction(registrarLeitura, fatura.id, values.leituraAtual, values.arquivo);
                                    setSubmitting(false);
                                    setModalLeituraIsOpen(false);
                                }}
                            >
                                {({ setFieldValue, isSubmitting }) => (
                                    <Form>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Leitura Atual (kWh)</FormInputLabelRequired>
                                            <FormInput type="number" name="leituraAtual" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Foto do Medidor (opcional)</FormInputLabelRequired>
                                            <input type="file" accept="image/*" onChange={(e) => setFieldValue('arquivo', e.target.files[0])} />
                                        </FormInputArea>
                                        <ButtonGroup>
                                            <BackButton type="button" onClick={() => setModalLeituraIsOpen(false)}>Cancelar</BackButton>
                                            <SubmitButton type="submit" disabled={isSubmitting || loadingAction}>
                                                {(isSubmitting || loadingAction) ? <ThreeDots height={20} /> : "Salvar"}
                                            </SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </StyledFormArea>
                    </Modal>

                    {/* MODAL AJUSTE DE VALORES */}
                    <Modal isOpen={modalValoresIsOpen} onRequestClose={() => setModalValoresIsOpen(false)} style={modalStyles}>
                        <StyledFormArea>
                            <h3>Ajustar Multa / Acréscimo / Desconto</h3>
                            <Formik
                                initialValues={{
                                    multa: fatura.valorMulta || 0,
                                    acrescimo: fatura.acrescimoAplicado || 0,
                                    desconto: fatura.descontoAplicado || 0,
                                    observacao: fatura.observacao || ''
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    await handleAction(editarValoresFatura, fatura.id, values);
                                    setSubmitting(false);
                                    setModalValoresIsOpen(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Multa</FormInputLabelRequired>
                                            <FormInput type="number" step="0.01" name="multa" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Acréscimo</FormInputLabelRequired>
                                            <FormInput type="number" step="0.01" name="acrescimo" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Desconto</FormInputLabelRequired>
                                            <FormInput type="number" step="0.01" name="desconto" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Observação</FormInputLabelRequired>
                                            <FormInput type="text" name="observacao" />
                                        </FormInputArea>
                                        <ButtonGroup>
                                            <BackButton type="button" onClick={() => setModalValoresIsOpen(false)}>Cancelar</BackButton>
                                            <SubmitButton type="submit" disabled={isSubmitting || loadingAction}>
                                                {(isSubmitting || loadingAction) ? <ThreeDots height={20} /> : "Salvar"}
                                            </SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </StyledFormArea>
                    </Modal>

                    {/* MODAL PAGAMENTO (UPLOAD) */}
                    <Modal isOpen={modalPagamentoIsOpen} onRequestClose={() => setModalPagamentoIsOpen(false)} style={modalStyles}>
                        <StyledFormArea>
                            <h3>Enviar Comprovante</h3>
                            <Formik
                                initialValues={{ comprovante: null }}
                                validationSchema={Yup.object({ comprovante: Yup.mixed().required('Selecione um arquivo') })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    await handleAction(enviarComprovante, fatura.id, values.comprovante);
                                    setSubmitting(false);
                                    setModalPagamentoIsOpen(false);
                                }}
                            >
                                {({ setFieldValue, isSubmitting }) => (
                                    <Form>
                                        <StyledFileArea>
                                            <StyledFileIconContainer><FaCloudUploadAlt /></StyledFileIconContainer>
                                            <StyledFileInputTitle>Selecione a Imagem/PDF</StyledFileInputTitle>
                                            <StyledFileInput
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setFieldValue('comprovante', file);
                                                    if (file) {
                                                        setFileType(file.type);
                                                        setPreviewUrl(file.type.startsWith('image') ? URL.createObjectURL(file) : null);
                                                    }
                                                }}
                                            />
                                        </StyledFileArea>
                                        {previewUrl && <Image src={previewUrl} style={{ marginTop: 10 }} />}
                                        {fileType === 'application/pdf' && <PdfPreview><FaFilePdf /></PdfPreview>}

                                        <ButtonGroup>
                                            <BackButton type="button" onClick={() => setModalPagamentoIsOpen(false)}>Cancelar</BackButton>
                                            <SubmitButton type="submit" disabled={isSubmitting || loadingAction}>
                                                {(isSubmitting || loadingAction) ? <ThreeDots height={20} /> : "Enviar"}
                                            </SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </StyledFormArea>
                    </Modal>

                </PrestacaoDetailMainContainer>
            )}

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(ParcelaInfo);
