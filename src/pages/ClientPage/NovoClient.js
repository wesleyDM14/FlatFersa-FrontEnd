import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useMask } from "@react-input/mask";
import * as Yup from 'yup';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { logoutUser } from "../../services/userService";
import {
    BackButton,
    ButtonGroup,
    ClientCounter,
    ContentClientContainer,
    ContentClientHeader,
    ContentIconContainer,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    FormTextInput,
    HeaderClientContainer,
    HeaderTitle,
    Limitador,
    MainClientContainer,
    StyledFileArea,
    StyledFileIconContainer,
    StyledFileInput,
    StyledFileInputTitle,
    StyledFileLegend,
    StyledFormArea,
    SubItensContainer,
    SubmitButton,
} from "./ClientPage.styles";
import { FaCloudUploadAlt, FaFileInvoice } from "react-icons/fa";

const NovoClient = () => {
    const navigate = useNavigate();
    const phoneMask = useMask({ mask: '(__) _____-____', replacement: { _: /\d/ } });
    const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} clienteActive={true} />
            <MainClientContainer>
                <HeaderClientContainer>
                    <HeaderTitle>Adicionar Novo Cliente</HeaderTitle>
                </HeaderClientContainer>
                <ContentClientContainer>
                    <ContentClientHeader>
                        <ContentIconContainer>
                            <FaFileInvoice />
                        </ContentIconContainer>
                        <ClientCounter>Dados do Cliente</ClientCounter>
                    </ContentClientHeader>
                    <StyledFormArea>
                        <Formik
                            initialValues={{
                                nome: '',
                                cpf: '',
                                rg: '',
                                dateBirth: new Date(),
                                phone: '',
                                address: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    nome: Yup.string().required('Obrigatório'),
                                    phone: Yup.string().required('Obrigatório'),
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
                                                    <FormTextInput />
                                                </FormInputArea>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormTextInput ref={cpfMask} />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormTextInput />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabel>Documento de Identificação (Frente)</FormInputLabel>
                                                    <StyledFileArea>
                                                        <StyledFileIconContainer>
                                                            <FaCloudUploadAlt />
                                                        </StyledFileIconContainer>
                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                        <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                        <StyledFileInput type="file" />
                                                    </StyledFileArea>
                                                </FormInputArea>
                                            </FormColum>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                    <FormTextInput />
                                                </FormInputArea>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormTextInput type="date" />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormTextInput ref={phoneMask} />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabel>Documento de Identificação (Verso)</FormInputLabel>
                                                    <StyledFileArea>
                                                        <StyledFileIconContainer>
                                                            <FaCloudUploadAlt />
                                                        </StyledFileIconContainer>
                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                        <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                        <StyledFileInput type="file" />
                                                    </StyledFileArea>
                                                </FormInputArea>
                                            </FormColum>
                                        </FormContent>
                                        <ButtonGroup>
                                            <BackButton onClick={() => navigate('/clientes')}>Voltar</BackButton>
                                            <SubmitButton>Salvar</SubmitButton>
                                        </ButtonGroup>
                                    </Form>
                                )
                            }
                        </Formik>
                    </StyledFormArea>
                </ContentClientContainer>
            </MainClientContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    );
}

export default NovoClient;