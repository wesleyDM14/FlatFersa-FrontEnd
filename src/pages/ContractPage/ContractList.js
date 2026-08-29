import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";

import {
    FaCheck, FaClock, FaCloudUploadAlt, FaEdit, FaFilePdf, FaTimes, FaSearch, FaBan, FaExclamationTriangle
} from "react-icons/fa";

import {
    AdminPredioContainer, BackButton, ButtonGroup, ContratoCounter,
    DetailContractBackButton, DetailContractButtonGroup, DetailContractContainer,
    DetailContractDataColumnLeft, DetailContractDataColumnRight, DetailContractDataContainer,
    DetailContractDataLabel, DetailContractDataSectionContainer, DetailContractDataSectionTitle,
    DetailContractDataValue, DetailContractDownloadButton, DetailContractHeaderContainer,
    DetailContractHeaderSubTitle, DetailContractHeaderTitle, DetailContractValueContainer,
    EditIcon, FinanceiroList, FinanceiroListElement, FinanceiroListElementContainer,
    FinanceiroListIconContainer, FinanceiroListValue, FormContent,
    FormInputArea, FormInputLabel, FormInputLabelRequired, Limitador, ListLabel,
    PredioListContainer, PredioListHeader, PredioSingleContainer, PredioValue,
    RejectButton, SinglePredio, SolicitacaoModalContainer,
    SolicitacaoModalTitle, SolicitacaoTitleContainer, StyledFormArea, StyledLabel,
    SubItensContainer, SubmitButton, PdfPreview
} from "./ContractPage.styles";

import {
    configurarContrato, cancelarContrato, reprovarContrato, editarContrato,
    renovarContrato, transferirApartamento, assinarContrato, downloadContratoPDF
} from "../../services/contratoService";
import { getApartamentosVagos } from "../../services/apartamentoService";

import { modalStyles } from "../../styles/ModalStyles";
import { FormInput, ApartamentoSelect } from "../../components/FormLib";
import Pagination from "../../components/Pagination";
import { StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle } from "../ClientPage/ClientPage.styles";

const STATUS_COLORS = {
    ATIVO: '#10b981',
    SOLICITADO: '#f59e0b',
    AGUARDANDO_ASSINATURA: '#f59e0b',
    AGUARDANDO_DADOS_DONO: '#f59e0b',
    CANCELADO: '#ef4444',
    DESPEJO: '#ef4444',
    ENCERRADO: '#6b7280',
    RENOVADO: '#6b7280',
    TRANSFERIDO: '#6b7280'
};

const FATURA_STATUS_LABELS = {
    PAGO: 'Pago',
    PENDENTE: 'Pendente',
    ATRASADO: 'Atrasado',
    EM_ANALISE: 'Em Análise',
    CANCELADO: 'Cancelado',
    CONTESTADO: 'Contestado'
};

const FATURA_STATUS_ICONS = {
    PAGO: <FaCheck color="#10b981" />,
    PENDENTE: <FaClock color="#f59e0b" />,
    ATRASADO: <FaTimes color="#ef4444" />,
    EM_ANALISE: <FaSearch color="#3b82f6" />,
    CANCELADO: <FaBan color="#6b7280" />,
    CONTESTADO: <FaExclamationTriangle color="#dc2626" />
};

const ContractList = ({ contratos, user, refreshData, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement('#root');
    const isAdmin = user.role === 'ADMIN';

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalContractIsOpen, setModalContractIsOpen] = useState(false);
    const [modalAssinaturaIsOpen, setModalAssinaturaIsOpen] = useState(false);
    const [modalEditarContratoIsOpen, setModalEditarContratoIsOpen] = useState(false);
    const [modalRenovarIsOpen, setModalRenovarIsOpen] = useState(false);
    const [modalTransferirIsOpen, setModalTransferirIsOpen] = useState(false);

    const [selectedContrato, setSelectedContrato] = useState({});
    const [apartamentosVagos, setApartamentosVagos] = useState([]);
    const [selectedNovoApartamento, setSelectedNovoApartamento] = useState(null);

    const [isDownloading, setIsDownloading] = useState(false);
    const [fileType, setFileType] = useState(null);
    const [financeiroPage, setFinanceiroPage] = useState(1);

    const refresh = () => refreshData && refreshData();

    const openContractModal = (contrato) => {
        setSelectedContrato(contrato);
        setModalContractIsOpen(true);
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('contrato', file);
        setFileType(file?.type);
    };

    const abrirTransferencia = async () => {
        setModalContractIsOpen(false);
        const vagos = await getApartamentosVagos();
        setApartamentosVagos(vagos);
        setSelectedNovoApartamento(null);
        setModalTransferirIsOpen(true);
    };

    const filteredContratos = useMemo(() => {
        return contratos.filter(contrato => {
            const clienteName = contrato.cliente?.nome?.toLowerCase() || '';
            const aptNum = contrato.apartamento?.numero?.toString() || '';
            const status = contrato.status?.toLowerCase() || '';
            const term = search.toLowerCase();

            if (isAdmin) {
                return clienteName.includes(term) || aptNum.includes(term) || status.includes(term);
            }
            return aptNum.includes(term) || status.includes(term);
        });
    }, [contratos, search, isAdmin]);

    const totalPages = Math.ceil(filteredContratos.length / itemsPerPage);
    const currentPageItems = filteredContratos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const financeiroItems = selectedContrato.faturas || [];
    const totalPagesFinanceiro = Math.ceil(financeiroItems.length / itemsPerPage);
    const currentPageItemsFinanceiro = financeiroItems.slice((financeiroPage - 1) * itemsPerPage, financeiroPage * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader $isadmin={isAdmin.toString()}>
                {isAdmin && <ListLabel>Cliente</ListLabel>}
                <ListLabel>Apartamento</ListLabel>
                <ListLabel>Status</ListLabel>
                {isAdmin && <ListLabel>Opções</ListLabel>}
            </PredioListHeader>

            {currentPageItems.map((contract) => (
                <SinglePredio
                    key={contract.id}
                    $isadmin={isAdmin.toString()}
                    onClick={() => openContractModal(contract)}
                >
                    {isAdmin && (
                        <PredioSingleContainer>
                            <StyledLabel>Cliente: </StyledLabel>
                            <PredioValue>{contract.cliente?.nome}</PredioValue>
                        </PredioSingleContainer>
                    )}

                    <PredioSingleContainer>
                        <StyledLabel>Apt: </StyledLabel>
                        <PredioValue>{contract.apartamento?.numero}</PredioValue>
                    </PredioSingleContainer>

                    <PredioSingleContainer>
                        <StyledLabel>Status: </StyledLabel>
                        <span style={{ fontWeight: 700, color: STATUS_COLORS[contract.status] || '#374151' }}>
                            {contract.status}
                        </span>
                    </PredioSingleContainer>

                    {isAdmin && (
                        <AdminPredioContainer>
                            <EditIcon onClick={(e) => {
                                e.stopPropagation();
                                setSelectedContrato(contract);
                                if (contract.status === 'SOLICITADO') setModalEditIsOpen(true);
                                else openContractModal(contract);
                            }}>
                                <FaEdit />
                            </EditIcon>
                        </AdminPredioContainer>
                    )}
                </SinglePredio>
            ))}

            {/* --- MODAL DETALHES (Visão Geral e Financeiro) --- */}
            <Modal
                isOpen={modalContractIsOpen}
                onRequestClose={() => setModalContractIsOpen(false)}
                style={modalStyles}
            >
                {selectedContrato.id && (
                    selectedContrato.status === 'SOLICITADO' && isAdmin ? (
                        <SolicitacaoModalContainer>
                            <SolicitacaoTitleContainer>
                                <SolicitacaoModalTitle>Solicitação Pendente</SolicitacaoModalTitle>
                            </SolicitacaoTitleContainer>
                            <ButtonGroup>
                                <BackButton onClick={() => setModalContractIsOpen(false)}>Fechar</BackButton>
                                <SubmitButton onClick={() => {
                                    setModalContractIsOpen(false);
                                    setModalEditIsOpen(true);
                                }}>
                                    Analisar para Aprovar
                                </SubmitButton>
                            </ButtonGroup>
                        </SolicitacaoModalContainer>
                    ) : (
                        <DetailContractContainer>
                            <DetailContractHeaderContainer>
                                <DetailContractHeaderTitle>Detalhes do Contrato</DetailContractHeaderTitle>
                                <DetailContractHeaderSubTitle
                                    style={{ color: STATUS_COLORS[selectedContrato.status] || '#374151' }}
                                >
                                    {selectedContrato.status}
                                </DetailContractHeaderSubTitle>
                            </DetailContractHeaderContainer>

                            <DetailContractDataContainer>
                                <DetailContractDataColumnLeft>
                                    <DetailContractDataSectionTitle>Informações</DetailContractDataSectionTitle>
                                    <DetailContractDataSectionContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Cliente:</DetailContractDataLabel>
                                            <DetailContractDataValue>{selectedContrato.cliente?.nome}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Apt:</DetailContractDataLabel>
                                            <DetailContractDataValue>{selectedContrato.apartamento?.predio?.nome} - {selectedContrato.apartamento?.numero}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Aluguel:</DetailContractDataLabel>
                                            <DetailContractDataValue>R$ {parseFloat(selectedContrato.valorAluguel || 0).toFixed(2)}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Vencimento:</DetailContractDataLabel>
                                            <DetailContractDataValue>Dia {selectedContrato.diaVencimento}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Início:</DetailContractDataLabel>
                                            <DetailContractDataValue>{new Date(selectedContrato.dataInicio).toLocaleDateString('pt-BR')}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Término:</DetailContractDataLabel>
                                            <DetailContractDataValue>
                                                {selectedContrato.dataFim ? new Date(selectedContrato.dataFim).toLocaleDateString('pt-BR') : '—'}
                                            </DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Limite kWh Isento:</DetailContractDataLabel>
                                            <DetailContractDataValue>{selectedContrato.limiteKwhIsento} kWh</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                    </DetailContractDataSectionContainer>
                                </DetailContractDataColumnLeft>

                                <DetailContractDataColumnRight>
                                    <DetailContractDataSectionTitle>Financeiro (Faturas)</DetailContractDataSectionTitle>
                                    <FinanceiroList>
                                        {currentPageItemsFinanceiro.map((fatura) => (
                                            <FinanceiroListElementContainer key={fatura.id} onClick={() => navigate(`/faturas/${fatura.id}`)}>
                                                <FinanceiroListElement>
                                                    <FinanceiroListValue>
                                                        {new Date(fatura.dataVencimento).toLocaleDateString('pt-BR')} - R$ {parseFloat(fatura.valorTotal || 0).toFixed(2)}
                                                    </FinanceiroListValue>
                                                    <FinanceiroListIconContainer title={FATURA_STATUS_LABELS[fatura.status] || fatura.status} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        {FATURA_STATUS_ICONS[fatura.status]}
                                                        <span style={{ fontSize: '0.8rem' }}>{FATURA_STATUS_LABELS[fatura.status] || fatura.status}</span>
                                                    </FinanceiroListIconContainer>
                                                </FinanceiroListElement>
                                            </FinanceiroListElementContainer>
                                        ))}
                                    </FinanceiroList>
                                    <Pagination totalPages={totalPagesFinanceiro} currentPage={financeiroPage} setPage={setFinanceiroPage} />
                                </DetailContractDataColumnRight>
                            </DetailContractDataContainer>

                            <DetailContractButtonGroup>
                                <DetailContractBackButton onClick={() => setModalContractIsOpen(false)}>Voltar</DetailContractBackButton>

                                {selectedContrato.status === 'SOLICITADO' && isAdmin && (
                                    <RejectButton onClick={() => {
                                        const motivo = window.prompt("Motivo da reprovação:");
                                        if (motivo) {
                                            reprovarContrato(selectedContrato.id, motivo)
                                                .then(() => { setModalContractIsOpen(false); refresh(); })
                                                .catch((err) => alert(err.response?.data?.message || "Erro ao reprovar."));
                                        }
                                    }}>
                                        Reprovar Solicitação
                                    </RejectButton>
                                )}

                                {selectedContrato.status === 'ATIVO' && isAdmin && (
                                    <RejectButton onClick={() => {
                                        const motivo = window.prompt("Motivo do cancelamento:");
                                        if (motivo) {
                                            cancelarContrato(selectedContrato.id, motivo)
                                                .then(() => { setModalContractIsOpen(false); refresh(); })
                                                .catch((err) => alert(err.response?.data?.message || "Erro ao cancelar."));
                                        }
                                    }}>
                                        Cancelar Contrato
                                    </RejectButton>
                                )}

                                {selectedContrato.status === 'ATIVO' && isAdmin && (
                                    <SubmitButton onClick={() => setModalEditarContratoIsOpen(true)}>
                                        Editar
                                    </SubmitButton>
                                )}

                                {selectedContrato.status === 'ATIVO' && isAdmin && (
                                    <SubmitButton onClick={() => setModalRenovarIsOpen(true)}>
                                        Renovar
                                    </SubmitButton>
                                )}

                                {selectedContrato.status === 'ATIVO' && isAdmin && (
                                    <SubmitButton onClick={abrirTransferencia}>
                                        Transferir Apartamento
                                    </SubmitButton>
                                )}

                                <DetailContractDownloadButton onClick={() => {
                                    setIsDownloading(true);
                                    downloadContratoPDF(selectedContrato.id).finally(() => setIsDownloading(false));
                                }}>
                                    {isDownloading ? <ThreeDots height={20} width={20} color="#fff" /> : "Download PDF"}
                                </DetailContractDownloadButton>

                                {selectedContrato.status === 'AGUARDANDO_ASSINATURA' && (
                                    <SubmitButton onClick={() => setModalAssinaturaIsOpen(true)}>
                                        Anexar Assinado
                                    </SubmitButton>
                                )}
                            </DetailContractButtonGroup>
                        </DetailContractContainer>
                    )
                )}
            </Modal>

            {/* --- MODAL APROVAR (ADMIN) --- */}
            <Modal isOpen={modalEditIsOpen} onRequestClose={() => setModalEditIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
                        <FaCheck size={24} color="#10b981" />
                        <ContratoCounter>Aprovar Contrato</ContratoCounter>
                    </div>
                    <Formik
                        initialValues={{
                            valorAluguel: selectedContrato.valorAluguel || '',
                            diaVencimento: selectedContrato.diaVencimento || '',
                            limiteKwhIsento: '',
                            leituraInicial: 0
                        }}
                        validationSchema={Yup.object({
                            valorAluguel: Yup.number().required('Obrigatório'),
                            diaVencimento: Yup.number().required('Obrigatório').max(31),
                            leituraInicial: Yup.number().required('Obrigatório'),
                        })}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                await configurarContrato({
                                    contratoId: selectedContrato.id,
                                    valorAluguel: values.valorAluguel,
                                    diaVencimento: values.diaVencimento,
                                    leituraInicial: values.leituraInicial,
                                    limiteKwhIsento: values.limiteKwhIsento || 0
                                });
                                setModalEditIsOpen(false);
                                refresh();
                            } catch (err) {
                                const msg = err.response?.data?.message || "Erro ao aprovar contrato.";
                                setFieldError('valorAluguel', msg);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormContent>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Dia Vencimento</FormInputLabelRequired>
                                            <Limitador>
                                                <FormInput type="number" name="diaVencimento" />
                                            </Limitador>
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Valor Aluguel</FormInputLabelRequired>
                                            <Limitador>
                                                <FormInput type="number" step="0.01" name="valorAluguel" />
                                            </Limitador>
                                        </FormInputArea>
                                    </SubItensContainer>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Limite kWh Isento</FormInputLabelRequired>
                                            <FormInput type="number" name="limiteKwhIsento" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Leitura Inicial</FormInputLabelRequired>
                                            <FormInput type="number" name="leituraInicial" />
                                        </FormInputArea>
                                    </SubItensContainer>
                                </FormContent>
                                <ButtonGroup>
                                    <BackButton type="button" onClick={() => setModalEditIsOpen(false)}>Cancelar</BackButton>
                                    {!isSubmitting ? <SubmitButton type="submit">Aprovar</SubmitButton> : <ThreeDots color="#333" />}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* --- MODAL EDITAR CONTRATO ATIVO --- */}
            <Modal isOpen={modalEditarContratoIsOpen} onRequestClose={() => setModalEditarContratoIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <h3>Editar Contrato</h3>
                    <Formik
                        initialValues={{
                            valorAluguel: selectedContrato.valorAluguel || '',
                            diaVencimento: selectedContrato.diaVencimento || '',
                            limiteKwhIsento: selectedContrato.limiteKwhIsento || 0,
                            duracaoMeses: selectedContrato.duracaoMeses || ''
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await editarContrato(selectedContrato.id, values);
                                setModalEditarContratoIsOpen(false);
                                setModalContractIsOpen(false);
                                refresh();
                            } catch (err) {
                                alert(err.response?.data?.message || "Erro ao editar contrato.");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormContent>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Valor Aluguel</FormInputLabelRequired>
                                            <FormInput type="number" step="0.01" name="valorAluguel" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Dia Vencimento</FormInputLabelRequired>
                                            <FormInput type="number" name="diaVencimento" />
                                        </FormInputArea>
                                    </SubItensContainer>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Limite kWh Isento</FormInputLabelRequired>
                                            <FormInput type="number" name="limiteKwhIsento" />
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Duração Total (meses)</FormInputLabelRequired>
                                            <FormInput type="number" name="duracaoMeses" />
                                        </FormInputArea>
                                    </SubItensContainer>
                                </FormContent>
                                <ButtonGroup>
                                    <BackButton type="button" onClick={() => setModalEditarContratoIsOpen(false)}>Cancelar</BackButton>
                                    {!isSubmitting ? <SubmitButton type="submit">Salvar</SubmitButton> : <ThreeDots color="#333" />}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* --- MODAL RENOVAR CONTRATO --- */}
            <Modal isOpen={modalRenovarIsOpen} onRequestClose={() => setModalRenovarIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <h3>Renovar Contrato</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>
                        O contrato atual será encerrado como "Renovado" e um novo contrato ativo será criado a partir de hoje.
                    </p>
                    <Formik
                        initialValues={{
                            duracaoMeses: selectedContrato.duracaoMeses || 12,
                            valorAluguel: selectedContrato.valorAluguel || ''
                        }}
                        validationSchema={Yup.object({
                            duracaoMeses: Yup.number().min(1).required('Obrigatório')
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await renovarContrato(selectedContrato.id, values);
                                setModalRenovarIsOpen(false);
                                setModalContractIsOpen(false);
                                refresh();
                            } catch (err) {
                                alert(err.response?.data?.message || "Erro ao renovar contrato.");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormInputArea>
                                    <FormInputLabelRequired>Nova Duração (meses)</FormInputLabelRequired>
                                    <FormInput type="number" name="duracaoMeses" />
                                </FormInputArea>
                                <FormInputArea>
                                    <FormInputLabel>Novo Valor do Aluguel (opcional)</FormInputLabel>
                                    <FormInput type="number" step="0.01" name="valorAluguel" />
                                </FormInputArea>
                                <ButtonGroup>
                                    <BackButton type="button" onClick={() => setModalRenovarIsOpen(false)}>Cancelar</BackButton>
                                    {!isSubmitting ? <SubmitButton type="submit">Renovar</SubmitButton> : <ThreeDots color="#333" />}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* --- MODAL TRANSFERIR APARTAMENTO --- */}
            <Modal isOpen={modalTransferirIsOpen} onRequestClose={() => setModalTransferirIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <h3>Transferir Apartamento</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>
                        O contrato atual será encerrado e um novo contrato será criado no apartamento de destino,
                        com o tempo restante do contrato atual.
                    </p>
                    <Formik
                        initialValues={{ leituraInicial: '' }}
                        validationSchema={Yup.object({ leituraInicial: Yup.number().min(0).required('Obrigatório') })}
                        onSubmit={async (values, { setSubmitting }) => {
                            if (!selectedNovoApartamento?.value) {
                                alert("Selecione o apartamento de destino.");
                                setSubmitting(false);
                                return;
                            }
                            try {
                                await transferirApartamento(selectedContrato.id, {
                                    novoApartamentoId: selectedNovoApartamento.value,
                                    leituraInicial: values.leituraInicial
                                });
                                setModalTransferirIsOpen(false);
                                refresh();
                            } catch (err) {
                                alert(err.response?.data?.message || "Erro ao transferir apartamento.");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormInputArea>
                                    <FormInputLabelRequired>Novo Apartamento (vagos)</FormInputLabelRequired>
                                    <ApartamentoSelect
                                        apartamentos={apartamentosVagos}
                                        setSelectedApartamento={setSelectedNovoApartamento}
                                    />
                                </FormInputArea>
                                <FormInputArea>
                                    <FormInputLabelRequired>Leitura Inicial do Novo Medidor</FormInputLabelRequired>
                                    <FormInput type="number" name="leituraInicial" />
                                </FormInputArea>
                                <ButtonGroup>
                                    <BackButton type="button" onClick={() => setModalTransferirIsOpen(false)}>Cancelar</BackButton>
                                    {!isSubmitting ? <SubmitButton type="submit">Transferir</SubmitButton> : <ThreeDots color="#333" />}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* --- MODAL UPLOAD ASSINATURA --- */}
            <Modal isOpen={modalAssinaturaIsOpen} onRequestClose={() => setModalAssinaturaIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <div style={{ marginBottom: 20 }}>
                        <h3>Enviar Contrato Assinado</h3>
                    </div>
                    <Formik
                        initialValues={{ contrato: null }}
                        validationSchema={Yup.object({ contrato: Yup.mixed().required() })}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            try {
                                await assinarContrato(selectedContrato.id, values.contrato);
                                alert("Contrato assinado enviado com sucesso!");
                                setModalAssinaturaIsOpen(false);
                                setModalContractIsOpen(false);
                                refresh();
                            } catch (err) {
                                const msg = err.response?.data?.message || "Erro ao enviar assinatura";
                                setFieldError('contrato', msg);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <Form>
                                <StyledFileArea>
                                    <StyledFileIconContainer><FaCloudUploadAlt /></StyledFileIconContainer>
                                    <StyledFileInputTitle>Selecione o PDF Assinado</StyledFileInputTitle>
                                    <StyledFileInput
                                        type="file" accept="application/pdf"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                </StyledFileArea>
                                {fileType === 'application/pdf' && <PdfPreview><FaFilePdf /></PdfPreview>}
                                <ButtonGroup>
                                    <BackButton type="button" onClick={() => setModalAssinaturaIsOpen(false)}>Cancelar</BackButton>
                                    {!isSubmitting ? <SubmitButton type="submit">Enviar</SubmitButton> : <ThreeDots />}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer>
    );
};

export default ContractList;
