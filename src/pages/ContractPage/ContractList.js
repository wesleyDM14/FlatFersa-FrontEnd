import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";

import {
    FaCheck, FaClock, FaCloudUploadAlt, FaEdit, FaFileContract,
    FaFileInvoice, FaFilePdf, FaTimes, FaTrash, FaUserAlt
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

import {
    AdminPredioContainer, BackButton, ButtonGroup, ClientCounter, ContentIconContainer,
    ContratoCounter, DataColumn, DataContainer, DataIconContainer, DataSection,
    DeleteButtonContainer, DeleteContainer, DeleteIcon, DeleteTitle,
    DetailContractBackButton, DetailContractButtonGroup, DetailContractContainer,
    DetailContractDataColumnLeft, DetailContractDataColumnRight, DetailContractDataContainer,
    DetailContractDataLabel, DetailContractDataSectionContainer, DetailContractDataSectionTitle,
    DetailContractDataValue, DetailContractDownloadButton, DetailContractHeaderContainer,
    DetailContractHeaderSubTitle, DetailContractHeaderTitle, DetailContractValueContainer,
    EditIcon, FinanceiroList, FinanceiroListElement, FinanceiroListElementContainer,
    FinanceiroListIconContainer, FinanceiroListValue, FormColum, FormContent,
    FormInputArea, FormInputLabel, FormInputLabelRequired, Limitador, ListLabel,
    PredioListContainer, PredioListHeader, PredioSingleContainer, PredioValue,
    RejectButton, SinglePredio, SolicitacaoContratoDataContainer, SolicitacaoModalContainer,
    SolicitacaoModalContent, SolicitacaoModalContentLabel, SolicitacaoModalContentValue,
    SolicitacaoModalTitle, SolicitacaoTitleContainer, StyledFormArea, StyledLabel,
    SubItensContainer, SubTitle, SubmitButton, PdfPreview
} from "./ContractPage.styles";

import {
    approveContract, assinarContratoById, cancelContract,
    deleteContratoById, desapproveContract, downloadContract
} from "../../services/contratoService";

import { modalStyles } from "../../styles/ModalStyles";
import { FormInput, StyledSelect } from "../../components/FormLib";
import Pagination from "../../components/Pagination";
import { StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle, StyledFileLegend } from "../ClientPage/ClientPage.styles";

const ContractList = ({ contratos, user, setLoading, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement('#root');

    // Estados dos Modais
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false); // Para Admin aprovar/editar
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalContractIsOpen, setModalContractIsOpen] = useState(false); // Detalhes gerais
    const [modalAssinaturaIsOpen, setModalAssinaturaIsOpen] = useState(false); // Upload PDF

    const [selectedContrato, setSelectedContrato] = useState({});

    // Estados de Form/Ação
    const [selectedPeriocidade, setSelectedPeriocidade] = useState({});
    const [isDownloading, setIsDownloading] = useState(false);
    const [deletting, setDeletting] = useState(false);
    const [fileType, setFileType] = useState(null);
    const [financeiroPage, setFinanceiroPage] = useState(1);

    const periocidade = [
        { label: 'Anualmente', value: 'ANUALMENTE' },
        { label: 'Semestralmente', value: 'SEMESTRALMENTE' },
    ];

    // --- MANIPULAÇÃO DE MODAIS ---
    const openContractModal = (contrato) => {
        setSelectedContrato(contrato);
        setModalContractIsOpen(true);
    };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('contrato', file);
        setFileType(file?.type);
    };

    // --- FILTRO E PAGINAÇÃO ---
    const filteredContratos = useMemo(() => {
        return contratos.filter(contrato => {
            const clienteName = contrato.cliente?.name?.toLowerCase() || '';
            const aptNum = contrato.apt?.numero?.toString() || '';
            const status = contrato.statusContrato?.toLowerCase() || '';
            const term = search.toLowerCase();

            if (user.isAdmin) {
                return clienteName.includes(term) || aptNum.includes(term) || status.includes(term);
            } else {
                return aptNum.includes(term) || status.includes(term);
            }
        });
    }, [contratos, search, user]);

    const totalPages = Math.ceil(filteredContratos.length / itemsPerPage);
    const currentPageItems = filteredContratos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Paginação interna do financeiro (dentro do modal)
    const financeiroItems = selectedContrato.prestacaoAluguel || [];
    const totalPagesFinanceiro = Math.ceil(financeiroItems.length / itemsPerPage);
    const currentPageItemsFinanceiro = financeiroItems.slice((financeiroPage - 1) * itemsPerPage, financeiroPage * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader $isadmin={user.isAdmin.toString()}>
                {user.isAdmin && <ListLabel>Cliente</ListLabel>}
                <ListLabel>Apartamento</ListLabel>
                <ListLabel>Status</ListLabel>
                {user.isAdmin && <ListLabel>Opções</ListLabel>}
            </PredioListHeader>

            {currentPageItems.map((contract) => (
                <SinglePredio
                    key={contract.id}
                    $isadmin={user.isAdmin.toString()}
                    onClick={() => openContractModal(contract)}
                >
                    {user.isAdmin && (
                        <PredioSingleContainer>
                            <StyledLabel>Cliente: </StyledLabel>
                            <PredioValue>{contract.cliente?.name}</PredioValue>
                        </PredioSingleContainer>
                    )}

                    <PredioSingleContainer>
                        <StyledLabel>Apt: </StyledLabel>
                        <PredioValue>{contract.apt?.numero}</PredioValue>
                    </PredioSingleContainer>

                    <PredioSingleContainer>
                        <StyledLabel>Status: </StyledLabel>
                        <span style={{
                            fontWeight: 700,
                            color: contract.statusContrato === 'ATIVO' ? '#10b981' :
                                contract.statusContrato === 'CANCELADO' ? '#ef4444' : '#f59e0b'
                        }}>
                            {contract.statusContrato}
                        </span>
                    </PredioSingleContainer>

                    {user.isAdmin && (
                        <AdminPredioContainer>
                            <EditIcon onClick={(e) => {
                                e.stopPropagation();
                                setSelectedContrato(contract);
                                // Se estiver aguardando, abre form de aprovação, senão nada por enquanto
                                if (contract.statusContrato === 'AGUARDANDO') setModalEditIsOpen(true);
                                else openContractModal(contract);
                            }}>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon onClick={(e) => {
                                e.stopPropagation();
                                setSelectedContrato(contract);
                                setModalDeleteIsOpen(true);
                            }}>
                                <FaTrash />
                            </DeleteIcon>
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
                    selectedContrato.statusContrato === 'AGUARDANDO' && user.isAdmin ? (
                        /* MODO APROVAÇÃO (AGUARDANDO) - Redireciona para o modal de edição ou mostra dados básicos */
                        <SolicitacaoModalContainer>
                            {/* ... Layout de Solicitação igual ao original, mas simplificado ... */}
                            <SolicitacaoTitleContainer>
                                <SolicitacaoModalTitle>Solicitação Pendente</SolicitacaoModalTitle>
                            </SolicitacaoTitleContainer>
                            {/* Botões para abrir modal de edição real para aprovar */}
                            <ButtonGroup>
                                <BackButton onClick={() => setModalContractIsOpen(false)}>Fechar</BackButton>
                                <SubmitButton onClick={() => {
                                    setModalContractIsOpen(false);
                                    setModalEditIsOpen(true); // Abre o form de aprovação
                                }}>
                                    Analisar para Aprovar
                                </SubmitButton>
                            </ButtonGroup>
                        </SolicitacaoModalContainer>
                    ) : (
                        /* MODO DETALHES COMPLETO */
                        <DetailContractContainer>
                            <DetailContractHeaderContainer>
                                <DetailContractHeaderTitle>Detalhes do Contrato</DetailContractHeaderTitle>
                                <DetailContractHeaderSubTitle
                                    style={{ color: selectedContrato.statusContrato === 'ATIVO' ? 'green' : 'red' }}
                                >
                                    {selectedContrato.statusContrato}
                                </DetailContractHeaderSubTitle>
                            </DetailContractHeaderContainer>

                            <DetailContractDataContainer>
                                <DetailContractDataColumnLeft>
                                    <DetailContractDataSectionTitle>Informações</DetailContractDataSectionTitle>
                                    <DetailContractDataSectionContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Cliente:</DetailContractDataLabel>
                                            <DetailContractDataValue>{selectedContrato.cliente?.name}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Apt:</DetailContractDataLabel>
                                            <DetailContractDataValue>{selectedContrato.apt?.predio?.nome} - {selectedContrato.apt?.numero}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Aluguel:</DetailContractDataLabel>
                                            <DetailContractDataValue>R$ {selectedContrato.valorAluguel}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                        <DetailContractValueContainer>
                                            <DetailContractDataLabel>Vencimento:</DetailContractDataLabel>
                                            <DetailContractDataValue>Dia {selectedContrato.diaVencimentoPagamento}</DetailContractDataValue>
                                        </DetailContractValueContainer>
                                    </DetailContractDataSectionContainer>
                                </DetailContractDataColumnLeft>

                                <DetailContractDataColumnRight>
                                    <DetailContractDataSectionTitle>Financeiro (Prestações)</DetailContractDataSectionTitle>
                                    <FinanceiroList>
                                        {currentPageItemsFinanceiro.map((parcela, index) => (
                                            <FinanceiroListElementContainer key={index} onClick={() => navigate(`/faturas/${parcela.id}`)}>
                                                <FinanceiroListElement>
                                                    <FinanceiroListValue>
                                                        {new Date(parcela.dataVencimento).toLocaleDateString()} - {parcela.tipo}
                                                    </FinanceiroListValue>
                                                    <FinanceiroListIconContainer>
                                                        {parcela.statusPagamento === 'PAGO' && <FaCheck color="#10b981" />}
                                                        {parcela.statusPagamento === 'PENDENTE' && <FaClock color="#f59e0b" />}
                                                        {parcela.statusPagamento === 'ATRASADO' && <FaTimes color="#ef4444" />}
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

                                {selectedContrato.statusContrato === 'ATIVO' && user.isAdmin && (
                                    <RejectButton onClick={() => {
                                        if (window.confirm("Deseja cancelar este contrato?")) {
                                            const motivo = prompt("Motivo:");
                                            if (motivo) cancelContract(selectedContrato.id, motivo, setLoading);
                                        }
                                    }}>
                                        Cancelar Contrato
                                    </RejectButton>
                                )}

                                <DetailContractDownloadButton onClick={() => {
                                    setIsDownloading(true);
                                    downloadContract(selectedContrato.id, setIsDownloading);
                                }}>
                                    {isDownloading ? <ThreeDots height={20} width={20} color="#fff" /> : "Download PDF"}
                                </DetailContractDownloadButton>

                                {!selectedContrato.assinado && (
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
                    <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                        <FaCheck size={24} color="#10b981" />
                        <ContratoCounter>Aprovar Contrato</ContratoCounter>
                    </div>
                    <Formik
                        initialValues={{
                            contratoId: selectedContrato.id,
                            valorAluguel: selectedContrato.valorAluguel || '',
                            periocidade: '',
                            limiteKwh: '',
                            leituraInicial: 0
                        }}
                        validationSchema={Yup.object({
                            valorAluguel: Yup.number().required('Obrigatório'),
                            limiteKwh: Yup.number().required('Obrigatório'),
                            leituraInicial: Yup.number().required('Obrigatório'),
                        })}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            values.periocidade = selectedPeriocidade.value;
                            await approveContract(values, setSubmitting, setFieldError, setLoading);
                            setModalEditIsOpen(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormContent>
                                    <FormInputArea>
                                        <StyledSelect options={periocidade} setSelectedOption={setSelectedPeriocidade} label='Reajuste' />
                                    </FormInputArea>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Limite KWh</FormInputLabelRequired>
                                            <Limitador>
                                                <FormInput type="number" name="limiteKwh" />
                                            </Limitador>
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Valor Aluguel</FormInputLabelRequired>
                                            <Limitador>
                                                <FormInput type="number" step="0.01" name="valorAluguel" />
                                            </Limitador>
                                        </FormInputArea>
                                    </SubItensContainer>
                                    <FormInputArea>
                                        <FormInputLabelRequired>Leitura Inicial</FormInputLabelRequired>
                                        <FormInput type="number" name="leituraInicial" />
                                    </FormInputArea>
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

            {/* --- MODAL UPLOAD ASSINATURA --- */}
            <Modal isOpen={modalAssinaturaIsOpen} onRequestClose={() => setModalAssinaturaIsOpen(false)} style={modalStyles}>
                <StyledFormArea>
                    <div style={{ marginBottom: 20 }}>
                        <h3>Enviar Contrato Assinado</h3>
                    </div>
                    <Formik
                        initialValues={{ contrato: null, contratoId: selectedContrato.id }}
                        validationSchema={Yup.object({ contrato: Yup.mixed().required() })}
                        onSubmit={(values, { setSubmitting, setFieldError }) => {
                            assinarContratoById(values, setSubmitting, setFieldError, () => setModalAssinaturaIsOpen(false));
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

            {/* --- MODAL EXCLUIR --- */}
            <Modal isOpen={modalDeleteIsOpen} onRequestClose={() => setModalDeleteIsOpen(false)} style={modalStyles}>
                <DeleteContainer>
                    <DeleteTitle>Excluir Contrato?</DeleteTitle>
                    {deletting ? <ThreeDots color="red" /> : (
                        <DeleteButtonContainer>
                            <BackButton onClick={() => setModalDeleteIsOpen(false)}>Cancelar</BackButton>
                            <SubmitButton
                                style={{ backgroundColor: '#ef4444' }}
                                onClick={async () => {
                                    setDeletting(true);
                                    await deleteContratoById(selectedContrato.id, () => setModalDeleteIsOpen(false), setLoading);
                                }}
                            >
                                Excluir
                            </SubmitButton>
                        </DeleteButtonContainer>
                    )}
                </DeleteContainer>
            </Modal>

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer>
    );
};

export default ContractList;