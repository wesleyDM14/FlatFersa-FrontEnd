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
import { ApartamentoSelect, ClientSelect, FormInput, PredioSelect, StyledDatePicker } from "../../components/FormLib";

import { logoutUser } from "../../services/userService";
import { getTodosPredios } from "../../services/predioService";
import { getClientesForContract } from "../../services/clientService";
import { getApartamentosByPredioId } from "../../services/apartamentoService";
import { criarContratoDireto, solicitarContrato } from "../../services/contratoService";

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

    const isAdmin = user?.role === 'ADMIN';

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingClientes, setLoadingClientes] = useState(true);

    const [predios, setPredios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [apartamentos, setApartamentos] = useState([]);

    const [selectedPredio, setSelectedPredio] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedApartamento, setSelectedApartamento] = useState({});

    const [loadingApartamentos, setLoadingApartamentos] = useState(false);
    const [modalAlertIsOpen, setModalAlertIsOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleLogout = () => logoutUser(navigate);

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
                setLoading(true);
                try {
                    const prediosData = await getTodosPredios();
                    setPredios(prediosData);
                    if (isAdmin) {
                        await getClientesForContract(setClientes, setLoadingClientes);
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (selectedPredio?.value) {
            setLoadingApartamentos(true);
            getApartamentosByPredioId(selectedPredio.value, setApartamentos)
                .finally(() => setLoadingApartamentos(false));
        }
    }, [selectedPredio]);

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
                        <HeaderTitle>{isAdmin ? 'Adicionar Novo Contrato' : 'Solicitar Contrato'}</HeaderTitle>
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
                                    duracaoMeses: '',
                                    diaVencimento: '',
                                    valorAluguel: '',
                                    limiteKwhIsento: '',
                                    leituraInicial: '',
                                }}
                                validationSchema={Yup.object({
                                    duracaoMeses: Yup.number().min(6, 'Mínimo de 6 meses').required('Obrigatório'),
                                    diaVencimento: Yup.number().required('Obrigatório').max(31),
                                    valorAluguel: isAdmin ? Yup.number().required('Obrigatório') : Yup.number(),
                                    leituraInicial: isAdmin ? Yup.number().required('Obrigatório') : Yup.number(),
                                })}
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    if (!selectedApartamento.id) {
                                        alert("Selecione um apartamento");
                                        setSubmitting(false);
                                        return;
                                    }

                                    try {
                                        if (isAdmin) {
                                            if (!selectedClient?.value) {
                                                alert("Selecione um cliente");
                                                setSubmitting(false);
                                                return;
                                            }

                                            await criarContratoDireto({
                                                clienteId: selectedClient.value,
                                                apartamentoId: selectedApartamento.id,
                                                dataInicio: selectedDate,
                                                duracaoMeses: values.duracaoMeses,
                                                diaVencimento: values.diaVencimento,
                                                valorAluguel: values.valorAluguel,
                                                leituraInicial: values.leituraInicial,
                                                limiteKwhIsento: values.limiteKwhIsento || 0
                                            });
                                        } else {
                                            await solicitarContrato({
                                                aptId: selectedApartamento.id,
                                                dataInicio: selectedDate,
                                                duracaoMeses: values.duracaoMeses,
                                                diaVencimentoAluguel: values.diaVencimento
                                            });
                                        }

                                        alert("Contrato criado com sucesso!");
                                        navigate('/contratos');
                                    } catch (err) {
                                        const msg = err.response?.data?.message || "Erro ao salvar contrato";
                                        setFieldError('valorAluguel', msg);
                                        alert(msg);
                                    } finally {
                                        setSubmitting(false);
                                    }
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

                                                {isAdmin && (
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Cliente</FormInputLabelRequired>
                                                        {loadingClientes ? <ThreeDots height={20} width={40} color="#999" /> : (
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
                                                            <FormInput type="number" name="duracaoMeses" placeholder="Mín. 6" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>

                                            <FormColum>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Dia Vencimento</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput type="number" name="diaVencimento" max="31" />
                                                        </Limitador>
                                                    </FormInputArea>

                                                    {isAdmin && (
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput type="number" step="0.01" name="valorAluguel" />
                                                            </Limitador>
                                                        </FormInputArea>
                                                    )}
                                                </SubItensContainer>

                                                {isAdmin && (
                                                    <SubItensContainer>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Limite kWh Isento</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput type="number" name="limiteKwhIsento" />
                                                            </Limitador>
                                                        </FormInputArea>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Leitura Inicial (kWh)</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput type="number" name="leituraInicial" />
                                                            </Limitador>
                                                        </FormInputArea>
                                                    </SubItensContainer>
                                                )}
                                            </FormColum>
                                        </FormContent>

                                        {selectedPredio && (
                                            loadingApartamentos ? (
                                                <LoadingContainer><ThreeDots color='#4e4e4e' /></LoadingContainer>
                                            ) : (
                                                selectedPredio.label.toLowerCase().includes('fersa') ? (
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
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Apartamento</FormInputLabelRequired>
                                                        <ApartamentoSelect
                                                            apartamentos={apartamentos}
                                                            setSelectedApartamento={(option) => {
                                                                const apto = apartamentos.find(a => a.id === option?.value);
                                                                setSelectedApartamento(apto || {});
                                                            }}
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
