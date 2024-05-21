import { useState } from "react";
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
    EditIcon,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabelRequired,
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

const ClientList = ({ clientes, user, setLoading, navigate }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
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

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Telefone</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                clientes.map((cliente) => (
                    <SinglePredio key={cliente.id}>
                        <PredioSingleContainer>
                            <StyledLabel>Nome: </StyledLabel>
                            <PredioValue>{cliente.name}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel><FaWhatsapp /> </StyledLabel>
                            <PredioValue href={`https://whatsa.me/55${cliente.phone}`} target='_blank'>{cliente.phone}</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon onClick={() => {
                                setSelectedClient(cliente);
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
                        <SubmitButton onClick={() => {

                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                //className='modal-responsive'
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
        </PredioListContainer >
    );
}

export default ClientList;