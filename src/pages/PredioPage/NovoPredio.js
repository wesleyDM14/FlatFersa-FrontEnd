import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
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
    ButtonGroup,
    BackButton,
    SubmitButton,
    SubItensContainer,
    Limitador,
    LimitadorAlt,
} from './PredioPage.styles';
import { FaFileInvoice } from "react-icons/fa";
import { FormInput } from "../../components/FormLib";
import { createPredio } from "../../services/predioService";
import { ThreeDots } from "react-loader-spinner";

const NovoPredio = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        user.isAdmin && (
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
                                    bairro: '',
                                    numApt: 0,
                                    kwhPrice: 0,
                                }}
                                validationSchema={
                                    Yup.object({
                                        nome: Yup.string().required("Obrigatório"),
                                        endereco: Yup.string().required("Obrigatótio"),
                                        cidade: Yup.string().required("Obrigatório"),
                                        estado: Yup.string().required("Obrigatório").min(2).max(2, 'Apenas a Sigla do estado'),
                                        bairro: Yup.string().required('Obrigatório'),
                                        numApt: Yup.number().required('Obrigatório'),
                                        kwhPrice: Yup.number().required('Obrigatório'),
                                    })
                                }
                                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                    await createPredio(values, user, navigate, setSubmitting, setFieldError);
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
                                                            type="text"
                                                            name='nome'
                                                            placeholder="Nome Identificador do Prédio"
                                                        />
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                        <FormInput
                                                            type="text"
                                                            name='endereco'
                                                            placeholder="Endereço e Número"
                                                        />
                                                    </FormInputArea>
                                                </FormColum>
                                                <FormColum>
                                                    <SubItensContainer>
                                                        <FormInputArea>
                                                            <FormInputLabelRequired>Qnt Apartamentos</FormInputLabelRequired>
                                                            <Limitador>
                                                                <FormInput
                                                                    type="number"
                                                                    name='numApt'
                                                                    step='1'
                                                                    min='0'
                                                                />
                                                            </Limitador>
                                                        </FormInputArea>
                                                        <SubItensContainer>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>Estado</FormInputLabelRequired>
                                                                <LimitadorAlt>
                                                                    <FormInput
                                                                        type="text"
                                                                        name='estado'
                                                                        placeholder="Sigla"
                                                                    />
                                                                </LimitadorAlt>
                                                            </FormInputArea>
                                                            <FormInputArea>
                                                                <FormInputLabelRequired>kWh (R$)</FormInputLabelRequired>
                                                                <LimitadorAlt>
                                                                    <FormInput
                                                                        type="number"
                                                                        name='kwhPrice'
                                                                        step='0.01'
                                                                        min='0'
                                                                    />
                                                                </LimitadorAlt>
                                                            </FormInputArea>
                                                        </SubItensContainer>
                                                    </SubItensContainer>
                                                    <SubItensContainer>
                                                        <FormInputArea>
                                                            <Limitador>
                                                                <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                                <FormInput
                                                                    type="text"
                                                                    name='cidade'
                                                                    placeholder="Cidade"
                                                                />
                                                            </Limitador>
                                                        </FormInputArea>
                                                        <FormInputArea>
                                                            <Limitador>
                                                                <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                                <FormInput
                                                                    type="text"
                                                                    name='bairro'
                                                                    placeholder="Bairro"
                                                                />
                                                            </Limitador>
                                                        </FormInputArea>
                                                    </SubItensContainer>
                                                </FormColum>
                                            </FormContent>
                                            <ButtonGroup>
                                                <BackButton type='button' onClick={() => navigate('/predios')}>Voltar</BackButton>
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
                    </ContentPredioContainer>
                </MainPredioContainer>
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        )
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoPredio);