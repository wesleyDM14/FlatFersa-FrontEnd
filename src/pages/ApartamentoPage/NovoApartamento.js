import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { logoutUser } from '../../services/userService';
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
import { FaFileInvoice } from "react-icons/fa";
import { FormInput, PredioSelect } from "../../components/FormLib";
import { getPredios } from "../../services/predioService";
import { ThreeDots } from "react-loader-spinner";
import { createApartamento } from "../../services/apartamentoService";

const NovoApartamento = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);
    const [selectedPredio, setSelectedPredio] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (loading) {
                await getPredios(user, setPredios, setLoading);
            }
        }
        loadData();
    }, [loading, user]);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} apartamentoActive={true} />
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
                    <MainApartamentoContainer>
                        <HeaderApartamentoContainer>
                            <HeaderTitle>Adicionar Novo Apartamento</HeaderTitle>
                        </HeaderApartamentoContainer>
                        <ContentApartamentoContainer>
                            <ContentApartamentoHeader>
                                <ContentIconContainer>
                                    <FaFileInvoice />
                                </ContentIconContainer>
                                <ApartamentoCounter>Dados do Apartamento</ApartamentoCounter>
                            </ContentApartamentoHeader>
                            <StyledFormArea>
                                <Formik
                                    initialValues={{
                                        numeroContrato: '',
                                        numero: '',
                                        valorBase: '',
                                        climatizado: false,
                                        predioId: '',
                                    }}
                                    validationSchema={
                                        Yup.object({

                                        })
                                    }
                                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                        values.predioId = selectedPredio.value;
                                        console.log(values);
                                        await createApartamento(values, user, navigate, setSubmitting, setFieldError);
                                    }}
                                >
                                    {
                                        ({ isSubmitting }) => (
                                            <Form>
                                                <FormContent>
                                                    <FormColum>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Nº Conta Contrato</FormInputLabelRequired>
                                                            <FormInput
                                                                type="text"
                                                                name="numeroContrato"
                                                                placeholder="Conta contrato da COSERN"
                                                            />
                                                        </FormInputArea>
                                                        <SubItensContainer>
                                                            <RadioContainer>
                                                                <RadioItemContainer>
                                                                    <RadioLabel>Climatizado?</RadioLabel>
                                                                    <Field
                                                                        name='climatizado'
                                                                        type='checkbox'
                                                                    />
                                                                </RadioItemContainer>
                                                            </RadioContainer>
                                                        </SubItensContainer>
                                                    </FormColum>
                                                    <FormColum>
                                                        <FormInputArea>
                                                            <PredioSelect predios={predios} setSelectedPredio={setSelectedPredio} />
                                                        </FormInputArea>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Nº do Apartamento</FormInputLabelRequired>
                                                                <Limitador>
                                                                    <FormInput
                                                                        type="number"
                                                                        min="0"
                                                                        step="1"
                                                                        name="numero"
                                                                        placeholder="Número do Apartamento"
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
                                                                        name="valorBase"
                                                                        placeholder="Valor do Aluguel"
                                                                    />
                                                                </Limitador>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </FormColum>
                                                </FormContent>
                                                <ButtonGroup>
                                                    <BackButton onClick={() => navigate('/apartamentos')}>Voltar</BackButton>
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
                        </ContentApartamentoContainer>
                    </MainApartamentoContainer>
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoApartamento);