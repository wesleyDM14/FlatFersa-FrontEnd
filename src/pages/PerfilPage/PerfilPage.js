import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaCloudUploadAlt, FaUserEdit, FaLock } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FormInput, StyledDatePicker, MaskedInput } from "../../components/FormLib"; 

// Certifique-se que seu userService está na versão V2 (com interceptors)
import { getLoggedUserInfo, logoutUser, updateUserLoggedIn } from '../../services/userService';

// Estilos próprios (não dependem mais de ClientPage)
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
    Limitador,
    SubItensContainer,
    AvatarContainer,
    AvatarImage,
    UploadButton
} from "./PerfilPage.styles";

import defaultAvatar from '../../assets/user.png'; 

const PerfilPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    
    const [startDate, setStartDate] = useState(new Date());
    const [previewImage, setPreviewImage] = useState(null);

    const handleLogout = () => logoutUser(navigate);

    // Função de busca isolada
    const fetchData = async () => {
        setLoading(true);
        try {
            // V2: Não passamos 'user', o interceptor usa o token da sessão
            await getLoggedUserInfo(setUserInfo, setStartDate);
        } catch (error) {
            console.error("Erro ao carregar perfil", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // CORREÇÃO DO LOADING INFINITO
        if (user && user.accessToken) {
            fetchData();
        } else {
            // Se não tem user ou token, para o loading para não travar a tela
            setLoading(false);
        }
    }, [user]);

    // Atualiza a foto quando os dados chegarem
    useEffect(() => {
        if (userInfo.photoUrl) {
            setPreviewImage(userInfo.photoUrl);
        }
    }, [userInfo]);

    // Proteção de renderização
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
                        <Formik
                            enableReinitialize={true} // Importante para carregar os dados vindos da API
                            initialValues={{
                                id: userInfo.id,
                                name: userInfo.name || '',
                                email: userInfo.email || '',
                                phone: userInfo.phone || '',
                                address: userInfo.address || '',
                                cpf: userInfo.cpf || '',
                                rg: userInfo.rg || '',
                                photo: null, 
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: '',
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Nome é obrigatório'),
                                email: Yup.string().email().required('Email é obrigatório'),
                                // Senhas opcionais
                                newPassword: Yup.string().min(6, 'Mínimo 6 caracteres'),
                                confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Senhas não conferem')
                            })}
                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                values.dateBirth = startDate;
                                // V2: Serviço atualizado
                                await updateUserLoggedIn(values, setSubmitting, setFieldError);
                                // Recarrega os dados para atualizar a foto/infos na tela
                                fetchData(); 
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    {/* CARD 1: DADOS PESSOAIS E FOTO */}
                                    <ProfileCard>
                                        <SectionTitle>
                                            <FaUserEdit style={{marginRight: 10}}/> Dados Pessoais
                                        </SectionTitle>
                                        
                                        <AvatarContainer>
                                            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                                <AvatarImage src={previewImage || defaultAvatar} alt="Foto de Perfil" />
                                                <UploadButton>
                                                    <FaCloudUploadAlt /> Alterar Foto
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if(file) {
                                                                setFieldValue('photo', file);
                                                                setPreviewImage(URL.createObjectURL(file));
                                                            }
                                                        }}
                                                    />
                                                </UploadButton>
                                            </div>
                                        </AvatarContainer>

                                        <FormContent>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Nome Completo</FormInputLabelRequired>
                                                    <FormInput type="text" name="name" />
                                                </FormInputArea>
                                                
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Email</FormInputLabelRequired>
                                                    <FormInput type="email" name="email" disabled style={{backgroundColor: '#f3f4f6', cursor: 'not-allowed'}}/>
                                                </FormInputArea>

                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabel>CPF</FormInputLabel>
                                                        <MaskedInput mask="999.999.999-99" name="cpf" type="text" disabled style={{backgroundColor: '#f3f4f6'}}/>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabel>RG</FormInputLabel>
                                                        <FormInput type="text" name="rg" />
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>

                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabel>Endereço</FormInputLabel>
                                                    <FormInput type="text" name="address" />
                                                </FormInputArea>
                                                
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabel>Data Nascimento</FormInputLabel>
                                                        <Limitador>
                                                            <StyledDatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
                                                        </Limitador>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabel>Telefone</FormInputLabel>
                                                        <MaskedInput mask="(99) 99999-9999" name="phone" type="text" />
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>
                                        </FormContent>
                                    </ProfileCard>

                                    {/* CARD 2: SEGURANÇA (SENHA) */}
                                    <ProfileCard style={{marginTop: 20}}>
                                        <SectionTitle>
                                            <FaLock style={{marginRight: 10}}/> Segurança
                                        </SectionTitle>
                                        <p style={{color: '#666', fontSize: '0.9rem', marginBottom: 20}}>
                                            Preencha os campos abaixo apenas se desejar alterar sua senha.
                                        </p>
                                        
                                        <FormContent>
                                            <FormColum>
                                                <FormInputArea>
                                                    <FormInputLabel>Senha Atual</FormInputLabel>
                                                    <FormInput type="password" name="currentPassword" placeholder="Necessário para salvar alterações" />
                                                </FormInputArea>
                                            </FormColum>
                                            <FormColum>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabel>Nova Senha</FormInputLabel>
                                                        <FormInput type="password" name="newPassword" />
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabel>Confirmar Nova Senha</FormInputLabel>
                                                        <FormInput type="password" name="confirmPassword" />
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </FormColum>
                                        </FormContent>
                                    </ProfileCard>

                                    <ButtonGroup>
                                        <BackButton type="button" onClick={() => navigate('/dashboard')}>Cancelar</BackButton>
                                        {!isSubmitting ? (
                                            <SubmitButton type="submit">Salvar Alterações</SubmitButton>
                                        ) : (
                                            <ThreeDots color="#4e4e4e" height={40} width={80} />
                                        )}
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </ContentPerfilContainer>
                </MainPerfilContainer>
            )}
            
            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(PerfilPage);