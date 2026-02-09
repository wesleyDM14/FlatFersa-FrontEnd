import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";
import { FaCheck, FaClock, FaFileInvoice, FaFilePdf, FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { logoutUser } from "../../services/userService";
import {
    aprovarPagamento, gerarCodigoPix, getComprovante,
    getParcelaById, marcarPago, marcarPendente,
    registrarLeitura, registrarPagamento, reprovarPagamento
} from "../../services/financeiroService";

import {
    PrestacaoDetailMainContainer, PrestacaoDetailHeaderContainer, PrestacaoDetailHeaderTitle,
    PrestcaoDetailContentContainer, PrestacaoDetailLeftColumn, PrestacaoDetailRightColumn,
    PrestacaoDetailValueContainer, PrestacaoDetailLabel, PrestacaoDetailValue,
    PrestacaoDetailPagamentoContainer, QrCodePagamento, QrCodeCopiaEColaContainer, QrCodeCopiaECola,
    PrestacaoDetailButtonContainer, BackButton, SubmitButton, RejectButton,
    ComprovanteContainer, ComprovanteTitle, ComprovanteImg, ComprovanteIconContainer,
    LoadingContainer, PdfPreview, WaitingContainer, WaitingTitle, WaitingIcon,
} from "./FinanceiroPage.styles";

import { modalStyles } from "../../styles/ModalStyles";
import { FormInput } from "../../components/FormLib";
import { ContentIconContainer, ClientCounter, FormInputArea, FormInputLabel, Image, StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle, StyledFileLegend, StyledFormArea, ButtonGroup } from "../ClientPage/ClientPage.styles";
import { FormInputLabelRequired } from "../ContractPage/ContractPage.styles";

import pagoImg from '../../assets/pago.png';
import cancelImg from '../../assets/cancel.png';
import waitingImg from '../../assets/waiting.png';

const ParcelaInfo = ({ user }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();
    const { prestacaoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [parcela, setParcela] = useState(null);
    const [infos, setInfos] = useState({});

    // Pix
    const [imgb64, setImgb64] = useState(undefined);
    const [copiaCola, setCopiCola] = useState('');

    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false); // Para ações de botões

    const [modalLeituraIsOpen, setModalLeituraIsOpen] = useState(false);
    const [modalPagamentoIsOpen, setModalPagamentoIsOpen] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [comprovanteLink, setComprovanteLink] = useState();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const getMesName = (id) => monthNames[id - 1] || 'Mês Inválido';

    const handleLogout = () => logoutUser(navigate);

    // Carrega dados iniciais
    useEffect(() => {
        const fetchAll = async () => {
            if (user && user.accessToken) {
                setLoading(true);
                try {
                    // 1. Dados da Parcela
                    const { parcela: p, infos: i } = await getParcelaById(prestacaoId);
                    setParcela(p);
                    setInfos(i);

                    // 2. Pix (Se pendente/atrasado)
                    if (p.statusPagamento === 'PENDENTE' || p.statusPagamento === 'ATRASADO') {
                        const pixData = await gerarCodigoPix(prestacaoId);
                        if (pixData) {
                            if (pixData.status) {
                                // Lógica de imagem estática baseada no status
                                if (pixData.status === 'PAGO') setImgb64(pagoImg);
                                else if (pixData.status === 'CANCELADO') setImgb64(cancelImg);
                                else if (pixData.status === 'AGUARDANDO') setImgb64(waitingImg);
                            } else {
                                setImgb64(pixData.base64);
                                setCopiCola(pixData.payload);
                            }
                        }
                    }

                    // 3. Comprovante (Se existir e for admin ou dono)
                    if (p.linkComprovante) {
                        const blob = await getComprovante(p.id);
                        setComprovanteLink(blob);
                    }

                } catch (error) {
                    console.error("Erro ao carregar detalhes", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAll();
    }, [user, prestacaoId]);

    // Helpers de Modal
    const handleAction = async (actionFn, ...args) => {
        setLoadingAction(true);
        await actionFn(...args);
        setLoadingAction(false);
        window.location.reload(); // Recarrega para atualizar status (ou refetch)
    };

    if (!user) return null;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading || !parcela ? (
                <LoadingContainer><ThreeDots color={'#4e4e4e'} /></LoadingContainer>
            ) : (
                <PrestacaoDetailMainContainer>
                    {/* Header com Voltar e Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <PrestacaoDetailHeaderContainer style={{ border: 'none', padding: 0, margin: 0 }}>
                            <PrestacaoDetailHeaderTitle>
                                {parcela.mesReferencia === 0 ? 'Calção' : `Aluguel ${getMesName(parcela.mesReferencia)}`}
                            </PrestacaoDetailHeaderTitle>
                            <span style={{
                                backgroundColor: parcela.statusPagamento === 'PAGO' ? '#d1fae5' : '#fee2e2',
                                color: parcela.statusPagamento === 'PAGO' ? '#059669' : '#dc2626',
                                padding: '5px 10px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.9rem'
                            }}>
                                {parcela.statusPagamento}
                            </span>
                        </PrestacaoDetailHeaderContainer>

                        <BackButton onClick={() => navigate('/financeiro')} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <FaArrowLeft /> Voltar
                        </BackButton>
                    </div>

                    <PrestcaoDetailContentContainer>
                        {/* COLUNA ESQUERDA: COMPROVANTE / PIX */}
                        <PrestacaoDetailLeftColumn>
                            <ComprovanteContainer>
                                <ComprovanteTitle>Pagamento / Comprovante</ComprovanteTitle>
                                {parcela.linkComprovante ? (
                                    comprovanteLink ? (
                                        <a href={comprovanteLink} target="_blank" rel="noreferrer">
                                            <ComprovanteImg src={comprovanteLink} alt="Comprovante" />
                                        </a>
                                    ) : <ThreeDots height={30} />
                                ) : parcela.statusPagamento === 'PAGO' ? (
                                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                                        <FaCheck size={50} color="#10b981" />
                                        <p style={{ color: '#10b981', fontWeight: 'bold' }}>Pago com Sucesso</p>
                                    </div>
                                ) : (
                                    <PrestacaoDetailPagamentoContainer>
                                        <p style={{ fontWeight: 'bold' }}>Escaneie para pagar:</p>
                                        {imgb64 && <QrCodePagamento src={imgb64} />}
                                        {copiaCola && (
                                            <>
                                                <p style={{ fontSize: '0.8rem', marginTop: 10 }}>Pix Copia e Cola:</p>
                                                <QrCodeCopiaEColaContainer>
                                                    <QrCodeCopiaECola>{copiaCola}</QrCodeCopiaECola>
                                                </QrCodeCopiaEColaContainer>
                                            </>
                                        )}
                                    </PrestacaoDetailPagamentoContainer>
                                )}
                            </ComprovanteContainer>
                        </PrestacaoDetailLeftColumn>

                        {/* COLUNA DIREITA: DADOS */}
                        <PrestacaoDetailRightColumn>
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Cliente:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>{infos?.cliente?.name}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Vencimento:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>
                            <PrestacaoDetailValueContainer>
                                <PrestacaoDetailLabel>Valor Base:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue>R$ {parseFloat(parcela.valor).toFixed(2)}</PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>

                            {/* Dados de Energia se houver */}
                            {parcela.mesReferencia !== 0 && (
                                <>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Consumo KWh:</PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>
                                            {parcela.consumoKWh ? `${parcela.consumoKWh} kWh` : 'Não medido'}
                                        </PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Valor Energia:</PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.valorExcedenteKWh || 0).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                </>
                            )}

                            <PrestacaoDetailValueContainer style={{ borderTop: '2px solid #eee', paddingTop: 10, marginTop: 10 }}>
                                <PrestacaoDetailLabel style={{ fontSize: '1.2rem' }}>Total:</PrestacaoDetailLabel>
                                <PrestacaoDetailValue style={{ fontSize: '1.2rem', color: '#3b82f6' }}>
                                    R$ {parseFloat((parcela.valor || 0) + (parcela.multa || 0) + (parcela.valorExcedenteKWh || 0)).toFixed(2)}
                                </PrestacaoDetailValue>
                            </PrestacaoDetailValueContainer>

                            {/* BOTÕES DE AÇÃO */}
                            <PrestacaoDetailButtonContainer>
                                {/* Admin Actions */}
                                {user.isAdmin && (
                                    <>
                                        {/* Registrar Leitura */}
                                        {parcela.mesReferencia !== 0 && !parcela.consumoKWh && parcela.statusPagamento !== 'PAGO' && (
                                            <SubmitButton onClick={() => setModalLeituraIsOpen(true)}>Registrar Leitura</SubmitButton>
                                        )}

                                        {/* Aprovar Comprovante */}
                                        {parcela.statusPagamento === 'AGUARDANDO' && (
                                            <SubmitButton onClick={() => handleAction(aprovarPagamento, parcela.id)}>Aprovar Pagamento</SubmitButton>
                                        )}

                                        {/* Aprovar Manualmente */}
                                        {parcela.statusPagamento !== 'PAGO' && (
                                            <SubmitButton onClick={() => {
                                                if (window.confirm("Marcar como PAGO manualmente?")) handleAction(marcarPago, parcela.id);
                                            }}>Marcar Pago</SubmitButton>
                                        )}

                                        {/* Reprovar/Estornar */}
                                        {parcela.statusPagamento === 'PAGO' && (
                                            <RejectButton onClick={() => {
                                                if (window.confirm("Estornar para PENDENTE?")) handleAction(marcarPendente, parcela.id);
                                            }}>Estornar</RejectButton>
                                        )}
                                    </>
                                )}

                                {/* User Action: Enviar Comprovante */}
                                {(parcela.statusPagamento === 'PENDENTE' || parcela.statusPagamento === 'ATRASADO') && (
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
                                initialValues={{ novaLeitura: 0, prestacaoId: parcela.id }}
                                validationSchema={Yup.object({ novaLeitura: Yup.number().min(0).required() })}
                                onSubmit={(values, { setSubmitting, setFieldError }) => {
                                    registrarLeitura(values, setModalLeituraIsOpen);
                                    window.location.reload();
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Leitura Atual</FormInputLabelRequired>
                                            <FormInput type="number" name="novaLeitura" />
                                        </FormInputArea>
                                        <ButtonGroup>
                                            <BackButton type="button" onClick={() => setModalLeituraIsOpen(false)}>Cancelar</BackButton>
                                            <SubmitButton type="submit">Salvar</SubmitButton>
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
                                initialValues={{ comprovante: null, prestacaoId: parcela.id }}
                                validationSchema={Yup.object({ comprovante: Yup.mixed().required() })}
                                onSubmit={(values) => {
                                    registrarPagamento(values, setModalPagamentoIsOpen);
                                    window.location.reload();
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
                                            <SubmitButton type="submit">{isSubmitting ? <ThreeDots height={20} /> : "Enviar"}</SubmitButton>
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