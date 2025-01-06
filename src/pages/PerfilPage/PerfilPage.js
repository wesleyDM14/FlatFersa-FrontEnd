import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { getLoggedUserInfo, logoutUser, updateUserLoggedIn } from '../../services/userService';
import {
    BackButton,
    ButtonGroup,
    ContentPerfilContainer,
    HeaderPerfilContainer,
    HeaderTitle,
    LoadingContainer,
    MainPerfilContainer,
    StyledFormArea,
    SubmitButton,
} from "./PerfilPage.styles";
import { ThreeDots } from "react-loader-spinner";
import { connect } from "react-redux";
import { FormInput, StyledDatePicker } from "../../components/FormLib";
import {
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    Image,
    Limitador,
    StyledFileArea,
    StyledFileIconContainer,
    StyledFileInput,
    StyledFileInputTitle,
    StyledFileLegend,
    SubItensContainer
} from "../ClientPage/ClientPage.styles";
import { FaCloudUploadAlt } from "react-icons/fa";

const PerfilPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [selectedBackImage, setSelectedBackImage] = useState();
    const [selectedFrontImage, setSelectedFrontImage] = useState();

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (user.accessToken) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    await getLoggedUserInfo(user, setUserInfo, setStartDate);
                } catch (error) {
                    console.error("Error loading data", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [user]);

    const refreshData = async () => {
        setLoading(true);
        try {
            await getLoggedUserInfo(user, setUserInfo, setStartDate);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} perfilActive={true} />
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
                    <MainPerfilContainer>
                        <HeaderPerfilContainer>
                            <HeaderTitle>Atualizar Perfil</HeaderTitle>
                        </HeaderPerfilContainer>
                        <ContentPerfilContainer>
                            <StyledFormArea>
                                {
                                    user.isAdmin ? (
                                        <Formik
                                            initialValues={{
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: '',
                                            }}
                                            validationSchema={
                                                Yup.object({
                                                    currentPassword: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatório'),
                                                    newPassword: Yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatório'),
                                                    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'As senhas devem coincidir').required('Confirmação de senha é obrigatório'),
                                                })
                                            }
                                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                                await updateUserLoggedIn(user, values, setSubmitting, setFieldError);
                                                refreshData();
                                            }}
                                        >
                                            {
                                                ({ isSubmitting }) => (
                                                    <Form>
                                                        <FormContent>
                                                            <FormColum>
                                                                <FormInputArea>
                                                                    <FormInputLabelRequired>Senha Atual</FormInputLabelRequired>
                                                                    <FormInput
                                                                        name='currentPassword'
                                                                        type='password'
                                                                    />
                                                                </FormInputArea>
                                                            </FormColum>
                                                            <FormColum>
                                                                <SubItensContainer>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Nova Senha</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <FormInput
                                                                                name='newPassword'
                                                                                type='password'
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Confirmar Nova Senha</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <FormInput
                                                                                name='confirmPassword'
                                                                                type='password'
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                </SubItensContainer>
                                                            </FormColum>

                                                        </FormContent>
                                                        <ButtonGroup>
                                                            <BackButton type='button' onClick={() => navigate('/')}>Voltar</BackButton>
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
                                    ) : (
                                        <Formik
                                            initialValues={{
                                                id: userInfo.id,
                                                cpf: userInfo.cpf,
                                                rg: userInfo.rg,
                                                phone: userInfo.phone,
                                                address: userInfo.address,
                                                dateBirth: userInfo.dateBirth,
                                                name: userInfo.name,
                                                documentoFrente: userInfo.documentoFrente,
                                                documentoVerso: userInfo.documentoVerso,
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: '',
                                            }}
                                            validationSchema={
                                                Yup.object({
                                                    phone: Yup.string().required('Nome é obrigatório'),
                                                    address: Yup.string().required('Endereço é Obrigatório'),
                                                    dateBirth: Yup.date().required('Data de Nascimento é Obrigatório'),
                                                    name: Yup.string().required('Nome é obrigatório'),
                                                    currentPassword: Yup.string(),
                                                    newPassword: Yup.string(),
                                                    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'As senhas devem coincidir'),
                                                })
                                            }
                                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                                values.dateBirth = startDate;
                                                await updateUserLoggedIn(user, values, setSubmitting, setFieldError);
                                                refreshData();
                                            }}
                                        >
                                            {
                                                ({ isSubmitting, setFieldValue }) => (
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
                                                                    <FormInputLabelRequired>Senha Atual</FormInputLabelRequired>
                                                                    <FormInput
                                                                        name='currentPassword'
                                                                        type='password'
                                                                    />
                                                                </FormInputArea>
                                                                <SubItensContainer>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Nova Senha</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <FormInput
                                                                                name='newPassword'
                                                                                type='password'
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Confirmar Nova Senha</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <FormInput
                                                                                name='confirmPassword'
                                                                                type='password'
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
                                                                        {
                                                                            selectedFrontImage ? (
                                                                                <Image
                                                                                    src={selectedFrontImage}
                                                                                />
                                                                            ) : (
                                                                                userInfo.documentoFrente ? (
                                                                                    <Image
                                                                                        src={userInfo.documentoFrente}
                                                                                    />
                                                                                ) :
                                                                                    (
                                                                                        <div>
                                                                                            <StyledFileIconContainer>
                                                                                                <FaCloudUploadAlt />
                                                                                            </StyledFileIconContainer>
                                                                                            <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                                                            <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                                                        </div>
                                                                                    )
                                                                            )
                                                                        }

                                                                        <StyledFileInput
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(event) => {
                                                                                const file = event.target.files[0];
                                                                                setFieldValue('documentFront', file);
                                                                                setSelectedFrontImage(file ? URL.createObjectURL(file) : undefined);
                                                                            }}
                                                                        />
                                                                    </StyledFileArea>
                                                                </FormInputArea>
                                                                <FormInputArea>
                                                                    <FormInputLabel>Documento de Identificação (Verso)</FormInputLabel>
                                                                    <StyledFileArea>
                                                                        {
                                                                            selectedBackImage ? (
                                                                                <Image
                                                                                    src={selectedBackImage}
                                                                                />
                                                                            ) : (
                                                                                userInfo.documentoVerso ? (
                                                                                    <Image
                                                                                        src={userInfo.documentoVerso}
                                                                                    />
                                                                                ) :
                                                                                    (
                                                                                        <div>
                                                                                            <StyledFileIconContainer>
                                                                                                <FaCloudUploadAlt />
                                                                                            </StyledFileIconContainer>
                                                                                            <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                                                            <StyledFileLegend>Tamanho máximo 10MB</StyledFileLegend>
                                                                                        </div>
                                                                                    )
                                                                            )
                                                                        }
                                                                        <StyledFileInput
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(event) => {
                                                                                const file = event.target.files[0];
                                                                                setFieldValue('documentBack', file);
                                                                                setSelectedBackImage(file ? URL.createObjectURL(file) : undefined);
                                                                            }}
                                                                        />
                                                                    </StyledFileArea>
                                                                </FormInputArea>
                                                            </FormColum>
                                                        </FormContent>
                                                        <ButtonGroup>
                                                            <BackButton type='button' onClick={() => navigate('/')}>Voltar</BackButton>
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
                                    )
                                }
                            </StyledFormArea>
                        </ContentPerfilContainer>
                    </MainPerfilContainer >
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(PerfilPage);