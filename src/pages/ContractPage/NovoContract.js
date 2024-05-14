import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Modal from "react-modal";
//import { useMask } from "@react-input/mask";
import * as Yup from 'yup';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { logoutUser } from "../../services/userService";

import {
    AlertButton,
    AlertContainer,
    AlertText,
    BackButton,
    ButtonGroup,
    ContentContratoContainer,
    ContentContratoHeader,
    ContentIconContainer,
    ContratoCounter,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabelRequired,
    HeaderContratoContainer,
    HeaderTitle,
    Limitador,
    LoadingContainer,
    MainContratoContainer,
    SelectedAptTitle,
    SelectedAptTitleContainer,
    StyledFormArea,
    SubItensContainer,
    SubmitButton,
} from "./ContractPage.styles";
import { FaFileInvoice } from "react-icons/fa";
import { ClientSelect, FormInput, StyledDatePicker, StyledSelect } from "../../components/FormLib";
import { ThreeDots } from "react-loader-spinner";
import { getApartamentos } from "../../services/apartamentoService";
import { getClientes } from "../../services/clientService";
import { createContrato } from "../../services/contratoService";
import LayoutPlanta from "../ApartamentoPage/LayoutPlanta";
import { modalStyles } from "../../styles/ModalStyles";

const NovoContract = ({ user }) => {
    Modal.setAppElement(document.getElementById('root'));
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const [apartamentos, setApatamentos] = useState([]);
    const [selectedApartamento, setSelectedApartamento] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [modalAlertIsOpen, setModalAlertIsOpen] = useState(false);

    const [periocidade, setPeriocidade] = useState([
        { label: 'Anualmente', value: 'anualmente' },
        { label: 'Semestralmente', value: 'semestralmente' },
    ]);
    const [selectedPeriocidade, setSelectedPeriocidade] = useState({});

    const [selectedDate, setSelectedDate] = useState(new Date());

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const openAlertModal = () => {
        setModalAlertIsOpen(true);
    }

    const closeAlertModal = () => {
        setModalAlertIsOpen(false);
        setSelectedApartamento({});
    }

    useEffect(() => {
        async function loadData() {
            if (loading) {
                user.accessToken && await getApartamentos(user, setApatamentos, setLoading);
            }
            if (user.isAdmin && loading2) {
                user.accessToken && await getClientes(user, setClientes, setLoading2);
            }
        }
        loadData();
    }, [loading, user, loading2]);

    useEffect(() => {
        function verifyApartment() {
            if (selectedApartamento.status) {
                if (selectedApartamento.status === 'OCUPADO') {
                    setModalAlertIsOpen(true);
                } else {
                    window.alert(`Apartamento ${selectedApartamento.numero} selecionado.`);
                }
            }
        }
        verifyApartment();
    }, [selectedApartamento]);

    return (
        user.isAdmin ? (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
                {
                    loading || loading2 ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <MainContratoContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Adicionar Novo Contrato</HeaderTitle>
                            </HeaderContratoContainer >
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    <ContentIconContainer>
                                        <FaFileInvoice />
                                        <ContratoCounter>Dados do Contrato</ContratoCounter>
                                    </ContentIconContainer>
                                </ContentContratoHeader>
                                <StyledFormArea>
                                    <Formik
                                        initialValues={{
                                            dataInicio: new Date(),
                                            duracaoContrato: '',
                                            diaVencimentoAluguel: '',
                                            valorAluguel: '',
                                            limiteKwh: '',
                                            aptId: '',
                                            clienteId: '',
                                            periocidade: '',
                                        }}
                                        validationSchema={
                                            Yup.object({
                                                duracaoContrato: Yup.number().required('Obrigatório'),
                                                diaVencimentoAluguel: Yup.number().required('Obrigatório'),
                                                valorAluguel: Yup.number().required('Obrigatório'),
                                                limiteKwh: Yup.number().required('Obrigatório'),
                                            })
                                        }
                                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                            values.dataInicio = selectedDate;
                                            values.periocidade = selectedPeriocidade.value;
                                            values.clienteId = selectedClient.value;
                                            values.aptId = selectedApartamento.value;
                                            console.log(values);
                                            await createContrato(values, user, navigate, setSubmitting, setFieldError);
                                        }}
                                    >
                                        {
                                            ({ isSubmitting }) => (
                                                <Form>
                                                    <FormContent>
                                                        <FormColum>
                                                            <FormInputArea>
                                                                <ClientSelect clientes={clientes} setSelectedClient={setSelectedClient} />
                                                            </FormInputArea>
                                                            <SubItensContainer>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Data Início</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <StyledDatePicker
                                                                            selectedDate={selectedDate}
                                                                            setSelectedDate={setSelectedDate}
                                                                        />
                                                                    </Limitador>
                                                                </FormInputArea>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Duração (meses)</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <FormInput
                                                                            type="number"
                                                                            min="0"
                                                                            step="1"
                                                                            name="duracaoContrato"
                                                                            placeholder="Duração do Contrato"
                                                                        />
                                                                    </Limitador>
                                                                </FormInputArea>
                                                            </SubItensContainer>
                                                        </FormColum>
                                                        <FormColum>
                                                            <SubItensContainer>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Dia de Vencimento</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <FormInput
                                                                            type="number"
                                                                            min="1"
                                                                            max='31'
                                                                            step="1"
                                                                            name="diaVencimentoAluguel"
                                                                            placeholder="Dia de Vencimento"
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
                                                                    <StyledSelect options={periocidade} setSelectedOption={setSelectedPeriocidade} label='Periocidade de Reajuste' />
                                                                </FormInputArea>
                                                            </SubItensContainer>
                                                        </FormColum>
                                                    </FormContent>
                                                    <SelectedAptTitleContainer>
                                                        <SelectedAptTitle>Selecionar Apartamento Desejado</SelectedAptTitle>
                                                    </SelectedAptTitleContainer>
                                                    <LayoutPlanta apartamentos={apartamentos} setSelectedApartamento={setSelectedApartamento} />
                                                    <ButtonGroup>
                                                        <BackButton onClick={() => navigate('/contratos')}>Voltar</BackButton>
                                                        {!isSubmitting && (
                                                            <SubmitButton type="submit">Salvar</SubmitButton>
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
                            </ContentContratoContainer>
                        </MainContratoContainer >
                    )
                }
                <Modal
                    isOpen={modalAlertIsOpen}
                    onRequestClose={closeAlertModal}
                    style={modalStyles}
                >
                    <AlertContainer>
                        <AlertText>Apartamento Ocupado</AlertText>
                        <AlertButton onClick={() => {
                            closeAlertModal();
                            setSelectedApartamento({});
                        }}>Fechar</AlertButton>
                    </AlertContainer>
                </Modal>
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div >
        ) : (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <MainContratoContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Nova Solicitaçãode Contrato</HeaderTitle>
                            </HeaderContratoContainer >
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    <ContentIconContainer>
                                        <FaFileInvoice />
                                        <ContratoCounter>Dados da Solicitação</ContratoCounter>
                                    </ContentIconContainer>
                                </ContentContratoHeader>
                                <StyledFormArea>
                                    <Formik
                                        initialValues={{
                                            dataInicio: new Date(),
                                            duracaoContrato: '',
                                            diaVencimentoAluguel: '',
                                            aptId: '',
                                        }}
                                        validationSchema={
                                            Yup.object({
                                                duracaoContrato: Yup.number().required('Obrigatório').min(6, 'Mínimo de 6 meses'),
                                                diaVencimentoAluguel: Yup.number().required('Obrigatório').min(1, 'Dia não pode ser menor que 1').max(31, 'Dia não pode ser maior que 31'),
                                            })
                                        }
                                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                            values.dataInicio = selectedDate;
                                            values.aptId = selectedApartamento.value;
                                            console.log(values);
                                            //await createContrato(values, user, navigate, setSubmitting, setFieldError);
                                        }}
                                    >
                                        {
                                            ({ isSubmitting }) => (
                                                <Form>
                                                    <FormContent>
                                                        <FormColum>
                                                            <SubItensContainer>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Data Início</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <StyledDatePicker
                                                                            selectedDate={selectedDate}
                                                                            setSelectedDate={setSelectedDate}
                                                                        />
                                                                    </Limitador>
                                                                </FormInputArea>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Duração (meses)</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <FormInput
                                                                            type="number"
                                                                            min="0"
                                                                            step="1"
                                                                            name="duracaoContrato"
                                                                            placeholder="Duração do Contrato"
                                                                        />
                                                                    </Limitador>
                                                                </FormInputArea>
                                                            </SubItensContainer>
                                                        </FormColum>
                                                        <FormColum>
                                                            <SubItensContainer>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Dia de Vencimento</FormInputLabelRequired>
                                                                    <Limitador>
                                                                        <FormInput
                                                                            type="number"
                                                                            min="1"
                                                                            max='31'
                                                                            step="1"
                                                                            name="diaVencimentoAluguel"
                                                                            placeholder="Dia de Vencimento"
                                                                        />
                                                                    </Limitador>
                                                                </FormInputArea>
                                                            </SubItensContainer>
                                                        </FormColum>
                                                    </FormContent>
                                                    <SelectedAptTitleContainer>
                                                        <SelectedAptTitle>Selecionar Apartamento Desejado</SelectedAptTitle>
                                                    </SelectedAptTitleContainer>
                                                    <LayoutPlanta apartamentos={apartamentos} setSelectedApartamento={setSelectedApartamento} />
                                                    <ButtonGroup>
                                                        <BackButton onClick={() => navigate('/contratos')}>Voltar</BackButton>
                                                        {!isSubmitting && (
                                                            <SubmitButton type="submit">Salvar</SubmitButton>
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
                            </ContentContratoContainer>
                        </MainContratoContainer >
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
                <Modal
                    isOpen={modalAlertIsOpen}
                    onRequestClose={closeAlertModal}
                    style={modalStyles}
                >
                    <AlertContainer>
                        <AlertText>Apartamento Ocupado</AlertText>
                        <AlertButton onClick={() => {
                            closeAlertModal();
                            setSelectedApartamento({});
                        }}>Fechar</AlertButton>
                    </AlertContainer>
                </Modal>
            </div >
        )
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoContract);