import React, { useEffect, useState, useRef } from "react";
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
import { getClientes } from "../../services/clientService";

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

const ClientPage = ({ user }) => {
    const navigate = useNavigate();
    const listRef = useRef(null); // Ref para o container da lista

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);

    // Filtros de visualização (Cards)
    const [filterType, setFilterType] = useState('TOTAL'); // 'TOTAL', 'ATIVOS', 'SOLICITACOES'

    const [clientesAtivos, setClientesAtivos] = useState([]);
    const [clientesSolicitacao, setClientesSolicitacao] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => {
        logoutUser(navigate);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // V2: Não passa user, interceptor resolve token
            await getClientes(setClientes, setClientesSolicitacao, setClientesAtivos);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            fetchData();
        }
    }, [user]);

    // Função para alterar filtro e rolar até a lista (UX Mobile)
    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1); // Reseta paginação

        // Scroll suave até a lista no mobile
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Determina qual lista mostrar baseada no filtro
    const getCurrentList = () => {
        switch (filterType) {
            case 'ATIVOS': return clientesAtivos;
            case 'SOLICITACOES': return clientesSolicitacao;
            default: return clientes;
        }
    };

    const currentList = getCurrentList();

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
                                <ClientCounter>{clientesAtivos.length}</ClientCounter>
                            </CardIconContainer>
                        </Card>

                        <Card
                            onClick={() => handleCardClick('SOLICITACOES')}
                            className={filterType === 'SOLICITACOES' ? 'active' : ''}
                        >
                            <CardTitle>Solicitações Pendentes</CardTitle>
                            <CardIconContainer>
                                <FaUserEdit color={clientesSolicitacao.length > 0 ? '#f59e0b' : '#3b82f6'} />
                                <ClientCounter>{clientesSolicitacao.length}</ClientCounter>
                            </CardIconContainer>
                        </Card>

                        <Card
                            onClick={() => handleCardClick('TOTAL')}
                            className={filterType === 'TOTAL' ? 'active' : ''}
                        >
                            <CardTitle>Total Cadastrados</CardTitle>
                            <CardIconContainer>
                                <FaDatabase />
                                <ClientCounter>{clientes.length}</ClientCounter>
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

                        {currentList.length === 0 ? (
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
                                clientes={currentList}
                                refreshData={fetchData}
                                navigate={navigate}
                                search={search}
                                page={page}
                                setPage={setPage}
                                itemsPerPage={itemsPerPage}
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