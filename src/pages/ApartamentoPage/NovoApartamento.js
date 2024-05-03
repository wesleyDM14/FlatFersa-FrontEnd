import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    FormTextInput,
    HeaderApartamentoContainer,
    HeaderTitle,
    Limitador,
    MainApartamentoContainer,
    RadioContainer,
    RadioItemContainer,
    RadioLabel,
    StyledFormArea,
    SubItensContainer,
    SubmitButton
} from "./ApartamentoPage.styles";
import { FaFileInvoice } from "react-icons/fa";
import { PredioSelect } from "../../components/FormLib";

const NovoApartamento = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);
    const [selectedPredio, setSelectedPredio] = useState({});

    useEffect(() => {
        function loadData() {
            /*let temp = [{ nome: 'FlatFersa', id: 'adsadsadasdas' }];
            setPredios(temp);*/
        }
        loadData();
    }, []);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} apartamentoActive={true} />
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
                            }}
                            validationSchema={
                                Yup.object({

                                })
                            }
                            onSubmit={(values, { setSubmitting, setFieldError }) => {

                            }}
                        >
                            {
                                ({ isSubmitting }) => (
                                    <Form>
                                        <FormContent>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Nº Conta Contrato</FormInputLabelRequired>
                                                    <FormTextInput type="text" name="numeroContrato" placeholder="Conta contrato da COSERN" />
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
                                                            <FormTextInput type="number" min="0" step="1" name="numero" placeholder="Número do Apartamento" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormTextInput type="number" min="0.00" step="0.01" name="valorBase" placeholder="Valor do Aluguel" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>
                                        </FormContent>
                                        <ButtonGroup>
                                            <BackButton onClick={() => navigate('/apartamentos')}>Voltar</BackButton>
                                            <SubmitButton>Salvar</SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )
                            }
                        </Formik>
                    </StyledFormArea>
                </ContentApartamentoContainer>
            </MainApartamentoContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

export default NovoApartamento;