import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaUserEdit, FaLock, FaExclamationTriangle } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FormInput, MaskedInput } from "../../components/FormLib";

import { getLoggedUserInfo, logoutUser, updateMyProfile, updateMyPassword, solicitarExclusaoConta } from '../../services/userService';

import {
    MainPerfilContainer,
    HeaderPerfilContainer,
    HeaderTitle,
    ContentPerfilContainer,
    LoadingContainer,
    ProfileCard,
    SectionTitle,
    FormContent,
    FormColum,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    ButtonGroup,
    BackButton,
    SubmitButton,
} from "./PerfilPage.styles";

const PerfilPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    const isAdmin = user?.role === 'ADMIN';
    const [solicitandoExclusao, setSolicitandoExclusao] = useState(false);

    const handleLogout = () => logoutUser(navigate);

    const handleSolicitarExclusao = async () => {
        if (!window.confirm(
            "Tem certeza que deseja solicitar a exclusão da sua conta?\n\n" +
            "Um administrador vai analisar seu pedido. Se você não tiver contrato ativo, " +
            "seus dados pessoais serão anonimizados e sua conta será desativada."
        )) return;

        setSolicitandoExclusao(true);
        try {
            const result = await solicitarExclusaoConta();
            alert(result.message || "Solicitação enviada com sucesso.");
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao solicitar exclusão de conta.");
        } finally {
            setSolicitandoExclusao(false);
        }
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getLoggedUserInfo();
            setUserInfo(data);
        } catch (error) {
            console.error("Erro ao carregar perfil", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && user.id) fetchData();
    }, [user, fetchData]);

    if (!user) {
        return (
            <LoadingContainer>
                <ThreeDots color={'#4e4e4e'} height={49} width={100} />
            </LoadingContainer>
        );
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading ? (
                <LoadingContainer>
                    <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                </LoadingContainer>
            ) : (
                <MainPerfilContainer>
                    <HeaderPerfilContainer>
                        <HeaderTitle>Meu Perfil</HeaderTitle>
                    </HeaderPerfilContainer>

                    <ContentPerfilContainer>
                        {!isAdmin && (
                            <ProfileCard>
                                <SectionTitle>
                                    <FaUserEdit style={{ marginRight: 10 }} /> Dados Pessoais
                                </SectionTitle>

                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        name: userInfo.name || '',
                                        email: userInfo.email || '',
                                        phone: userInfo.phone || '',
                                        address: userInfo.address || '',
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required('Nome é obrigatório'),
                                    })}
                                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                        try {
                                            await updateMyProfile(values, setSubmitting, setFieldError);
                                            alert("Dados atualizados com sucesso!");
                                            fetchData();
                                        } catch (error) {
                                            // erro já tratado em updateMyProfile
                                        }
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <FormContent>
                                                <FormColum>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Nome Completo</FormInputLabelRequired>
                                                        <FormInput type="text" name="name" />
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabel>Email</FormInputLabel>
                                                        <FormInput type="email" name="email" disabled style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
                                                    </FormInputArea>
                                                </FormColum>
                                                <FormColum>
                                                    <FormInputArea>
                                                        <FormInputLabel>Endereço</FormInputLabel>
                                                        <FormInput type="text" name="address" />
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabel>Telefone</FormInputLabel>
                                                        <MaskedInput mask="(99) 99999-9999" name="phone" type="text" />
                                                    </FormInputArea>
                                                </FormColum>
                                            </FormContent>
                                            <ButtonGroup>
                                                {!isSubmitting ? (
                                                    <SubmitButton type="submit">Salvar Dados</SubmitButton>
                                                ) : (
                                                    <ThreeDots color="#4e4e4e" height={40} width={80} />
                                                )}
                                            </ButtonGroup>
                                        </Form>
                                    )}
                                </Formik>
                            </ProfileCard>
                        )}

                        <ProfileCard>
                            <SectionTitle>
                                <FaLock style={{ marginRight: 10 }} /> Segurança
                            </SectionTitle>

                            <Formik
                                initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                                validationSchema={Yup.object({
                                    currentPassword: Yup.string().required('Informe sua senha atual'),
                                    newPassword: Yup.string().min(6, 'Mínimo 6 caracteres').required('Obrigatório'),
                                    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Senhas não conferem').required('Obrigatório')
                                })}
                                onSubmit={async (values, { setSubmitting, setFieldError, resetForm }) => {
                                    try {
                                        await updateMyPassword(values, setFieldError);
                                        alert("Senha alterada com sucesso!");
                                        resetForm();
                                    } catch (error) {
                                        // erro já tratado em updateMyPassword
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
                                                    <FormInputLabel>Senha Atual</FormInputLabel>
                                                    <FormInput type="password" name="currentPassword" />
                                                </FormInputArea>
                                            </FormColum>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabel>Nova Senha</FormInputLabel>
                                                    <FormInput type="password" name="newPassword" />
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabel>Confirmar Nova Senha</FormInputLabel>
                                                    <FormInput type="password" name="confirmPassword" />
                                                </FormInputArea>
                                            </FormColum>
                                        </FormContent>
                                        <ButtonGroup>
                                            <BackButton type="button" onClick={() => navigate('/dashboard')}>Voltar</BackButton>
                                            {!isSubmitting ? (
                                                <SubmitButton type="submit">Alterar Senha</SubmitButton>
                                            ) : (
                                                <ThreeDots color="#4e4e4e" height={40} width={80} />
                                            )}
                                        </ButtonGroup>
                                    </Form>
                                )}
                            </Formik>
                        </ProfileCard>

                        {!isAdmin && (
                            <ProfileCard>
                                <SectionTitle style={{ color: '#dc2626' }}>
                                    <FaExclamationTriangle style={{ marginRight: 10 }} /> Zona de Risco
                                </SectionTitle>
                                {userInfo.exclusaoSolicitada ? (
                                    <p style={{ color: '#d97706', fontWeight: 600 }}>
                                        Sua solicitação de exclusão de conta está em análise pelo administrador.
                                    </p>
                                ) : (
                                    <>
                                        <p style={{ color: '#6b7280', marginBottom: 15 }}>
                                            Ao solicitar a exclusão, seus dados pessoais (nome, CPF, RG, documentos, telefone
                                            e endereço) serão anonimizados assim que aprovado pelo administrador. Isso só é
                                            possível se você não tiver um contrato ativo no momento.
                                        </p>
                                        <ButtonGroup>
                                            <SubmitButton
                                                type="button"
                                                style={{ backgroundColor: '#dc2626' }}
                                                onClick={handleSolicitarExclusao}
                                                disabled={solicitandoExclusao}
                                            >
                                                {solicitandoExclusao ? <ThreeDots color="#fff" height={20} width={40} /> : "Solicitar Exclusão de Conta"}
                                            </SubmitButton>
                                        </ButtonGroup>
                                    </>
                                )}
                            </ProfileCard>
                        )}
                    </ContentPerfilContainer>
                </MainPerfilContainer>
            )}

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(PerfilPage);
