import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { logoutUser } from "../../services/userService";

import {
    AddApartamentoHeaderButton,
    AddButtonText,
    AdicionarApartamentoButton,
    ApartamentoCounter,
    ContentApartamentoContainer,
    ContentApartamentoHeader,
    HeaderApartamentoContainer,
    HeaderTitle,
    LoadingContainer,
    MainApartamentoContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
} from './ApartamentoPage.styles';
import { FaHouseUser, FaPlus } from "react-icons/fa";
import { getApartamentos } from "../../services/apartamentoService";
import { ThreeDots } from "react-loader-spinner";
import ApartamentoList from "./ApartamentoList";

const ApartamentoPage = ({ user }) => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamentos, setApartamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function loadData() {
            if (loading) {
                user.accessToken && await getApartamentos(user, setApartamentos, setLoading);
            }
        }
        loadData();
    }, [loading, user]);

    return (
        user.isAdmin && (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} apartamentoActive={true} />
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
                        <MainApartamentoContainer>
                            <HeaderApartamentoContainer>
                                <HeaderTitle>Apartamentos</HeaderTitle>
                                <AddApartamentoHeaderButton onClick={() => navigate('/apartamentos/novo')}>
                                    <FaPlus color='green' />
                                    <AddButtonText>
                                        Adicionar Novo
                                    </AddButtonText>
                                </AddApartamentoHeaderButton>
                            </HeaderApartamentoContainer>
                            <ContentApartamentoContainer>
                                <ContentApartamentoHeader>
                                    <ApartamentoCounter>Apartamentos ({apartamentos.length})</ApartamentoCounter>
                                    <SearcherContainer>
                                    </SearcherContainer>
                                </ContentApartamentoHeader>
                                {
                                    apartamentos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHouseUser color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum apartamento encontrado.</TextContent>
                                                <AdicionarApartamentoButton onClick={() => navigate('/apartamentos/novo')}>
                                                    <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Apartamento
                                                </AdicionarApartamentoButton>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        <ApartamentoList apartamentos={apartamentos} user={user} setLoading={setLoading} navigate={navigate} />
                                    )
                                }
                            </ContentApartamentoContainer>
                        </MainApartamentoContainer>
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

export default connect(mapStateToProps)(ApartamentoPage);