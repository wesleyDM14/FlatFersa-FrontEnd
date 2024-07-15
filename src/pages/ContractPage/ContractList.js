import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import * as Yup from 'yup';

import {
    FaCheck,
    FaClock,
    FaCloudUploadAlt,
    FaEdit,
    FaFileContract,
    FaFileInvoice,
    FaFilePdf,
    FaTimes,
    FaTrash,
    FaUserAlt
} from "react-icons/fa";
import {
    AdminPredioContainer,
    BackButton,
    ButtonGroup,
    ContentIconContainer,
    ContratoCounter,
    DataColumn,
    DataContainer,
    DataIconContainer,
    DataSection,
    DeleteButtonContainer,
    DeleteContainer,
    DeleteIcon,
    DeleteTitle,
    DetailContractBackButton,
    DetailContractButtonGroup,
    DetailContractContainer,
    DetailContractDataColumnLeft,
    DetailContractDataColumnRight,
    DetailContractDataContainer,
    DetailContractDataLabel,
    DetailContractDataSectionContainer,
    DetailContractDataSectionTitle,
    DetailContractDataValue,
    DetailContractDownloadButton,
    DetailContractHeaderContainer,
    DetailContractHeaderSubTitle,
    DetailContractHeaderTitle,
    DetailContractValueContainer,
    EditIcon,
    FinanceiroList,
    FinanceiroListElement,
    FinanceiroListElementContainer,
    FinanceiroListIconContainer,
    FinanceiroListValue,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    Limitador,
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    RejectButton,
    SinglePredio,
    SolicitacaoContratoDataContainer,
    SolicitacaoModalContainer,
    SolicitacaoModalContent,
    SolicitacaoModalContentLabel,
    SolicitacaoModalContentValue,
    SolicitacaoModalTitle,
    SolicitacaoTitleContainer,
    StyledFormArea,
    StyledLabel,
    SubItensContainer,
    SubTitle,
    SubmitButton
} from "./ContractPage.styles";

import { approveContract, assinarContratoById, cancelContract, deleteContratoById, desapproveContract, downloadContract } from "../../services/contratoService";
import { modalStyles } from "../../styles/ModalStyles";
import { FaHouse } from "react-icons/fa6";
import { FormInput, StyledSelect } from "../../components/FormLib";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "../../components/Pagination";
import { ClientCounter, StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle, StyledFileLegend } from "../ClientPage/ClientPage.styles";
import { PdfPreview } from "../FinanceiroPage/FinanceiroPage.styles";

const ContractList = ({ contratos, user, setLoading, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalContractIsOpen, setModalContractIsOpen] = useState(false);
    const [selectedContrato, setSelectedContrato] = useState({});
    const [selectedPeriocidade, setSelectedPeriocidade] = useState({});
    const [isDownloading, setIsDownloading] = useState(false);

    const [modalAssinaturaIsOpen, setModalAssinaturaIsOpen] = useState(false);

    const [financeiroPage, setFinanceiroPage] = useState(1);
    const [fileType, setFileType] = useState(null);

    const periocidade = [
        { label: 'Anualmente', value: 'ANUALMENTE' },
        { label: 'Semestralmente', value: 'SEMESTRALMENTE' },
    ];

    const openEditModal = () => {
        setModalEditIsOpen(true);
    }

    const closeEditModal = () => {
        setModalEditIsOpen(false);
    }

    const openDeleteModal = () => {
        setModalDeleteIsOpen(true);
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
    }

    const openModalAssinatura = () => {
        setModalAssinaturaIsOpen(true);
    }

    const closeModalAssinatura = () => {
        setModalAssinaturaIsOpen(false);
    }

    const openContractModal = () => {
        !(modalEditIsOpen && modalDeleteIsOpen) && setModalContractIsOpen(true);
    }

    const closeContractModal = () => {
        setModalContractIsOpen(false);
    }

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('contrato', file);
        setFileType(file.type);
    }

    const filteredContratos = useMemo(() => {
        if (user.isAdmin) {
            return contratos.filter(contrato =>
                contrato.cliente.name.toLowerCase().includes(search.toLowerCase()) ||
                contrato.apartamento.numero.toString().includes(search) ||
                contrato.contrato.statusContrato.toLowerCase().includes(search.toLowerCase())
            );
        } else {
            return contratos.filter(contrato =>
                contrato.apartamento.numero.toString().includes(search) ||
                contrato.contrato.statusContrato.toLowerCase().includes(search.toLowerCase())
            );
        }
    }, [contratos, search, user]);

    const totalPages = Math.ceil(filteredContratos.length / itemsPerPage);
    const currentPageItems = filteredContratos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const totalPagesFinanceiro = selectedContrato.financeiro && Math.ceil(selectedContrato.financeiro.length / itemsPerPage);
    const currentPageItemsFinanceiro = selectedContrato.financeiro && selectedContrato.financeiro.slice((financeiroPage - 1) * itemsPerPage, financeiroPage * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader $isadmin={user.isAdmin.toString()}>
                {
                    user.isAdmin && (<ListLabel>Cliente</ListLabel>)
                }
                <ListLabel>Apartamento</ListLabel>
                <ListLabel>Status</ListLabel>
                {
                    user.isAdmin && (<ListLabel>Opções</ListLabel>)
                }
            </PredioListHeader>
            {
                currentPageItems.map((contract) => (
                    <SinglePredio
                        key={contract.contrato.id}
                        $isadmin={user.isAdmin.toString()}
                        onClick={() => {
                            setSelectedContrato(contract);
                            openContractModal();
                        }}
                    >
                        {
                            user.isAdmin && (
                                <PredioSingleContainer>
                                    <StyledLabel>Cliente: </StyledLabel>
                                    <PredioValue>{contract.cliente.name}</PredioValue>
                                </PredioSingleContainer>
                            )
                        }
                        <PredioSingleContainer >
                            <StyledLabel>Apartamento: </StyledLabel>
                            <PredioValue>{contract.apartamento.numero}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Status: </StyledLabel>
                            <PredioValue>{contract.contrato.statusContrato}</PredioValue>
                        </PredioSingleContainer>
                        {
                            user.isAdmin && (
                                <AdminPredioContainer>
                                    <EditIcon>
                                        <FaEdit
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedContrato(contract);
                                                openEditModal();
                                            }}
                                        />
                                    </EditIcon>
                                    <DeleteIcon>
                                        <FaTrash
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedContrato(contract);
                                                openDeleteModal();
                                            }}
                                        />
                                    </DeleteIcon>
                                </AdminPredioContainer>
                            )
                        }
                    </SinglePredio>
                ))
            }
            <Modal
                isOpen={modalContractIsOpen}
                onRequestClose={closeContractModal}
                style={modalStyles}
            >
                {
                    selectedContrato.contrato && (
                        selectedContrato.contrato.statusContrato === 'AGUARDANDO' ? (
                            <div>
                                <SolicitacaoModalContainer>
                                    <SolicitacaoTitleContainer>
                                        <SolicitacaoModalTitle>Detalhes da Solicitação</SolicitacaoModalTitle>
                                    </SolicitacaoTitleContainer>
                                    <SolicitacaoModalContent>
                                        <DataColumn>
                                            <DataSection>
                                                <DataIconContainer>
                                                    <FaUserAlt />
                                                </DataIconContainer>
                                                <SubTitle>Dados do Cliente</SubTitle>
                                            </DataSection>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Nome: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.cliente.name}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>CPF: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.cliente.cpf}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Nascimento: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{new Date(selectedContrato.cliente.dateBirth).toLocaleDateString()}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                        </DataColumn>
                                        <DataColumn>
                                            <DataSection>
                                                <DataIconContainer>
                                                    <FaHouse />
                                                </DataIconContainer>
                                                <SubTitle>Dados do Apartamento</SubTitle>
                                            </DataSection>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Prédio: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.predio.nome}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Número: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.apartamento.numero}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Climatizado: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.apartamento.climatizado ? <FaCheck color="#0F0" /> : <FaTimes color="#F00" />}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                        </DataColumn>
                                    </SolicitacaoModalContent>
                                    <SolicitacaoContratoDataContainer>
                                        <DataSection>
                                            <DataIconContainer>
                                                <FaFileContract />
                                            </DataIconContainer>
                                            <SubTitle>Dados do Contrato</SubTitle>
                                        </DataSection>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Data de Incício: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>{new Date(selectedContrato.contrato.dataInicio).toLocaleDateString()}</SolicitacaoModalContentValue>
                                        </DataContainer>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Duração: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>{selectedContrato.contrato.duracaoContrato} Meses</SolicitacaoModalContentValue>
                                        </DataContainer>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Vencimento: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>Todo dia {selectedContrato.contrato.diaVencimentoPagamento}</SolicitacaoModalContentValue>
                                        </DataContainer>
                                    </SolicitacaoContratoDataContainer>
                                    {
                                        user.isAdmin && (
                                            <StyledFormArea>
                                                <Formik
                                                    initialValues={{
                                                        contratoId: selectedContrato.contrato.id,
                                                        valorAluguel: selectedContrato.apartamento.valorBase,
                                                        periocidade: '',
                                                        limiteKwh: 0,
                                                    }}

                                                    validationSchema={Yup.object({
                                                        valorAluguel: Yup.number().required('Obrigatório'),
                                                        limiteKwh: Yup.number().required('Obrigatório'),
                                                    })}

                                                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                                        values.periocidade = selectedPeriocidade.value;
                                                        await approveContract(user, values, setSubmitting, setFieldError, setLoading);
                                                    }}
                                                >
                                                    {
                                                        ({ isSubmitting }) => (
                                                            <Form>
                                                                <FormContent>
                                                                    <FormColum>
                                                                        <FormInputArea>
                                                                            <StyledSelect options={periocidade} setSelectedOption={setSelectedPeriocidade} label='Periocidade de Reajuste' />
                                                                        </FormInputArea>
                                                                    </FormColum>
                                                                    <FormColum>
                                                                        <SubItensContainer>
                                                                            <FormInputArea>
                                                                                <FormInputLabelRequired>Limite de KWh</FormInputLabelRequired>
                                                                                <Limitador>
                                                                                    <FormInput
                                                                                        type="number"
                                                                                        min="0"
                                                                                        step="1"
                                                                                        name="limiteKwh"
                                                                                        placeholder="Valor limite de KWh"
                                                                                    />
                                                                                </Limitador>
                                                                            </FormInputArea>
                                                                            <FormInputArea>
                                                                                <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                                                <Limitador>
                                                                                    <FormInput
                                                                                        type="number"
                                                                                        min="0.00"
                                                                                        step="0.01"
                                                                                        name="valorAluguel"
                                                                                        placeholder="Valor do Aluguel"
                                                                                    />
                                                                                </Limitador>
                                                                            </FormInputArea>
                                                                        </SubItensContainer>
                                                                    </FormColum>
                                                                </FormContent>
                                                                <ButtonGroup>
                                                                    <BackButton
                                                                        type='button'
                                                                        onClick={() => {
                                                                            setSelectedContrato({});
                                                                            closeContractModal();
                                                                        }}
                                                                    >
                                                                        Fechar
                                                                    </BackButton>
                                                                    <RejectButton
                                                                        type='button'
                                                                        onClick={async () => {
                                                                            await desapproveContract(user, selectedContrato.contrato.id, setLoading);
                                                                        }}
                                                                    >
                                                                        Rejeitar
                                                                    </RejectButton>
                                                                    {!isSubmitting && (
                                                                        <SubmitButton type="submit">Aprovar</SubmitButton>
                                                                    )}
                                                                    {
                                                                        isSubmitting && (
                                                                            <ThreeDots
                                                                                color={'#4e4e4e'}
                                                                                height={49}
                                                                                width={100}
                                                                            />
                                                                        )
                                                                    }
                                                                </ButtonGroup>
                                                            </Form>
                                                        )
                                                    }
                                                </Formik>
                                            </StyledFormArea>
                                        )
                                    }
                                </SolicitacaoModalContainer>
                            </div>
                        ) : (
                            <DetailContractContainer>
                                <DetailContractHeaderContainer>
                                    <DetailContractHeaderTitle>Detalhes do Contrato</DetailContractHeaderTitle>
                                    <DetailContractHeaderSubTitle>Contrato {selectedContrato.contrato.statusContrato}</DetailContractHeaderSubTitle>
                                </DetailContractHeaderContainer>
                                <DetailContractDataContainer>
                                    <DetailContractDataColumnLeft>
                                        <DetailContractDataSectionTitle>Dados do Cliente</DetailContractDataSectionTitle>
                                        <DetailContractDataSectionContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Nome: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.cliente.name}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>CPF: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.cliente.cpf}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>RG: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.cliente.rg}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                        </DetailContractDataSectionContainer>
                                        <DetailContractDataSectionTitle>Dados do Apartamento</DetailContractDataSectionTitle>
                                        <DetailContractDataSectionContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Predio: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.predio.nome}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Numero: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.apartamento.numero}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Climatizado: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.apartamento.climatizado ? <FaCheck color="#0F0" /> : <FaTimes color="#F00" />}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                        </DetailContractDataSectionContainer>
                                        <DetailContractDataSectionTitle>Dados do Contrato</DetailContractDataSectionTitle>
                                        <DetailContractDataSectionContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Valor Aluguel: </DetailContractDataLabel>
                                                <DetailContractDataValue>R$ {parseFloat(selectedContrato.contrato.valorAluguel).toFixed(2)}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Inicio: </DetailContractDataLabel>
                                                <DetailContractDataValue>{new Date(selectedContrato.contrato.dataInicio).toLocaleDateString()}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Duração: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.contrato.duracaoContrato} meses</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                            <DetailContractValueContainer>
                                                <DetailContractDataLabel>Reajuste: </DetailContractDataLabel>
                                                <DetailContractDataValue>{selectedContrato.contrato.periodicidadeReajuste}</DetailContractDataValue>
                                            </DetailContractValueContainer>
                                        </DetailContractDataSectionContainer>
                                    </DetailContractDataColumnLeft>
                                    <DetailContractDataColumnRight>
                                        <DetailContractDataSectionTitle>Financeiro</DetailContractDataSectionTitle>
                                        <FinanceiroList>
                                            {
                                                currentPageItemsFinanceiro.map((parcela, index) => (
                                                    <FinanceiroListElementContainer key={index} onClick={() => navigate(`/prestacao/${parcela.id}`)}>
                                                        <FinanceiroListElement>
                                                            <FinanceiroListValue>
                                                                {new Date(parcela.dataVencimento).toLocaleDateString()} - {parcela.tipo} - {parcela.statusPagamento}
                                                                <FinanceiroListIconContainer>
                                                                    {
                                                                        parcela.statusPagamento === 'PENDENTE' && (
                                                                            <FaClock />
                                                                        )
                                                                    }
                                                                    {
                                                                        parcela.statusPagamento === 'PAGO' && (
                                                                            <FaCheck color="#0F0" />
                                                                        )
                                                                    }
                                                                    {
                                                                        parcela.statusPagamento === 'ATRASADO' && (
                                                                            <FaTimes color="#F00" />
                                                                        )
                                                                    }
                                                                </FinanceiroListIconContainer>
                                                            </FinanceiroListValue>
                                                        </FinanceiroListElement>
                                                    </FinanceiroListElementContainer>
                                                ))
                                            }
                                            <Pagination totalPages={totalPagesFinanceiro} currentPage={financeiroPage} setPage={setFinanceiroPage} />
                                        </FinanceiroList>
                                    </DetailContractDataColumnRight>
                                </DetailContractDataContainer>
                                <DetailContractButtonGroup>
                                    <DetailContractBackButton onClick={() => closeContractModal()}>Voltar</DetailContractBackButton>
                                    {(selectedContrato.contrato.statusContrato === 'ATIVO' && user.isAdmin) && (
                                        <RejectButton onClick={async () => {
                                            if (window.confirm("Tem certeza?")) {
                                                let message = window.prompt("Por favor informe o motivo: ");
                                                if (message === null || message === "") {
                                                    window.alert("Por favor informe um motivo.");
                                                } else {
                                                    await cancelContract(user, selectedContrato.contrato.id, message, setLoading);
                                                }
                                            } else {
                                                return;
                                            }
                                        }}>
                                            Cancelar Contrato
                                        </RejectButton>
                                    )}
                                    {!(selectedContrato.contrato.statusContrato === 'CANCELADO') && (
                                        isDownloading ?
                                            <ThreeDots />
                                            :
                                            <DetailContractDownloadButton onClick={async () => {
                                                setIsDownloading(true);
                                                await downloadContract(user, selectedContrato.contrato.id, setIsDownloading);
                                            }}>
                                                Download PDF
                                            </DetailContractDownloadButton>
                                    )}
                                    {!selectedContrato.contrato.assinado && (
                                        <DetailContractDownloadButton onClick={async () => {
                                            openModalAssinatura();
                                        }}>
                                            Enviar PDF assinado
                                        </DetailContractDownloadButton>
                                    )}
                                </DetailContractButtonGroup>
                            </DetailContractContainer>
                        )
                    )
                }
            </Modal>
            <Modal
                isOpen={modalAssinaturaIsOpen}
                onRequestClose={closeModalAssinatura}
                style={modalStyles}
            >
                <StyledFormArea>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <ContentIconContainer>
                            <FaFileInvoice />
                        </ContentIconContainer>
                        <ClientCounter>Enviar Contrato Assinado</ClientCounter>
                    </div>
                    <Formik
                        initialValues={{
                            contrato: null,
                            contratoId: selectedContrato.contrato && selectedContrato.contrato.id,
                        }}
                        validationSchema={
                            Yup.object().shape({
                                contrato: Yup.mixed().required('PDF é Obrigatório'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            await assinarContratoById(user, values, setSubmitting, setFieldError, setLoading, closeModalAssinatura);
                        }}
                    >
                        {
                            ({ isSubmitting, setFieldValue, values }) => (
                                <Form>
                                    <FormInputArea>
                                        <FormInputLabel>Contrato Assinado</FormInputLabel>
                                        <StyledFileArea>
                                            {
                                                fileType === 'application/pdf' ? (
                                                    <PdfPreview>
                                                        <FaFilePdf />
                                                    </PdfPreview>
                                                ) : (
                                                    <div>
                                                        <StyledFileIconContainer>
                                                            <FaCloudUploadAlt />
                                                        </StyledFileIconContainer>
                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                        <StyledFileLegend>Tamanho máximo 5MB</StyledFileLegend>
                                                    </div>
                                                )
                                            }
                                            <StyledFileInput
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(event) => handleFileChange(event, setFieldValue)}
                                            />
                                        </StyledFileArea>
                                    </FormInputArea>
                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => closeModalAssinatura()}>Voltar</BackButton>
                                        {
                                            !isSubmitting && (
                                                <SubmitButton type="submit">Registrar</SubmitButton>
                                            )
                                        }
                                        {
                                            isSubmitting && (
                                                <ThreeDots
                                                    color={'#4e4e4e'}
                                                    height={49}
                                                    width={100}
                                                />
                                            )
                                        }
                                    </ButtonGroup>
                                </Form>
                            )
                        }
                    </Formik>
                </StyledFormArea>
            </Modal>
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                style={modalStyles}
            >
                <h1>Modal Edit</h1>
            </Modal>
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Contrato?</DeleteTitle>
                    <ContratoCounter>Cliente: {selectedContrato.cliente && (selectedContrato.cliente.name)} / Apartamento: {selectedContrato.apartamento && (selectedContrato.apartamento.numero)}</ContratoCounter>
                    <DeleteButtonContainer>
                        <BackButton onClick={() => {
                            setSelectedContrato({});
                            closeDeleteModal();
                        }}>
                            Cancelar
                        </BackButton>
                        <SubmitButton onClick={async () => {
                            await deleteContratoById(user, selectedContrato.contrato.id, setLoading);
                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default ContractList;