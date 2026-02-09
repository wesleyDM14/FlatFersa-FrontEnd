import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { FaFileInvoice } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

// Componentes Layout
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FinalidadeSelected, FormInput } from "../../components/FormLib";

// Serviços e Estilos
import { logoutUser } from '../../services/userService';
import { createPredio } from "../../services/predioService";

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
    LoadingContainer // Caso precise
} from './PredioPage.styles';

const NovoPredio = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Estado para o Select (Dropdown)
    const [selectedFinalidade, setSelectedFinalidade] = useState(null);

    // Proteção de Rota
    if (!user || user.role !== 'ADMIN') {
        return null; // Ou redirecionar
    }

    const handleLogout = () => {
        logoutUser(navigate);
    };

    return (
        <div className="container">
            {/* Sidebar V2 */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            />

            <MainPredioContainer>
                <HeaderPredioContainer>
                    <HeaderTitle>Adicionar Novo Prédio</HeaderTitle>
                </HeaderPredioContainer>

                <ContentPredioContainer>
                    <ContentPredioHeader>
                        <ContentIconContainer>
                            <FaFileInvoice />
                            <PredioCounter>Dados do Prédio</PredioCounter>
                        </ContentIconContainer>
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
                                finalidade: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    nome: Yup.string().required("Obrigatório"),
                                    endereco: Yup.string().required("Obrigatório"),
                                    cidade: Yup.string().required("Obrigatório"),
                                    estado: Yup.string().required("Obrigatório").min(2, 'Min 2 letras').max(2, 'Use a sigla (ex: SP)'),
                                    bairro: Yup.string().required('Obrigatório'),
                                    numApt: Yup.number().required('Obrigatório').min(1, 'Mínimo 1'),
                                    kwhPrice: Yup.number().required('Obrigatório'),
                                })
                            }
                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                // Validação manual do Select
                                if (!selectedFinalidade) {
                                    alert("Selecione a finalidade do prédio");
                                    setSubmitting(false);
                                    return;
                                }

                                // Ajuste: Se o select retornar objeto {value, label}, pegamos o value
                                values.finalidade = selectedFinalidade.value || selectedFinalidade;

                                // Chamada do serviço V2 (sem passar user)
                                await createPredio(values, navigate, setSubmitting, setFieldError);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <FormContent>
                                        {/* COLUNA 1: DADOS BÁSICOS */}
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                <FormInput
                                                    type="text"
                                                    name='nome'
                                                    placeholder="Ex: Edifício Solar"
                                                />
                                            </FormInputArea>

                                            <FormInputArea>
                                                <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                <FormInput
                                                    type="text"
                                                    name='endereco'
                                                    placeholder="Rua, Número"
                                                />
                                            </FormInputArea>

                                            <FormInputArea>
                                                <FormInputLabelRequired>Finalidade</FormInputLabelRequired>
                                                {/* Componente Customizado de Select */}
                                                <FinalidadeSelected
                                                    handleChange={setSelectedFinalidade}
                                                    initialValue={selectedFinalidade}
                                                />
                                            </FormInputArea>
                                        </FormColum>

                                        {/* COLUNA 2: DETALHES E LOCALIZAÇÃO */}
                                        <FormColum>
                                            {/* Linha 1: Qnt Apts e Estado */}
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Qtd. Apts</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput type="number" name='numApt' min='0' />
                                                    </Limitador>
                                                </FormInputArea>

                                                <FormInputArea>
                                                    <FormInputLabelRequired>Estado (UF)</FormInputLabelRequired>
                                                    <LimitadorAlt>
                                                        <FormInput type="text" name='estado' placeholder="UF" maxLength={2} />
                                                    </LimitadorAlt>
                                                </FormInputArea>
                                            </SubItensContainer>

                                            {/* Linha 2: Valor kWh e Bairro */}
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Valor kWh (R$)</FormInputLabelRequired>
                                                    <LimitadorAlt>
                                                        <FormInput type="number" name='kwhPrice' step='0.01' min='0' />
                                                    </LimitadorAlt>
                                                </FormInputArea>

                                                <FormInputArea>
                                                    <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput type="text" name='bairro' placeholder="Bairro" />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>

                                            {/* Linha 3: Cidade */}
                                            <FormInputArea>
                                                <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                <FormInput type="text" name='cidade' placeholder="Cidade" />
                                            </FormInputArea>

                                        </FormColum>
                                    </FormContent>

                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => navigate('/predios')}>
                                            Cancelar
                                        </BackButton>

                                        {!isSubmitting && (
                                            <SubmitButton type="submit">Salvar Prédio</SubmitButton>
                                        )}

                                        {isSubmitting && (
                                            <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                                        )}
                                    </ButtonGroup>
                                </Form>
                            )}
                        </Formik>
                    </StyledFormArea>
                </ContentPredioContainer>
            </MainPredioContainer>

            {/* Navbar V2 */}
            <Navbar
                openSidebar={() => setSidebarOpen(true)}
                user={user}
                logout={handleLogout}
            />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(NovoPredio);