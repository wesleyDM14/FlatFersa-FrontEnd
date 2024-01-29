import { useState, useEffect } from "react";
import {
    ButtonGroup,
    LoadingContainer,
    MainContainer,
    MainHeader,
    MainIconTitleContainer,
    MainRegisterContainer,
    MainRegisterIconContainer,
    MainRegisterTitle,
    MainTitle,
    MainTitleContainer,
    StyledFormArea,
    StyledFormButton,
    StyledTitle,
    colors,
    modalStyles,
} from "./../Styles";
import {
    FaGlobe,
    FaMailBulk,
    FaPhone,
    FaPlusCircle,
    FaRegAddressBook,
    FaRegNewspaper,
    FaUser,
    FaUserFriends,
    FaWpforms,
} from "react-icons/fa";
import Modal from 'react-modal';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";
import { TextInput } from "./../FormLib";
import { cpf } from 'cpf-cnpj-validator';
import { getAllClients, registerClient } from "../../auth/actions/clientActions";
import ClientList from "./clientsList";

const ClientsMain = ({ user, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const [clients, setClients] = useState([]);
    const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
    const [modalRequestIsOpen, setModalRequestIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openRegisterModal = () => {
        setModalRegisterIsOpen(true);
    }

    const closeRegisterModal = () => {
        setModalRegisterIsOpen(false);
    }

    const openRequestModal = () => {
        setModalRequestIsOpen(true);
    }

    const closeRequestModal = () => {
        setModalRequestIsOpen(false);
    }

    useEffect(() => {
        async function loadDataClients() {
            if (loading) {
                let temp = await getAllClients(user, { setLoading });
                setClients(temp);
            }
        }
        loadDataClients();
    }, [user, loading]);

    return (
        <main>
            <MainContainer>
                <MainHeader>
                    <MainTitleContainer>
                        <MainIconTitleContainer>
                            <FaUserFriends />
                        </MainIconTitleContainer>
                        <MainTitle>Clientes</MainTitle>
                    </MainTitleContainer>
                    <MainRegisterContainer>
                        <MainRegisterIconContainer>
                            <FaPlusCircle onClick={openRegisterModal} />
                        </MainRegisterIconContainer>
                        <MainRegisterTitle>Adicionar</MainRegisterTitle>
                        <MainRegisterIconContainer>
                            <FaWpforms onClick={openRequestModal} />
                        </MainRegisterIconContainer>
                        <MainRegisterTitle>Solicitações</MainRegisterTitle>
                    </MainRegisterContainer>
                    <Modal
                        isOpen={modalRegisterIsOpen}
                        onRequestClose={closeRegisterModal}
                        style={modalStyles}
                    >
                        <StyledFormArea>
                            <StyledTitle color={colors.theme} size={30}>Cadastro de Cliente</StyledTitle>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    cpf: '',
                                    rg: '',
                                    dateBirth: new Date(),
                                    phone: '',
                                    address: '',
                                }}
                                validationSchema={
                                    Yup.object({
                                        name: Yup.string().required("Obrigatório"),
                                        email: Yup.string().email('Email inválido').required("Obrigatório"),
                                        cpf: Yup.string().required("Obrigatório").test((value) => cpf.isValid(value)),
                                        rg: Yup.number().required("Obrigatório"),
                                        dateBirth: Yup.date(),
                                        phone: Yup.string().matches(phoneRegExp, 'Numero de telefone inválido')
                                            .min(11, 'Telefone curto').max(11, 'Telefone Longo').required("Obrigatório"),
                                        address: Yup.string(),
                                    })
                                }
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    await registerClient(values, user, { closeRegisterModal, setLoading, setFieldError, setSubmitting });
                                }}
                            >
                                {
                                    ({ isSubmitting }) => (
                                        <Form>
                                            <TextInput
                                                name='name'
                                                type='text'
                                                label='Nome'
                                                placeholder='Digite o nome do cliente'
                                                icon={<FaUser />}
                                                width={350}
                                            />
                                            <TextInput
                                                name='email'
                                                type='text'
                                                label='Email'
                                                placeholder='Digite o email'
                                                icon={<FaMailBulk />}
                                            />
                                            <TextInput
                                                name='cpf'
                                                type='text'
                                                label='CPF'
                                                placeholder='Digite o cpf'
                                                icon={<FaRegAddressBook />}
                                            />
                                            <TextInput
                                                name='rg'
                                                type='text'
                                                label='RG'
                                                placeholder='Digite o rg'
                                                icon={<FaRegNewspaper />}
                                            />
                                            <TextInput
                                                name="phone"
                                                type="text"
                                                label="Telefone"
                                                placeholder="Digite o telefone"
                                                icon={<FaPhone />}
                                                width={350}
                                            />
                                            <TextInput
                                                name="address"
                                                type="text"
                                                label="Endereço"
                                                placeholder="Digite o endereço"
                                                icon={<FaGlobe />}
                                                width={350}
                                            />
                                            <ButtonGroup>
                                                {!isSubmitting && (
                                                    <StyledFormButton type='submit'>
                                                        Registrar
                                                    </StyledFormButton>
                                                )}
                                                {isSubmitting && (
                                                    <ThreeDots
                                                        color={colors.theme}
                                                        height={49}
                                                        width={100}
                                                    />
                                                )}
                                            </ButtonGroup>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </StyledFormArea>
                    </Modal>
                    <Modal
                        isOpen={modalRequestIsOpen}
                        onRequestClose={closeRequestModal}
                        style={modalStyles}
                    >

                    </Modal>
                </MainHeader>
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={colors.dark3}
                                height={80}
                                width={300}
                            />
                        </LoadingContainer>
                    ) : (
                        <ClientList clients={clients} navigate={navigate}/>
                    )
                }
            </MainContainer>
        </main>
    )
}

export default ClientsMain;