import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { FaFileInvoice } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FormInput, PredioSelect } from "../../components/FormLib";

import { logoutUser } from '../../services/userService';
import { getTodosPredios } from "../../services/predioService";
import { createApartamento } from "../../services/apartamentoService";

import {
    ApartamentoCounter,
    BackButton,
    ButtonGroup,
    ContentApartamentoContainer,
    ContentApartamentoHeader,
    ContentIconContainer,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabelRequired,
    HeaderApartamentoContainer,
    HeaderTitle,
    Limitador,
    LoadingContainer,
    MainApartamentoContainer,
    RadioContainer,
    RadioItemContainer,
    RadioLabel,
    StyledFormArea,
    SubItensContainer,
    SubmitButton
} from "./ApartamentoPage.styles";

const NovoApartamento = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Se viemos da página de detalhes do prédio, já temos o ID
    const preSelectedPredioId = location.state?.predioId;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);
    const [selectedPredio, setSelectedPredio] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logoutUser(navigate);
    };

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const prediosData = await getTodosPredios();
                    setPredios(prediosData);
                } catch (error) {
                    console.error("Erro ao carregar dados", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    // Efeito para pré-selecionar o prédio se vier o ID
    useEffect(() => {
        if (preSelectedPredioId && predios.length > 0) {
            const found = predios.find(p => p.id === preSelectedPredioId);
            if (found) {
                // Formato que o React Select costuma usar {value, label} ou o objeto direto
                // Assumindo que PredioSelect lida com objeto ou value/label
                setSelectedPredio({ value: found.id, label: found.nome });
            }
        }
    }, [preSelectedPredioId, predios]);

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="container">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            />

            {loading ? (
                <LoadingContainer>
                    <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                </LoadingContainer>
            ) : (
                <MainApartamentoContainer>
                    <HeaderApartamentoContainer>
                        <HeaderTitle>Adicionar Novo Apartamento</HeaderTitle>
                    </HeaderApartamentoContainer>

                    <ContentApartamentoContainer>
                        <ContentApartamentoHeader>
                            <ContentIconContainer>
                                <FaFileInvoice />
                                <ApartamentoCounter>Dados do Apartamento</ApartamentoCounter>
                            </ContentIconContainer>
                        </ContentApartamentoHeader>

                        <StyledFormArea>
                            <Formik
                                initialValues={{
                                    numero: '',
                                    valorBase: '',
                                    climatizado: false,
                                    predioId: '',
                                }}
                                validationSchema={Yup.object({
                                    numero: Yup.number().required("Obrigatório"),
                                    valorBase: Yup.number().required("Obrigatório"),
                                })}
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    if (!selectedPredio) {
                                        alert("Selecione um prédio!");
                                        setSubmitting(false);
                                        return;
                                    }
                                    values.predioId = selectedPredio.value || selectedPredio.id; // Ajuste conforme seu componente Select
                                    await createApartamento(values, navigate, setSubmitting, setFieldError);
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
                                                        defaultValue={selectedPredio} // Passa valor inicial se houver
                                                    />
                                                </FormInputArea>

                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Nº do Apartamento</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput type="number" min="0" step="1" name="numero" placeholder="Ex: 101" />
                                                        </Limitador>
                                                    </FormInputArea>

                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput type="number" min="0.00" step="0.01" name="valorBase" placeholder="0.00" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>

                                            <FormColum>
                                                <SubItensContainer>
                                                    <RadioContainer>
                                                        <RadioItemContainer>
                                                            <RadioLabel>Climatizado?</RadioLabel>
                                                            <Field name='climatizado' type='checkbox' />
                                                        </RadioItemContainer>
                                                    </RadioContainer>
                                                </SubItensContainer>
                                            </FormColum>
                                        </FormContent>

                                        <ButtonGroup>
                                            <BackButton type='button' onClick={() => navigate('/apartamentos')}>Cancelar</BackButton>
                                            {!isSubmitting ? (
                                                <SubmitButton type="submit">Salvar</SubmitButton>
                                            ) : (
                                                <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                                            )}
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </StyledFormArea>
                    </ContentApartamentoContainer>
                </MainApartamentoContainer>
            )}

            <Navbar
                openSidebar={() => setSidebarOpen(true)}
                user={user}
                logout={handleLogout}
            />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoApartamento);