import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { FaCloudUploadAlt, FaFileInvoice } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FormInput, MaskedInput, StyledDatePicker } from "../../components/FormLib";

import { logoutUser } from "../../services/userService";
import { createCliente } from "../../services/clientService";

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
    HeaderClientContainer,
    HeaderTitle,
    Image,
    Limitador,
    MainClientContainer,
    StyledFileArea,
    StyledFileIconContainer,
    StyledFileInput,
    StyledFileInputTitle,
    StyledFormArea,
    SubItensContainer,
    SubmitButton,
} from "./ClientPage.styles";

const NovoClient = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedBackImage, setSelectedBackImage] = useState();
    const [selectedFrontImage, setSelectedFrontImage] = useState();

    const handleLogout = () => logoutUser(navigate);

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            <MainClientContainer>
                <HeaderClientContainer>
                    <HeaderTitle>Adicionar Novo Cliente</HeaderTitle>
                </HeaderClientContainer>

                <ContentClientContainer>
                    <ContentClientHeader>
                        <ContentIconContainer>
                            <FaFileInvoice />
                            <ClientCounter>Dados do Cliente</ClientCounter>
                        </ContentIconContainer>
                    </ContentClientHeader>

                    <StyledFormArea>
                        <Formik
                            initialValues={{
                                name: '', cpf: '', rg: '', phone: '', address: '', email: '',
                                documentFront: null, documentBack: null
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Nome é obrigatório'),
                                email: Yup.string().email('Email inválido').required('Email é obrigatório'),
                                cpf: Yup.string().required('CPF é obrigatório'),
                                phone: Yup.string().required('Telefone é obrigatório'),
                                address: Yup.string().required('Endereço é obrigatório'),
                            })}
                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                values.dateBirth = startDate;
                                await createCliente(values, navigate, setSubmitting, setFieldError);
                            }}
                        >
                            {({ isSubmitting, setFieldValue, values }) => (
                                <Form>
                                    <FormContent>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nome Completo</FormInputLabelRequired>
                                                <FormInput type='text' name='name' placeholder='Ex: João da Silva' />
                                            </FormInputArea>

                                            <FormInputArea>
                                                <FormInputLabelRequired>Email (Login)</FormInputLabelRequired>
                                                <FormInput type='email' name='email' placeholder='email@exemplo.com' />
                                            </FormInputArea>

                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                                    <Limitador>
                                                        <MaskedInput mask='999.999.999-99' name='cpf' type='text' placeholder='000.000.000-00' />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>RG</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput name='rg' type='text' placeholder='RG' />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>

                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Senha Provisória</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput name='password' type='password' placeholder='******' />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>

                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Endereço Completo</FormInputLabelRequired>
                                                <FormInput type='text' name='address' placeholder='Rua, Número, Bairro' />
                                            </FormInputArea>

                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Nascimento</FormInputLabelRequired>
                                                    <Limitador>
                                                        <StyledDatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Telefone/WhatsApp</FormInputLabelRequired>
                                                    <Limitador>
                                                        <MaskedInput mask='(99) 99999-9999' name='phone' type='text' placeholder='(00) 00000-0000' />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>

                                            {/* UPLOAD DOCS */}
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabel>Foto RG/CNH (Frente)</FormInputLabel>
                                                    <StyledFileArea>
                                                        {selectedFrontImage ? <Image src={selectedFrontImage} /> : (
                                                            <>
                                                                <StyledFileIconContainer><FaCloudUploadAlt /></StyledFileIconContainer>
                                                                <StyledFileInputTitle>Enviar Frente</StyledFileInputTitle>
                                                            </>
                                                        )}
                                                        <StyledFileInput
                                                            type="file" accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                setFieldValue('documentFront', file);
                                                                setSelectedFrontImage(file ? URL.createObjectURL(file) : null);
                                                            }}
                                                        />
                                                    </StyledFileArea>
                                                </FormInputArea>

                                                <FormInputArea>
                                                    <FormInputLabel>Foto RG/CNH (Verso)</FormInputLabel>
                                                    <StyledFileArea>
                                                        {selectedBackImage ? <Image src={selectedBackImage} /> : (
                                                            <>
                                                                <StyledFileIconContainer><FaCloudUploadAlt /></StyledFileIconContainer>
                                                                <StyledFileInputTitle>Enviar Verso</StyledFileInputTitle>
                                                            </>
                                                        )}
                                                        <StyledFileInput
                                                            type="file" accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                setFieldValue('documentBack', file);
                                                                setSelectedBackImage(file ? URL.createObjectURL(file) : null);
                                                            }}
                                                        />
                                                    </StyledFileArea>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                    </FormContent>

                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => navigate('/clientes')}>Cancelar</BackButton>
                                        {isSubmitting ? <ThreeDots color="#4e4e4e" height={40} /> : <SubmitButton type="submit">Salvar Cliente</SubmitButton>}
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </StyledFormArea>
                </ContentClientContainer>
            </MainClientContainer>

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(NovoClient);