import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as Yup from 'yup';
import { FaFileInvoice } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import LayoutPlanta from "../ApartamentoPage/LayoutPlanta";
import { ApartamentoSelect, ClientSelect, FormInput, PredioSelect, StyledDatePicker, StyledSelect } from "../../components/FormLib";

// Serviços (Atualizados para V2)
import { logoutUser } from "../../services/userService";
import { getPredios } from "../../services/predioService";
import { getClientesForContract } from "../../services/clientService"; // Agora existe!
import { getApartamentosByPredioId } from "../../services/apartamentoService";
import { createContrato } from "../../services/contratoService";

import { modalStyles } from "../../styles/ModalStyles";
import {
    AlertButton, AlertContainer, AlertText, BackButton, ButtonGroup,
    ContentContratoContainer, ContentContratoHeader, ContentIconContainer,
    ContratoCounter, FormColum, FormContent, FormInputArea, FormInputLabelRequired,
    HeaderContratoContainer, HeaderTitle, Limitador, LoadingContainer,
    MainContratoContainer, SelectedAptTitle, SelectedAptTitleContainer,
    StyledFormArea, SubItensContainer, SubmitButton
} from "./ContractPage.styles";

const NovoContract = ({ user }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();

    // Estados
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true); // Loading específico para clientes

    // Dados para selects
    const [predios, setPredios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [apartamentos, setApartamentos] = useState([]);

    // Selecionados
    const [selectedPredio, setSelectedPredio] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedApartamento, setSelectedApartamento] = useState({});

    // Auxiliares
    const [loadingApartamentos, setLoadingApartamentos] = useState(false);
    const [modalAlertIsOpen, setModalAlertIsOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPeriocidade, setSelectedPeriocidade] = useState({});

    const periocidade = [
        { label: 'Anualmente', value: 'ANUALMENTE' },
        { label: 'Semestralmente', value: 'SEMESTRALMENTE' },
    ];

    const handleLogout = () => logoutUser(navigate);

    // Carregar Prédios e Clientes iniciais
    useEffect(() => {
        const fetchData = async () => {
            if (user && user.accessToken) {
                setLoading(true);
                try {
                    // Busca Prédios
                    await getPredios(setPredios);

                    // Busca Clientes (Só se for Admin)
                    if (user.isAdmin) {
                        // V2: Não passa user, e passa setLoading2 para controle fino
                        await getClientesForContract(setClientes, setLoading2);
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    // Carregar Apartamentos quando prédio muda
    useEffect(() => {
        if (selectedPredio?.value) {
            setLoadingApartamentos(true);
            // V2: Não passa user
            getApartamentosByPredioId(selectedPredio.value, setApartamentos)
                .finally(() => setLoadingApartamentos(false));
        }
    }, [selectedPredio]);

    // Alerta de Ocupado
    useEffect(() => {
        if (selectedApartamento?.status === 'OCUPADO') {
            setModalAlertIsOpen(true);
        }
    }, [selectedApartamento]);

    if (!user) return null;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading ? (
                <LoadingContainer><ThreeDots color={'#4e4e4e'} /></LoadingContainer>
            ) : (
                <MainContratoContainer>
                    <HeaderContratoContainer>
                        <HeaderTitle>{user.isAdmin ? 'Adicionar Novo Contrato' : 'Solicitar Contrato'}</HeaderTitle>
                    </HeaderContratoContainer>

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
                                    duracaoContrato: '',
                                    diaVencimentoAluguel: '',
                                    valorAluguel: '',
                                    limiteKwh: '',
                                    leituraInicial: '',
                                    // Campos ocultos
                                    dataInicio: new Date(),
                                    aptId: '',
                                    clienteId: '',
                                    periocidade: ''
                                }}
                                validationSchema={Yup.object({
                                    duracaoContrato: Yup.number().required('Obrigatório'),
                                    diaVencimentoAluguel: Yup.number().required('Obrigatório').max(31),
                                    // Se for Admin, valor é obrigatório
                                    valorAluguel: user.isAdmin ? Yup.number().required('Obrigatório') : Yup.number(),
                                })}
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    if (!selectedApartamento.id) {
                                        alert("Selecione um apartamento");
                                        setSubmitting(false);
                                        return;
                                    }

                                    values.dataInicio = selectedDate;
                                    values.aptId = selectedApartamento.id;

                                    if (user.isAdmin) {
                                        if (!selectedClient?.value) {
                                            alert("Selecione um cliente");
                                            setSubmitting(false);
                                            return;
                                        }
                                        values.clienteId = selectedClient.value;
                                        values.periocidade = selectedPeriocidade.value;
                                        values.leituraAtual = values.leituraInicial;
                                    }

                                    // V2: Não passa user
                                    await createContrato(values, user.isAdmin, navigate, setSubmitting, setFieldError);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <FormContent>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Prédio</FormInputLabelRequired>
                                                    <PredioSelect
                                                        predios={predios}
                                                        setSelectedPredio={setSelectedPredio}
                                                    />
                                                </FormInputArea>

                                                {/* Seleção de Cliente (Só Admin) */}
                                                {user.isAdmin && (
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Cliente</FormInputLabelRequired>
                                                        {loading2 ? <ThreeDots height={20} width={40} color="#999" /> : (
                                                            <ClientSelect
                                                                clientes={clientes}
                                                                setSelectedClient={setSelectedClient}
                                                            />
                                                        )}
                                                    </FormInputArea>
                                                )}

                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Data Início</FormInputLabelRequired>
                                                        <Limitador>
                                                            <StyledDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Duração (meses)</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput type="number" name="duracaoContrato" placeholder="Ex: 12" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>

                                            <FormColum>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Dia Vencimento</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput type="number" name="diaVencimentoAluguel" max="31" />
                                                        </Limitador>
                                                    </FormInputArea>

                                                    {user.isAdmin && (
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput type="number" step="0.01" name="valorAluguel" />
                                                            </Limitador>
                                                        </FormInputArea>
                                                    )}
                                                </SubItensContainer>

                                                {user.isAdmin && (
                                                    <SubItensContainer>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Limite KWh</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput type="number" name="limiteKwh" />
                                                            </Limitador>
                                                        </FormInputArea>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Reajuste</FormInputLabelRequired>
                                                            <StyledSelect options={periocidade} setSelectedOption={setSelectedPeriocidade} label='Periocidade' />
                                                        </FormInputArea>
                                                    </SubItensContainer>
                                                )}

                                                {user.isAdmin && (
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Leitura Inicial (KWh)</FormInputLabelRequired>
                                                        <FormInput type="number" name="leituraInicial" />
                                                    </FormInputArea>
                                                )}
                                            </FormColum>
                                        </FormContent>

                                        {/* SELEÇÃO DE APARTAMENTO (Lógica FlatFersa vs Lista) */}
                                        {selectedPredio && (
                                            loadingApartamentos ? (
                                                <LoadingContainer><ThreeDots color='#4e4e4e' /></LoadingContainer>
                                            ) : (
                                                selectedPredio.label.toLowerCase().includes('fersa') ? (
                                                    // Layout Visual para Flat Fersa
                                                    <>
                                                        <SelectedAptTitleContainer>
                                                            <SelectedAptTitle>
                                                                {selectedApartamento.id
                                                                    ? `Selecionado: Apt ${selectedApartamento.numero}`
                                                                    : "Selecione o Apartamento na Planta Abaixo"}
                                                            </SelectedAptTitle>
                                                        </SelectedAptTitleContainer>
                                                        <LayoutPlanta
                                                            apartamentos={apartamentos}
                                                            setSelectedApartamento={setSelectedApartamento}
                                                        />
                                                    </>
                                                ) : (
                                                    // Dropdown Padrão para outros prédios
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Apartamento</FormInputLabelRequired>
                                                        <ApartamentoSelect
                                                            apartamentos={apartamentos}
                                                            setSelectedApartamento={setSelectedApartamento}
                                                        />
                                                    </FormInputArea>
                                                )
                                            )
                                        )}

                                        <ButtonGroup>
                                            <BackButton type='button' onClick={() => navigate('/contratos')}>Cancelar</BackButton>
                                            {!isSubmitting ? (
                                                <SubmitButton type="submit">Salvar Contrato</SubmitButton>
                                            ) : <ThreeDots height={40} />}
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </StyledFormArea>
                    </ContentContratoContainer>
                </MainContratoContainer>
            )}

            {/* Modal de Alerta de Ocupado */}
            <Modal isOpen={modalAlertIsOpen} onRequestClose={() => setModalAlertIsOpen(false)} style={modalStyles}>
                <AlertContainer>
                    <AlertText>Este apartamento já está ocupado!</AlertText>
                    <AlertButton onClick={() => {
                        setModalAlertIsOpen(false);
                        setSelectedApartamento({});
                    }}>Entendi</AlertButton>
                </AlertContainer>
            </Modal>

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(NovoContract);