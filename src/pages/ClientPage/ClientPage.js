import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { FaDatabase, FaPlus, FaUserCheck, FaUserEdit, FaUsers } from "react-icons/fa";

// Componentes
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import ClientList from "./ClientList";

// Serviços
import { logoutUser } from "../../services/userService";
import { getClientes, getClientesCounts } from "../../services/clientService";

// Estilos
import {
    AddButtonText,
    AddClientHeaderButton,
    AdicionarClientButton,
    Card,
    CardIconContainer,
    CardTitle,
    ClientCounter,
    ClienteCardsContainer,
    ContentClientContainer,
    ContentClientHeader,
    HeaderClientContainer,
    HeaderTitle,
    LoadingContainer,
    MainClientContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
} from "./ClientPage.styles";

// Mapeia o filtro dos cards para o enum de status aceito pelo backend
const statusFromFilterType = (filterType) => {
    switch (filterType) {
        case 'ATIVOS': return 'APROVADO';
        case 'SOLICITACOES': return 'PENDENTE_APROVACAO';
        default: return '';
    }
};

const ClientPage = ({ user }) => {
    const navigate = useNavigate();
    const listRef = useRef(null); // Ref para o container da lista

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Filtros de visualização (Cards)
    const [filterType, setFilterType] = useState('TOTAL'); // 'TOTAL', 'ATIVOS', 'SOLICITACOES'

    const [counts, setCounts] = useState({ ativos: 0, solicitacoes: 0, total: 0 });

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

    // Reseta a página sempre que busca ou filtro de status mudar
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filterType]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const status = statusFromFilterType(filterType);
            const [data, countsData] = await Promise.all([
                getClientes({ page, limit: itemsPerPage, search: debouncedSearch, status }),
                getClientesCounts()
            ]);
            setClientes(data.items || []);
            setTotalPages(data.totalPages || 1);
            setCounts(countsData || { ativos: 0, solicitacoes: 0, total: 0 });
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch, filterType]);

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetchData();
        }
    }, [user, fetchData]);

    // Função para alterar filtro e rolar até a lista (UX Mobile)
    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1); // Reseta paginação

        // Scroll suave até a lista no mobile
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
                <MainClientContainer>
                    <HeaderClientContainer>
                        <HeaderTitle>Gestão de Clientes</HeaderTitle>
                        <AddClientHeaderButton onClick={() => navigate('/clientes/novo')}>
                            <FaPlus color='green' />
                            <AddButtonText>Adicionar Novo</AddButtonText>
                        </AddClientHeaderButton>
                    </HeaderClientContainer>

                    {/* CARDS COM SCROLL AUTOMÁTICO AO CLICAR */}
                    <ClienteCardsContainer>
                        <Card
                            onClick={() => handleCardClick('ATIVOS')}
                            className={filterType === 'ATIVOS' ? 'active' : ''}
                        >
                            <CardTitle>Clientes Ativos</CardTitle>
                            <CardIconContainer>
                                <FaUserCheck />
                                <ClientCounter>{counts.ativos}</ClientCounter>
                            </CardIconContainer>
                        </Card>

                        <Card
                            onClick={() => handleCardClick('SOLICITACOES')}
                            className={filterType === 'SOLICITACOES' ? 'active' : ''}
                        >
                            <CardTitle>Solicitações Pendentes</CardTitle>
                            <CardIconContainer>
                                <FaUserEdit color={counts.solicitacoes > 0 ? '#f59e0b' : '#3b82f6'} />
                                <ClientCounter>{counts.solicitacoes}</ClientCounter>
                            </CardIconContainer>
                        </Card>

                        <Card
                            onClick={() => handleCardClick('TOTAL')}
                            className={filterType === 'TOTAL' ? 'active' : ''}
                        >
                            <CardTitle>Total Cadastrados</CardTitle>
                            <CardIconContainer>
                                <FaDatabase />
                                <ClientCounter>{counts.total}</ClientCounter>
                            </CardIconContainer>
                        </Card>
                    </ClienteCardsContainer>

                    {/* ÂNCORA PARA O SCROLL */}
                    <div ref={listRef}></div>

                    <ContentClientContainer>
                        <ContentClientHeader>
                            <div style={{ marginBottom: '15px' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#334155' }}>
                                    {filterType === 'ATIVOS' && 'Lista de Clientes Ativos'}
                                    {filterType === 'SOLICITACOES' && 'Solicitações de Acesso'}
                                    {filterType === 'TOTAL' && 'Todos os Clientes'}
                                </h3>
                            </div>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar por nome ou telefone..." />
                            </SearcherContainer>
                        </ContentClientHeader>

                        {clientes.length === 0 ? (
                            <NoContentContainer>
                                <FaUsers color='#cbd5e1' fontSize={80} style={{ marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum cliente encontrado nesta categoria.</TextContent>
                                    {filterType === 'TOTAL' && (
                                        <AdicionarClientButton onClick={() => navigate('/clientes/novo')}>
                                            <FaPlus color='#fff' style={{ marginRight: 5 }} /> Novo Cliente
                                        </AdicionarClientButton>
                                    )}
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ClientList
                                clientes={clientes}
                                refreshData={fetchData}
                                navigate={navigate}
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        )}
                    </ContentClientContainer>
                </MainClientContainer>
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

export default connect(mapStateToProps)(ClientPage);
