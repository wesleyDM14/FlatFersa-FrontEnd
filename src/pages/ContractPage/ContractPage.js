import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { FaDatabase, FaFileContract, FaFileImport, FaHandshake, FaPlus } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";
import ContractList from "./ContractList";

import { logoutUser } from '../../services/userService';
import { getContratos, getContratosCounts, getMeusContratos } from "../../services/contratoService";

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
    ContratoCardsContainer,
    Card,
    CardTitle,
    CardIconContainer,
} from "./ContractPage.styles";

// Mapeia o filtro dos cards para o enum de status aceito pelo backend
const statusFromFilterType = (filterType) => {
    switch (filterType) {
        case 'ATIVOS': return 'ATIVO';
        case 'SOLICITACOES': return 'SOLICITADO';
        default: return '';
    }
};

const ContractPage = ({ user }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contratos, setContratos] = useState([]);

    // Filtros
    const [filterType, setFilterType] = useState('TOTAL');

    const [contratosCounts, setContratosCounts] = useState({ ativos: 0, solicitacoes: 0, total: 0 });
    const [contratoAtivoUser, setContratoAtivoUser] = useState(false);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => logoutUser(navigate);

    // Helper para verificar se é admin com segurança
    const isAdmin = user && (user.role === 'ADMIN' || user.isAdmin === true);

    // Debounce da busca (~400ms) para não martelar a API a cada tecla
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Sempre que busca ou filtro de status mudar, volta para a primeira página
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filterType]);

    const fetchData = useCallback(async () => {
        try {
            if (isAdmin) {
                const status = statusFromFilterType(filterType);
                const [data, counts] = await Promise.all([
                    getContratos({ page, limit: itemsPerPage, search: debouncedSearch, status }),
                    getContratosCounts()
                ]);
                setContratos(data.items || []);
                setTotalPages(data.totalPages || 1);
                setContratosCounts(counts || { ativos: 0, solicitacoes: 0, total: 0 });
            } else {
                // Lista pequena por natureza (contratos do próprio cliente) - sem paginação real no backend.
                // Filtramos e paginamos aqui mesmo para manter a mesma UX de Pagination no rodapé.
                const contratosData = await getMeusContratos();

                const temAtivo = contratosData.some(c => ['ATIVO', 'AGUARDANDO_ASSINATURA', 'SOLICITADO'].includes(c.status));
                setContratoAtivoUser(temAtivo);

                const term = debouncedSearch.toLowerCase();
                const filtered = contratosData.filter(c => {
                    const aptNum = c.apartamento?.numero?.toString() || '';
                    const status = c.status?.toLowerCase() || '';
                    return aptNum.includes(term) || status.includes(term);
                });

                setTotalPages(Math.max(1, Math.ceil(filtered.length / itemsPerPage)));
                const start = (page - 1) * itemsPerPage;
                setContratos(filtered.slice(start, start + itemsPerPage));
            }
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin, page, debouncedSearch, filterType]);

    useEffect(() => {
        // Só tenta buscar se o usuário tiver ID (estiver logado).
        // Se não tiver token ainda, NÃO mata o loading, espera o Redux atualizar.
        if (user && user.id) {
            fetchData();
        }
        // Se o user for null, o loading continua true (renderizado no if abaixo)
    }, [user, fetchData]);

    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1);
        setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    // Se não tem user ainda, mostra loading para não quebrar a tela
    if (!user) {
        return (
            <LoadingContainer>
                <ThreeDots color={'#4e4e4e'} height={49} width={100} />
            </LoadingContainer>
        );
    }

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
                <MainContratoContainer>
                    <HeaderContratoContainer>
                        <HeaderTitle>Contratos</HeaderTitle>

                        {(isAdmin || (!isAdmin && !contratoAtivoUser)) && (
                            <AddContratoHeaderButton onClick={() => navigate('/contratos/novo')}>
                                <FaPlus color='green' />
                                <AddButtonText>
                                    {isAdmin ? 'Adicionar Novo' : 'Nova Solicitação'}
                                </AddButtonText>
                            </AddContratoHeaderButton>
                        )}
                    </HeaderContratoContainer>

                    {/* CORREÇÃO: Verificação robusta de Admin para exibir os Cards */}
                    {isAdmin && (
                        <ContratoCardsContainer>
                            <Card
                                onClick={() => handleCardClick('ATIVOS')}
                                className={filterType === 'ATIVOS' ? 'active' : ''}
                            >
                                <CardTitle>Contratos Ativos</CardTitle>
                                <CardIconContainer>
                                    <FaFileContract />
                                    <ContratoCounter>{contratosCounts.ativos}</ContratoCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('SOLICITACOES')}
                                className={filterType === 'SOLICITACOES' ? 'active' : ''}
                            >
                                <CardTitle>Solicitações</CardTitle>
                                <CardIconContainer>
                                    <FaFileImport />
                                    <ContratoCounter>{contratosCounts.solicitacoes}</ContratoCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('TOTAL')}
                                className={filterType === 'TOTAL' ? 'active' : ''}
                            >
                                <CardTitle>Histórico Total</CardTitle>
                                <CardIconContainer>
                                    <FaDatabase />
                                    <ContratoCounter>{contratosCounts.total}</ContratoCounter>
                                </CardIconContainer>
                            </Card>
                        </ContratoCardsContainer>
                    )}

                    <div ref={listRef}></div>

                    <ContentContratoContainer>
                        <ContentContratoHeader>
                            <ContratoCounter>
                                {filterType === 'ATIVOS' && 'Listando Ativos'}
                                {filterType === 'SOLICITACOES' && 'Listando Solicitações'}
                                {filterType === 'TOTAL' && 'Todos os Contratos'}
                            </ContratoCounter>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar..." />
                            </SearcherContainer>
                        </ContentContratoHeader>

                        {contratos.length === 0 ? (
                            <NoContentContainer>
                                <FaHandshake color='#6c757d' fontSize={80} style={{ marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum contrato encontrado nesta categoria.</TextContent>
                                    {(!isAdmin && !contratoAtivoUser) && (
                                        <AdicionarContratoButton onClick={() => navigate('/contratos/novo')}>
                                            <FaPlus color='#fff' style={{ marginRight: 5 }} /> Nova Solicitação
                                        </AdicionarContratoButton>
                                    )}
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ContractList
                                contratos={contratos}
                                user={user}
                                refreshData={fetchData}
                                navigate={navigate}
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                            />
                        )}
                    </ContentContratoContainer>
                </MainContratoContainer>
            )}

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ContractPage);
