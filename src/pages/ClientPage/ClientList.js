import { useState, useMemo } from "react";
import { FaEdit, FaFileInvoice, FaTrash, FaWhatsapp } from "react-icons/fa";
import {
    AdminPredioContainer,
    BackButton,
    ButtonGroup,
    ClientCounter,
    ContentIconContainer,
    DeleteButtonContainer,
    DeleteContainer,
    DeleteIcon,
    DeleteTitle,
    DocumentImage,
    EditIcon,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabelRequired,
    ImgContainer,
    Limitador,
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    SinglePredio,
    StyledFormArea,
    StyledLabel,
    SubItensContainer,
    SubmitButton
} from "./ClientPage.styles";

import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { modalStyles } from "../../styles/ModalStyles";
import { ThreeDots } from "react-loader-spinner";
import { FormInput } from "../../components/FormLib";
import { aproveClient, deleteClientById, reproveClient } from "../../services/clientService";
import Pagination from "../../components/Pagination";
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

const ClientList = ({ clientes, user, setLoading, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalSolicitacaoIsOpen, setModalSolicitacaoIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState({});

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

    const openSolicitacaoModal = () => {
        setModalSolicitacaoIsOpen(true);
    }

    const closeSolicitacaoModal = () => {
        setModalSolicitacaoIsOpen(false);
    }

    const filteredClients = useMemo(() =>
        clientes.filter(client =>
            client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.phone.toLowerCase().includes(search.toLowerCase())
        ), [clientes, search]);

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
    const currentPageItems = filteredClients.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel className="hidden-responsive">Telefone</ListLabel>
                <ListLabel>Status</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                currentPageItems.map((cliente) => (
                    <SinglePredio
                        key={cliente.id}
                        onClick={() => {
                            if (cliente.statusClient === 'AGUARDANDO') {
                                setSelectedClient(cliente);
                                openSolicitacaoModal();
                            } else {
                                navigate(`/clientes/${cliente.id}`);
                            }
                        }}
                    >
                        <PredioSingleContainer>
                            <StyledLabel>Nome: </StyledLabel>
                            <PredioValue>{cliente.name}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer className="hidden-responsive">
                            <StyledLabel><FaWhatsapp /> </StyledLabel>
                            <PredioValue
                                href={`https://whatsa.me/55${cliente.phone}`}
                                target='_blank'
                                onClick={(event) => event.stopPropagation()}
                            >
                                {cliente.phone}
                            </PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel> Status: </StyledLabel>
                            <PredioValue>{cliente.statusClient}</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon onClick={(event) => {
                                event.stopPropagation();
                                setSelectedClient(cliente);
                                openEditModal();
                            }}>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon onClick={(event) => {
                                event.stopPropagation();
                                setSelectedClient(cliente);
                                openDeleteModal();
                            }}>
                                <FaTrash />
                            </DeleteIcon>
                        </AdminPredioContainer>
                    </SinglePredio >
                ))
            }
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Cliente {selectedClient.name}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <BackButton onClick={() => {
                            setSelectedClient({});
                            closeDeleteModal();
                        }}>
                            Cancelar
                        </BackButton>
                        <SubmitButton onClick={async () => {
                            await deleteClientById(user, selectedClient.id, setLoading);
                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
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
                            name: selectedClient.name,
                            cpf: selectedClient.cpf,
                            rg: selectedClient.rg,
                            phone: selectedClient.phone,
                            address: selectedClient.address,
                        }}
                        validationSchema={
                            Yup.object({
                                name: Yup.string().required('Obrigatório'),
                                phone: Yup.string().required('Obrigatório'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            //update client
                        }}
                    >
                        {
                            ({ isSubmitting }) => (
                                <Form>
                                    <FormContent>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                <FormInput
                                                    type='text'
                                                    name='name'
                                                    placeholder='Nome do cliente'
                                                />
                                            </FormInputArea>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            name='cpf'
                                                            type='text'
                                                            placeholder='CPF do cliente'
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            name='rg'
                                                            type='text'
                                                            placeholder='RG do cliente'
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                <FormInput
                                                    type='text'
                                                    name='address'
                                                    placeholder='Endereço do cliente'
                                                />
                                            </FormInputArea>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            name='phone'
                                                            type='text'
                                                            placeholder='Telefone'
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                    </FormContent>
                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => closeEditModal()}>Voltar</BackButton>
                                        {
                                            !isSubmitting && (
                                                <SubmitButton type="submit">Salvar</SubmitButton>
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
                                    <SolicitacaoModalContentValue>{selectedClient.name}</SolicitacaoModalContentValue>
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
                                    <SolicitacaoModalContentValue>{selectedClient.phone}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Data Nascimento:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{new Date(selectedClient.dateBirth).toLocaleDateString()}</SolicitacaoModalContentValue>
                                </DataContainer>
                                <DataContainer>
                                    <SolicitacaoModalContentLabel>Endereço:</SolicitacaoModalContentLabel>
                                    <SolicitacaoModalContentValue>{selectedClient.address}</SolicitacaoModalContentValue>
                                </DataContainer>
                            </DataColumn>
                            <DataColumn>
                                <ImgContainer>
                                    <SolicitacaoModalContentLabel>Documento de Identificação (Frente): </SolicitacaoModalContentLabel>
                                    <DocumentImage src={selectedClient.documentoFrente} />
                                </ImgContainer>
                                <ImgContainer>
                                    <SolicitacaoModalContentLabel>Documento de Identificação (Verso): </SolicitacaoModalContentLabel>
                                    <DocumentImage src={selectedClient.documentoVerso} />
                                </ImgContainer>
                            </DataColumn>
                        </SolicitacaoModalContent>
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
                                    if (window.confirm("Tem certeza?")) {
                                        let message = window.prompt("Por favor informe o motivo: ");
                                        if (message === null || message === "") {
                                            window.alert("Por favor informe um motivo.");
                                        } else {
                                            await reproveClient(user, selectedClient.id, message, setLoading);
                                        }
                                    }
                                }}
                            >
                                Rejeitar
                            </RejectButton>
                            <SubmitButton
                                type="button"
                                onClick={async () => {
                                    await aproveClient(user, selectedClient.id, setLoading);
                                }}
                            >
                                Aprovar
                            </SubmitButton>
                        </ButtonGroup>
                    </SolicitacaoModalContainer>
                </>
            </Modal>
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default ClientList;