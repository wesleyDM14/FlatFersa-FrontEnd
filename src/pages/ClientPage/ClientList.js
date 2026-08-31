import { useState, useMemo, useEffect } from "react";
import { FaCloudUploadAlt, FaEdit, FaFileInvoice, FaTrash, FaUser, FaWhatsapp } from "react-icons/fa";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";

// Componentes
import { FormInput, StyledDatePicker } from "../../components/FormLib";
import Pagination from "../../components/Pagination";
import { ListRow } from "../../components/ListRow";
import { AuthenticatedImage } from "../../components/AuthenticatedImage";

// Estilos
import {
    BackButton,
    ButtonGroup,
    ClientCounter,
    ContentIconContainer,
    DeleteButtonContainer,
    DeleteContainer,
    DeleteIcon,
    DeleteTitle,
    EditIcon,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    Image,
    ImgContainer,
    Limitador,
    PredioListContainer,
    StyledFileArea,
    StyledFileIconContainer,
    StyledFileInput,
    StyledFileInputTitle,
    StyledFileLegend,
    StyledFormArea,
    SubItensContainer,
    SubmitButton
} from "./ClientPage.styles";
import { modalStyles } from "../../styles/ModalStyles";
import {
    DataColumn,
    DataContainer,
    RejectButton,
    SolicitacaoModalContainer,
    SolicitacaoModalContent,
    SolicitacaoModalContentLabel,
    SolicitacaoModalContentValue,
    SolicitacaoModalTitle,
    SolicitacaoTitleContainer
} from "../ContractPage/ContractPage.styles";

// Serviços
import {
    aproveClient,
    deleteClientById,
    getDocumentoImagem,
    reproveClient,
    updateClientById
} from "../../services/clientService";
import { aprovarExclusaoCliente, negarExclusaoCliente } from "../../services/userService";

const CLIENTE_STATUS_STYLE = {
    APROVADO: { icon: '#10b981', pillColor: '#059669', pillBg: '#d1fae5', label: 'Aprovado' },
    PENDENTE_APROVACAO: { icon: '#f59e0b', pillColor: '#d97706', pillBg: '#fef3c7', label: 'Pendente' },
    REPROVADO: { icon: '#ef4444', pillColor: '#dc2626', pillBg: '#fee2e2', label: 'Reprovado' },
    BLOQUEADO: { icon: '#6b7280', pillColor: '#374151', pillBg: '#f3f4f6', label: 'Bloqueado' },
};

const ClientList = ({ clientes, refreshData, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement(document.getElementById('root'));

    // Modais
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalSolicitacaoIsOpen, setModalSolicitacaoIsOpen] = useState(false);
    const [modalExclusaoIsOpen, setModalExclusaoIsOpen] = useState(false);

    const [selectedClient, setSelectedClient] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [selectedBackImage, setSelectedBackImage] = useState();
    const [selectedFrontImage, setSelectedFrontImage] = useState();

    // Loadings
    const [deletting, setDeletting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const openEditModal = () => setModalEditIsOpen(true);

    const closeEditModal = () => {
        setModalEditIsOpen(false);
        setSelectedFrontImage(undefined);
        setSelectedBackImage(undefined);
    }

    const openDeleteModal = () => setModalDeleteIsOpen(true);
    const closeDeleteModal = () => setModalDeleteIsOpen(false);

    const openExclusaoModal = () => setModalExclusaoIsOpen(true);
    const closeExclusaoModal = () => {
        setModalExclusaoIsOpen(false);
        setSelectedClient({});
    };

    const openSolicitacaoModal = () => setModalSolicitacaoIsOpen(true);
    const closeSolicitacaoModal = () => setModalSolicitacaoIsOpen(false);

    // Paginação e Filtro (Ajustado com os nomes do Prisma e proteção contra nulos)
    const filteredClients = useMemo(() => {
        const safeSearch = (search || '').toLowerCase();
        
        return clientes.filter(client => {
            const safeName = (client.nome || '').toLowerCase();
            const safePhone = (client.telefone || '').toLowerCase();
            
            return safeName.includes(safeSearch) || safePhone.includes(safeSearch);
        });
    }, [clientes, search]);

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
    const currentPageItems = filteredClients.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Busca de Documentos
    useEffect(() => {
        const fetchDocumentos = async () => {
            if (modalEditIsOpen && selectedClient?.id) {
                const frente = await getDocumentoImagem(selectedClient.id, 'Frente');
                const verso = await getDocumentoImagem(selectedClient.id, 'Verso');

                setSelectedFrontImage(frente || undefined);
                setSelectedBackImage(verso || undefined);
            }
        };

        fetchDocumentos();
    }, [modalEditIsOpen, selectedClient]);

    return (
        <PredioListContainer>
            {
                currentPageItems.map((cliente) => {
                    const st = CLIENTE_STATUS_STYLE[cliente.statusCadastro] || CLIENTE_STATUS_STYLE.PENDENTE_APROVACAO;
                    return (
                        <ListRow
                            key={cliente.id}
                            onClick={() => {
                                if (cliente.exclusaoSolicitada) {
                                    setSelectedClient(cliente);
                                    openExclusaoModal();
                                } else if (cliente.statusCadastro === 'PENDENTE_APROVACAO') {
                                    setSelectedClient(cliente);
                                    openSolicitacaoModal();
                                } else {
                                    navigate(`/clientes/${cliente.id}`);
                                }
                            }}
                            icon={<FaUser />}
                            iconColor={cliente.exclusaoSolicitada ? '#dc2626' : st.icon}
                            title={cliente.nome}
                            subtitle={cliente.telefone || 'Sem telefone cadastrado'}
                            statusLabel={cliente.exclusaoSolicitada ? 'Exclusão Solicitada' : st.label}
                            statusColor={cliente.exclusaoSolicitada ? '#dc2626' : st.pillColor}
                            statusBg={cliente.exclusaoSolicitada ? '#fee2e2' : st.pillBg}
                            actions={
                                <>
                                    {cliente.telefone && (
                                        <a
                                            href={`https://wa.me/55${cliente.telefone.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ color: '#25D366', display: 'flex' }}
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <FaWhatsapp />
                                        </a>
                                    )}
                                    <EditIcon onClick={() => {
                                        setSelectedClient(cliente);
                                        setStartDate(cliente.dataNascimento ? new Date(cliente.dataNascimento) : new Date());
                                        openEditModal();
                                    }}>
                                        <FaEdit />
                                    </EditIcon>
                                    <DeleteIcon onClick={() => {
                                        setSelectedClient(cliente);
                                        openDeleteModal();
                                    }}>
                                        <FaTrash />
                                    </DeleteIcon>
                                </>
                            }
                        />
                    );
                })
            }

            {/* MODAL DE DELETAR */}
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Cliente {selectedClient.nome}?</DeleteTitle>
                    {
                        deletting ? (
                            <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                        ) : (
                            <DeleteButtonContainer>
                                <BackButton onClick={() => {
                                    setSelectedClient({});
                                    closeDeleteModal();
                                }}>
                                    Cancelar
                                </BackButton>
                                <SubmitButton onClick={async () => {
                                    setDeletting(true);
                                    await deleteClientById(selectedClient.id, setDeletting);
                                    refreshData();
                                    closeDeleteModal();
                                }}>
                                    Excluir
                                </SubmitButton>
                            </DeleteButtonContainer>
                        )
                    }
                </DeleteContainer>
            </Modal>

            {/* MODAL DE EDITAR */}
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                style={modalStyles}
            >
                <StyledFormArea>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <ContentIconContainer>
                            <FaFileInvoice />
                        </ContentIconContainer>
                        <ClientCounter>Editar Cliente</ClientCounter>
                    </div>
                    <Formik
                        initialValues={{
                            id: selectedClient.id,
                            name: selectedClient.nome || '',
                            cpf: selectedClient.cpf || '',
                            rg: selectedClient.rg || '',
                            phone: selectedClient.telefone || '',
                            address: selectedClient.enderecoAtual || '',
                        }}
                        validationSchema={
                            Yup.object({
                                name: Yup.string().required('Obrigatório'),
                                phone: Yup.string().required('Obrigatório'),
                                address: Yup.string().required('Endereço é Obrigatório'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            values.dateBirth = startDate;
                            await updateClientById(values, setSubmitting, setFieldError, closeEditModal);
                            refreshData();
                            closeEditModal();
                        }}
                    >
                        {
                            ({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <FormContent>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                <FormInput type='text' name='name' placeholder='Nome do cliente' />
                                            </FormInputArea>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput name='cpf' type='text' placeholder='CPF do cliente' />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput name='rg' type='text' placeholder='RG do cliente' />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                <FormInput type='text' name='address' placeholder='Endereço do cliente' />
                                            </FormInputArea>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                                    <Limitador>
                                                        <StyledDatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput name='phone' type='text' placeholder='Telefone' />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>

                                            {/* UPLOAD FRENTE */}
                                            <FormInputArea>
                                                <FormInputLabel>Documento de Identificação (Frente)</FormInputLabel>
                                                <StyledFileArea>
                                                    {selectedFrontImage ? (
                                                        <Image src={selectedFrontImage} />
                                                    ) : selectedClient.docFrenteUrl ? (
                                                        <AuthenticatedImage clientId={selectedClient.id} tipo="Frente" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }} />
                                                    ) : (
                                                        <div>
                                                            <StyledFileIconContainer>
                                                                <FaCloudUploadAlt />
                                                            </StyledFileIconContainer>
                                                            <StyledFileInputTitle>Clique para enviar o arquivo</StyledFileInputTitle>
                                                            <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                        </div>
                                                    )}
                                                    <StyledFileInput
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            const file = event.target.files[0];
                                                            setFieldValue('documentFront', file);
                                                            setSelectedFrontImage(file ? URL.createObjectURL(file) : undefined);
                                                        }}
                                                    />
                                                </StyledFileArea>
                                            </FormInputArea>

                                            {/* UPLOAD VERSO */}
                                            <FormInputArea>
                                                <FormInputLabel>Documento de Identificação (Verso)</FormInputLabel>
                                                <StyledFileArea>
                                                    {selectedBackImage ? (
                                                        <Image src={selectedBackImage} />
                                                    ) : selectedClient.docVersoUrl ? (
                                                        <AuthenticatedImage clientId={selectedClient.id} tipo="Verso" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }} />
                                                    ) : (
                                                        <div>
                                                            <StyledFileIconContainer>
                                                                <FaCloudUploadAlt />
                                                            </StyledFileIconContainer>
                                                            <StyledFileInputTitle>Clique para enviar o arquivo</StyledFileInputTitle>
                                                            <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                        </div>
                                                    )}
                                                    <StyledFileInput
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            const file = event.target.files[0];
                                                            setFieldValue('documentBack', file);
                                                            setSelectedBackImage(file ? URL.createObjectURL(file) : undefined);
                                                        }}
                                                    />
                                                </StyledFileArea>
                                            </FormInputArea>
                                        </FormColum>
                                    </FormContent>

                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => closeEditModal()}>Voltar</BackButton>
                                        {!isSubmitting ? (
                                            <SubmitButton type="submit">Salvar</SubmitButton>
                                        ) : (
                                            <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                                        )}
                                    </ButtonGroup>
                                </Form>
                            )
                        }
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* MODAL DE APROVAÇÃO / SOLICITAÇÃO */}
            <Modal
                isOpen={modalSolicitacaoIsOpen}
                onRequestClose={closeSolicitacaoModal}
                style={modalStyles}
            >
                <>
                    <SolicitacaoModalContainer>
                        <SolicitacaoTitleContainer>
                            <SolicitacaoModalTitle>Solicitação de Acesso</SolicitacaoModalTitle>
                        </SolicitacaoTitleContainer>
                        <SolicitacaoModalContent>
                            <DataColumn>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Nome:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.nome}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>CPF:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.cpf}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>RG:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.rg}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Telefone:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.telefone}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Data Nascimento:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>
                                        {selectedClient.dataNascimento ? new Date(selectedClient.dataNascimento).toLocaleDateString() : 'N/A'}
                                    </SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Endereço:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.enderecoAtual}</SolicitacaoModalContentValue>
                                </DataContainer>
                            </DataColumn>

                            <DataColumn>
                                <ImgContainer>
                                    <SolicitacaoModalContentLabel>Documento (Frente): </SolicitacaoModalContentLabel>
                                    <AuthenticatedImage
                                        clientId={selectedClient.id}
                                        tipo="Frente"
                                        openOnClick
                                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                    />
                                </ImgContainer>

                                <ImgContainer>
                                    <SolicitacaoModalContentLabel>Documento (Verso): </SolicitacaoModalContentLabel>
                                    <AuthenticatedImage
                                        clientId={selectedClient.id}
                                        tipo="Verso"
                                        openOnClick
                                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                    />
                                </ImgContainer>
                            </DataColumn>
                        </SolicitacaoModalContent>

                        {isProcessing ? (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                            </div>
                        ) : (
                            <ButtonGroup>
                                <BackButton
                                    type='button'
                                    onClick={() => {
                                        setSelectedClient({});
                                        closeSolicitacaoModal();
                                    }}
                                >
                                    Fechar
                                </BackButton>
                                <RejectButton
                                    type='button'
                                    onClick={async () => {
                                        if (window.confirm("Tem certeza que deseja rejeitar?")) {
                                            let message = window.prompt("Por favor informe o motivo da rejeição: ");
                                            if (!message) {
                                                window.alert("Por favor informe um motivo.");
                                            } else {
                                                await reproveClient(selectedClient.id, message, setIsProcessing, closeSolicitacaoModal);
                                                refreshData();
                                            }
                                        }
                                    }}
                                >
                                    Rejeitar
                                </RejectButton>
                                <SubmitButton
                                    type="button"
                                    onClick={async () => {
                                        await aproveClient(selectedClient.id, setIsProcessing, closeSolicitacaoModal);
                                        refreshData();
                                    }}
                                >
                                    Aprovar
                                </SubmitButton>
                            </ButtonGroup>
                        )}
                    </SolicitacaoModalContainer>
                </>
            </Modal>

            {/* MODAL DE REVISÃO DE EXCLUSÃO DE CONTA */}
            <Modal
                isOpen={modalExclusaoIsOpen}
                onRequestClose={closeExclusaoModal}
                style={modalStyles}
                contentLabel="Solicitação de Exclusão de Conta"
            >
                <SolicitacaoModalContainer>
                    <SolicitacaoTitleContainer>
                        <SolicitacaoModalTitle>Solicitação de Exclusão de Conta</SolicitacaoModalTitle>
                    </SolicitacaoTitleContainer>
                    <SolicitacaoModalContent>
                        <DataColumn>
                            <DataContainer>
                                <SolicitacaoModalContentLabel>Nome:</SolicitacaoModalContentLabel>
                                <SolicitacaoModalContentValue>{selectedClient.nome}</SolicitacaoModalContentValue>
                            </DataContainer>
                            <DataContainer>
                                <SolicitacaoModalContentLabel>CPF:</SolicitacaoModalContentLabel>
                                <SolicitacaoModalContentValue>{selectedClient.cpf}</SolicitacaoModalContentValue>
                            </DataContainer>
                            <DataContainer>
                                <SolicitacaoModalContentLabel>Solicitado em:</SolicitacaoModalContentLabel>
                                <SolicitacaoModalContentValue>
                                    {selectedClient.dataSolicitacaoExclusao ? new Date(selectedClient.dataSolicitacaoExclusao).toLocaleDateString('pt-BR') : '-'}
                                </SolicitacaoModalContentValue>
                            </DataContainer>
                        </DataColumn>
                    </SolicitacaoModalContent>

                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '10px 0 20px' }}>
                        Se aprovado, os dados pessoais deste cliente (nome, CPF, RG, documentos, telefone e endereço)
                        serão anonimizados. Isso só é possível se ele não tiver contrato ativo no momento.
                    </p>

                    {isProcessing ? (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                        </div>
                    ) : (
                        <ButtonGroup>
                            <BackButton type='button' onClick={closeExclusaoModal}>Fechar</BackButton>
                            <RejectButton
                                type='button'
                                onClick={async () => {
                                    const motivo = window.prompt("Motivo para negar a exclusão:");
                                    if (!motivo) return;
                                    setIsProcessing(true);
                                    try {
                                        await negarExclusaoCliente(selectedClient.id, motivo);
                                        refreshData();
                                        closeExclusaoModal();
                                    } catch (err) {
                                        alert(err.response?.data?.message || "Erro ao negar exclusão.");
                                    } finally {
                                        setIsProcessing(false);
                                    }
                                }}
                            >
                                Negar
                            </RejectButton>
                            <SubmitButton
                                type="button"
                                onClick={async () => {
                                    if (!window.confirm("Confirma a anonimização dos dados deste cliente? Essa ação não pode ser desfeita.")) return;
                                    setIsProcessing(true);
                                    try {
                                        await aprovarExclusaoCliente(selectedClient.id);
                                        refreshData();
                                        closeExclusaoModal();
                                    } catch (err) {
                                        alert(err.response?.data?.message || "Erro ao aprovar exclusão.");
                                    } finally {
                                        setIsProcessing(false);
                                    }
                                }}
                            >
                                Aprovar Exclusão
                            </SubmitButton>
                        </ButtonGroup>
                    )}
                </SolicitacaoModalContainer>
            </Modal>

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default ClientList;