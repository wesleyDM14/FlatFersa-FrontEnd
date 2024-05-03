import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { logoutUser } from '../../services/userService';

import {
    MainPredioContainer,
    HeaderPredioContainer,
    HeaderTitle,
    ContentPredioContainer,
    ContentPredioHeader,
    PredioCounter,
    ContentIconContainer,
    StyledFormArea,
    FormContent,
    FormColum,
    FormInputArea,
    FormInputLabelRequired,
    FormTextInput,
    ButtonGroup,
    BackButton,
    SubmitButton,
} from './PredioPage.styles';
import { FaFileInvoice } from "react-icons/fa";

const NovoPredio = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} predioActive={true} />
            <MainPredioContainer>
                <HeaderPredioContainer>
                    <HeaderTitle>Adicionar Novo Prédio</HeaderTitle>
                </HeaderPredioContainer>
                <ContentPredioContainer>
                    <ContentPredioHeader>
                        <ContentIconContainer>
                            <FaFileInvoice />
                        </ContentIconContainer>
                        <PredioCounter>Dados do Prédio</PredioCounter>
                    </ContentPredioHeader>
                    <StyledFormArea>
                        <Formik
                            initialValues={{
                                nome: '',
                                endereco: '',
                                cidade: '',
                                estado: '',
                                numApt: 0,
                            }}
                            validationSchema={
                                Yup.object({
                                    nome: Yup.string().required("Obrigatório"),
                                    endereco: Yup.string().required("Obrigatótio"),
                                    cidade: Yup.string().required("Obrigatório"),
                                    estado: Yup.string().required("Obrigatório").min(2).max(2, 'Apenas a Sigla do estado'),
                                    numApt: Yup.number()
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
                                                    <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                    <FormTextInput type="text" name="nome" placeholder="Nome Identificador do Prédio" />
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                    <FormTextInput type="text" name="endereco" placeholder="Endereço e Número" />
                                                </FormInputArea>
                                            </FormColum>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Estado</FormInputLabelRequired>
                                                    <FormTextInput type="text" name="estado" placeholder="Sigla do Estado" />
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                    <FormTextInput type="text" name="cidade" placeholder="Cidade" />
                                                </FormInputArea>
                                            </FormColum>
                                        </FormContent>
                                        <ButtonGroup>
                                            <BackButton onClick={() => navigate('/predios')}>Voltar</BackButton>
                                            <SubmitButton>Salvar</SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )
                            }
                        </Formik>
                    </StyledFormArea>
                </ContentPredioContainer>
            </MainPredioContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

export default NovoPredio;