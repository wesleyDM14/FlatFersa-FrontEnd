import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaCheck, FaCoins, FaHourglassHalf, FaSearch, FaTimes, FaMoneyBillWave } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";
import ParcelaList from "./ParcelaList";

import { logoutUser } from '../../services/userService';
import { getFaturas } from "../../services/financeiroService";

import {
    MainFinanceiroContainer,
    HeaderFinanceiroContainer,
    HeaderTitle,
    ContentFinanceiroContainer,
    FinanceiroCounter,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    LoadingContainer,
    CardsContainer,
    Card,
    CardTitle,
    CardIconContainer,
    ContentFinanceiroHeader,
    SearcherContainer,
} from './FinanceiroPage.styles';

const FinanceiroPage = ({ user }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Dados brutos
    const [allParcelas, setAllParcelas] = useState([]);

    // Filtro ativo: 'TOTAL', 'PAGO', 'PENDENTE', 'ATRASADO', 'AGUARDANDO'
    const [filterType, setFilterType] = useState('TOTAL');

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => logoutUser(navigate);

    // Carrega dados
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const isAdmin = user.role === 'ADMIN';
            const data = await getFaturas(isAdmin);
            setAllParcelas(data || []);
        } catch (error) {
            console.error("Erro ao carregar faturas", error);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (user && user.id) {
            fetchData();
        }
    }, [user, fetchData]);

    // Calcular contadores (Memoizado para performance)
    const counts = React.useMemo(() => {
        return {
            total: allParcelas.length,
            pagos: allParcelas.filter(p => p.status === 'PAGO').length,
            pendentes: allParcelas.filter(p => p.status === 'PENDENTE').length,
            atrasados: allParcelas.filter(p => p.status === 'ATRASADO').length,
            emAnalise: allParcelas.filter(p => p.status === 'EM_ANALISE').length,
        };
    }, [allParcelas]);

    // Filtrar lista baseada no card + busca
    const filteredList = React.useMemo(() => {
        let list = allParcelas;

        // 1. Filtro do Card
        if (filterType !== 'TOTAL') {
            list = list.filter(p => p.status === filterType);
        }

        // 2. Filtro de Busca
        if (search) {
            const term = search.toLowerCase();
            list = list.filter(p =>
                p.contrato?.cliente?.nome?.toLowerCase().includes(term) ||
                new Date(p.dataVencimento).toLocaleDateString('pt-BR').includes(term) ||
                p.status?.toLowerCase().includes(term)
            );
        }

        return list;
    }, [allParcelas, filterType, search]);

    // Handle clique no card (com scroll)
    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1);
        setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    if (!user) return <LoadingContainer><ThreeDots color="#4e4e4e" /></LoadingContainer>;

    const isAdmin = user.role === 'ADMIN';

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading ? (
                <LoadingContainer><ThreeDots color={'#4e4e4e'} height={49} width={100} /></LoadingContainer>
            ) : (
                <MainFinanceiroContainer>
                    <HeaderFinanceiroContainer>
                        <HeaderTitle>Financeiro / Alugueis</HeaderTitle>

                        {/* Cards de Filtro */}
                        <CardsContainer>
                            <Card
                                onClick={() => handleCardClick('PAGO')}
                                className={filterType === 'PAGO' ? 'active' : ''}
                            >
                                <CardTitle>Pagos</CardTitle>
                                <CardIconContainer>
                                    <FaCheck />
                                    <FinanceiroCounter>{counts.pagos}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('PENDENTE')}
                                className={filterType === 'PENDENTE' ? 'active' : ''}
                            >
                                <CardTitle>Pendentes</CardTitle>
                                <CardIconContainer>
                                    <FaHourglassHalf />
                                    <FinanceiroCounter>{counts.pendentes}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('ATRASADO')}
                                className={filterType === 'ATRASADO' ? 'active' : ''}
                            >
                                <CardTitle>Atrasados</CardTitle>
                                <CardIconContainer>
                                    <FaTimes />
                                    <FinanceiroCounter>{counts.atrasados}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>

                            {isAdmin && (
                                <Card
                                    onClick={() => handleCardClick('EM_ANALISE')}
                                    className={filterType === 'EM_ANALISE' ? 'active' : ''}
                                >
                                    <CardTitle>Em Análise</CardTitle>
                                    <CardIconContainer>
                                        <FaSearch />
                                        <FinanceiroCounter>{counts.emAnalise}</FinanceiroCounter>
                                    </CardIconContainer>
                                </Card>
                            )}

                            <Card
                                onClick={() => handleCardClick('TOTAL')}
                                className={filterType === 'TOTAL' ? 'active' : ''}
                            >
                                <CardTitle>Total</CardTitle>
                                <CardIconContainer>
                                    <FaCoins />
                                    <FinanceiroCounter>{counts.total}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>
                        </CardsContainer>
                    </HeaderFinanceiroContainer>

                    {/* Âncora de Scroll */}
                    <div ref={listRef}></div>

                    <ContentFinanceiroContainer>
                        <ContentFinanceiroHeader>
                            <FinanceiroCounter>
                                {filterType === 'TOTAL' ? 'Todas as Faturas' : `Faturas ${filterType}`}
                            </FinanceiroCounter>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar por cliente ou vencimento..." />
                            </SearcherContainer>
                        </ContentFinanceiroHeader>

                        {filteredList.length === 0 ? (
                            <NoContentContainer>
                                <FaMoneyBillWave color='#6c757d' fontSize={80} style={{ marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhuma fatura encontrada.</TextContent>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ParcelaList
                                parcelas={filteredList}
                                isAdmin={isAdmin}
                                navigate={navigate}
                                page={page}
                                setPage={setPage}
                                itemsPerPage={itemsPerPage}
                            />
                        )}
                    </ContentFinanceiroContainer>
                </MainFinanceiroContainer>
            )}

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(FinanceiroPage);