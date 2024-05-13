import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { logoutUser } from '../../services/userService';

import {
    AddButtonText,
    AddContratoHeaderButton,
    AdicionarContratoButton,
    ContratoCounter,
    ContentContratoContainer,
    ContentContratoHeader,
    HeaderContratoContainer,
    HeaderTitle,
    MainContratoContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
    LoadingContainer,
} from "./ContractPage.styles";
import { FaHandshake, FaPlus } from "react-icons/fa";
import { getContratos } from "../../services/contratoService";
import { ThreeDots } from "react-loader-spinner";
import ContractList from "./ContractList";

const ContractPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function teste() {
            if (loading) {
                user.accessToken && await getContratos(user, setContratos, setLoading);
            }
        }
        teste();
    }, [user, loading]);

    return (
        user.isAdmin ? (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
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
                        <MainContratoContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Contratos</HeaderTitle>
                                <AddContratoHeaderButton onClick={() => navigate('/contratos/novo')}>
                                    <FaPlus color='green' />
                                    <AddButtonText>
                                        Adicionar Novo
                                    </AddButtonText>
                                </AddContratoHeaderButton>
                            </HeaderContratoContainer>
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    <ContratoCounter>Contratos ({contratos.length})</ContratoCounter>
                                    <SearcherContainer>
                                    </SearcherContainer>
                                </ContentContratoHeader>
                                {
                                    contratos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHandshake color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum contrato encontrado.</TextContent>
                                                <AdicionarContratoButton onClick={() => navigate('/contratos/novo')}>
                                                    <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Contrato
                                                </AdicionarContratoButton>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        <ContractList user={user} contratos={contratos} navigate={navigate} setLoading={setLoading} />
                                    )
                                }
                            </ContentContratoContainer>
                        </MainContratoContainer>
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        ) : (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
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
                        <MainContratoContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Contratos</HeaderTitle>
                            </HeaderContratoContainer>
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    <ContratoCounter>Contratos ({contratos.length})</ContratoCounter>
                                    <SearcherContainer>
                                    </SearcherContainer>
                                </ContentContratoHeader>
                                {
                                    contratos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHandshake color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum contrato encontrado.</TextContent>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        <ContractList user={user} contratos={contratos} navigate={navigate} setLoading={setLoading} />
                                    )
                                }
                            </ContentContratoContainer>
                        </MainContratoContainer>
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        )

    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ContractPage);