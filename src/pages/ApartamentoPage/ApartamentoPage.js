import { useEffect, useState, useCallback } from "react";
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
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => {
        logoutUser(navigate);
    };

    // Debounce da busca (~400ms)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Reseta a página sempre que a busca mudar
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    // Função de busca de dados
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getApartamentos({ page, limit: itemsPerPage, search: debouncedSearch });
            setApartamentos(data.items || []);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Erro ao carregar dados", error);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetchData();
        }
    }, [user, fetchData]);

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
                            <ApartamentoCounter>Total: {total} apartamentos</ApartamentoCounter>
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
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
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
