import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { FaBuilding, FaPlus } from 'react-icons/fa';

// Serviços e Ações
import { logoutUser } from '../../services/userService';
import { getPredios } from '../../services/predioService';

// Componentes
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import PredioList from './PredioList';

// Estilos
import {
    MainPredioContainer,
    HeaderPredioContainer,
    HeaderTitle,
    AddPredioHeaderButton,
    AddButtonText,
    ContentPredioContainer,
    ContentPredioHeader,
    PredioCounter,
    SearcherContainer,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    AdicionarPredioButton,
    LoadingContainer
} from './PredioPage.styles';

const PredioPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Debounce da busca (~400ms)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Reseta a página sempre que a busca mudar
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPredios({ page, limit: itemsPerPage, search: debouncedSearch });
            setPredios(data.items || []);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Erro ao carregar prédios", error);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch]);

    // Busca dados iniciais
    useEffect(() => {
        // Agora verificamos user.role em vez de user.accessToken apenas
        if (user && user.role === 'ADMIN') {
            fetchData();
        }
    }, [user, fetchData]);

    const handleLogout = () => {
        logoutUser(navigate);
    };

    // Proteção de Rota (Redundância, já que o PrivateRoute cuida disso)
    if (!user || user.role !== 'ADMIN') {
        return null;
    }

    return (
        <div className="container">
            {/* SIDEBAR ATUALIZADO */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            // navigate não é mais necessário passar
            />

            {loading ? (
                <LoadingContainer>
                    <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                </LoadingContainer>
            ) : (
                <MainPredioContainer>
                    <HeaderPredioContainer>
                        <HeaderTitle>Gestão de Prédios</HeaderTitle>
                        <AddPredioHeaderButton onClick={() => navigate('/predios/novo')}>
                            <FaPlus color='green' />
                            <AddButtonText>Adicionar Novo</AddButtonText>
                        </AddPredioHeaderButton>
                    </HeaderPredioContainer>

                    <ContentPredioContainer>
                        <ContentPredioHeader>
                            <PredioCounter>Total: {total} prédios</PredioCounter>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar prédio..." />
                            </SearcherContainer>
                        </ContentPredioHeader>

                        {predios.length === 0 ? (
                            <NoContentContainer>
                                <FaBuilding color='#6c757d' fontSize={80} style={{ opacity: 0.5, marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum prédio encontrado.</TextContent>
                                    <AdicionarPredioButton onClick={() => navigate('/predios/novo')}>
                                        <FaPlus color='#fff' style={{ marginRight: 5 }} />
                                        Cadastrar Prédio
                                    </AdicionarPredioButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <PredioList
                                predios={predios}
                                user={user}
                                navigate={navigate}
                                refreshData={fetchData} // Passa a função de refresh direto
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        )}
                    </ContentPredioContainer>
                </MainPredioContainer>
            )}

            {/* NAVBAR ATUALIZADO */}
            <Navbar
                openSidebar={() => setSidebarOpen(true)}
                user={user}
                logout={handleLogout}
            // navigate não é mais necessário se o Navbar já usa o hook, mas se não atualizou lá, mantenha
            />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(PredioPage);
