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
import { getFaturas, getFaturasCounts } from "../../services/financeiroService";

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

    // Página atual de parcelas, já vinda pronta do backend (ou calculada no service para cliente)
    const [parcelas, setParcelas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [counts, setCounts] = useState({ pago: 0, pendente: 0, atrasado: 0, emAnalise: 0, total: 0 });

    // Filtro ativo: 'TOTAL', 'PAGO', 'PENDENTE', 'ATRASADO', 'EM_ANALISE'
    const [filterType, setFilterType] = useState('TOTAL');

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => logoutUser(navigate);

    const isAdmin = user?.role === 'ADMIN';

    // Debounce da busca (~400ms)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Reseta a página sempre que busca ou filtro de status mudar
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filterType]);

    // Carrega dados
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const status = filterType === 'TOTAL' ? '' : filterType;
            const [data, countsData] = await Promise.all([
                getFaturas(isAdmin, { page, limit: itemsPerPage, search: debouncedSearch, status }),
                getFaturasCounts(isAdmin)
            ]);
            setParcelas(data.items || []);
            setTotalPages(data.totalPages || 1);
            setCounts(countsData || { pago: 0, pendente: 0, atrasado: 0, emAnalise: 0, total: 0 });
        } catch (error) {
            console.error("Erro ao carregar faturas", error);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin, page, debouncedSearch, filterType]);

    useEffect(() => {
        if (user && user.id) {
            fetchData();
        }
    }, [user, fetchData]);

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
                                    <FinanceiroCounter>{counts.pago}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('PENDENTE')}
                                className={filterType === 'PENDENTE' ? 'active' : ''}
                            >
                                <CardTitle>Pendentes</CardTitle>
                                <CardIconContainer>
                                    <FaHourglassHalf />
                                    <FinanceiroCounter>{counts.pendente}</FinanceiroCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('ATRASADO')}
                                className={filterType === 'ATRASADO' ? 'active' : ''}
                            >
                                <CardTitle>Atrasados</CardTitle>
                                <CardIconContainer>
                                    <FaTimes />
                                    <FinanceiroCounter>{counts.atrasado}</FinanceiroCounter>
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

                        {parcelas.length === 0 ? (
                            <NoContentContainer>
                                <FaMoneyBillWave color='#6c757d' fontSize={80} style={{ marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhuma fatura encontrada.</TextContent>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ParcelaList
                                parcelas={parcelas}
                                isAdmin={isAdmin}
                                navigate={navigate}
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
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
