import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaPlus, FaBuilding } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import ApartamentoList from "./ApartamentoList";

import { logoutUser } from "../../services/userService";
import { getApartamentos } from "../../services/apartamentoService";

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

const ApartamentoPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamentos, setApartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => {
        logoutUser(navigate);
    };

    // Função de busca de dados
    const fetchData = async () => {
        setLoading(true);
        try {
            await getApartamentos(setApartamentos);
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetchData();
        }
    }, [user]);

    // Proteção de Rota
    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="container">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            />

            {loading ? (
                <LoadingContainer>
                    <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                </LoadingContainer>
            ) : (
                <MainApartamentoContainer>
                    <HeaderApartamentoContainer>
                        <HeaderTitle>Gestão de Apartamentos</HeaderTitle>
                        <AddApartamentoHeaderButton onClick={() => navigate('/apartamentos/novo')}>
                            <FaPlus color='green' />
                            <AddButtonText>Adicionar Novo</AddButtonText>
                        </AddApartamentoHeaderButton>
                    </HeaderApartamentoContainer>

                    <ContentApartamentoContainer>
                        <ContentApartamentoHeader>
                            <ApartamentoCounter>Total: {apartamentos.length} apartamentos</ApartamentoCounter>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar por número ou prédio..." />
                            </SearcherContainer>
                        </ContentApartamentoHeader>

                        {apartamentos.length === 0 ? (
                            <NoContentContainer>
                                <FaBuilding color='#6c757d' fontSize={80} style={{ opacity: 0.5, marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum apartamento encontrado.</TextContent>
                                    <AdicionarApartamentoButton onClick={() => navigate('/apartamentos/novo')}>
                                        <FaPlus color='#fff' style={{ marginRight: 5 }} />
                                        Cadastrar Apartamento
                                    </AdicionarApartamentoButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ApartamentoList
                                apartamentos={apartamentos}
                                refreshData={fetchData}
                                navigate={navigate}
                                search={search}
                                page={page}
                                setPage={setPage}
                                itemsPerPage={itemsPerPage}
                            />
                        )}
                    </ContentApartamentoContainer>
                </MainApartamentoContainer>
            )}

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

export default connect(mapStateToProps)(ApartamentoPage);