import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
//import { useMask } from "@react-input/mask";
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
import { FormInput, StyledDatePicker } from "../../components/FormLib";
import { createCliente } from "../../services/clientService";
import { ThreeDots } from "react-loader-spinner";

const NovoClient = ({ user }) => {
    const navigate = useNavigate();
    /*const phoneMask = useMask({ mask: '(__) _____-____', replacement: { _: /\d/ } });
    const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });*/
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

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
                                name: '',
                                cpf: '',
                                rg: '',
                                dateBirth: new Date(),
                                phone: '',
                                address: '',
                                email: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    name: Yup.string().required('Obrigatório'),
                                    phone: Yup.string().required('Obrigatório'),
                                    email: Yup.string().required('Obrigatório'),
                                })
                            }
                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                values.dateBirth = startDate;
                                console.log(values);
                                await createCliente(values, user, navigate, setSubmitting, setFieldError);
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
                                                        type='text'
                                                        name='name'
                                                        placeholder='Nome do cliente'
                                                    />
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Email</FormInputLabelRequired>
                                                    <FormInput
                                                        type='text'
                                                        name='email'
                                                        placeholder='Email do cliente'
                                                    />
                                                </FormInputArea>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput
                                                                name='cpf'
                                                                type='text'
                                                                placeholder='CPF do cliente'
                                                            />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput
                                                                name='rg'
                                                                type='text'
                                                                placeholder='RG do cliente'
                                                            />
                                                        </Limitador>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                    <FormInput
                                                        type='text'
                                                        name='address'
                                                        placeholder='Endereço do cliente'
                                                    />
                                                </FormInputArea>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                                        <Limitador>
                                                            <StyledDatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                                        <Limitador>
                                                            <FormInput
                                                                name='phone'
                                                                type='text'
                                                                placeholder='Telefone'
                                                            />
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
                </ContentClientContainer>
            </MainClientContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoClient);