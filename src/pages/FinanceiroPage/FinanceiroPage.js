import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaCheck, FaCoins, FaHourglassHalf, FaSearch, FaTimes, FaMoneyBillWave } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";
import ParcelaList from "./ParcelaList";

import { logoutUser } from '../../services/userService';
import { getParcelas } from "../../services/financeiroService";

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
    const fetchData = async () => {
        setLoading(true);
        try {
            const isAdmin = user.role === 'ADMIN' || user.isAdmin === true;
            const data = await getParcelas(isAdmin);
            setAllParcelas(data || []);
        } catch (error) {
            console.error("Erro ao carregar parcelas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchData();
        }
    }, [user]);

    // Calcular contadores (Memoizado para performance)
    const counts = React.useMemo(() => {
        return {
            total: allParcelas.length,
            pagos: allParcelas.filter(p => p.statusPagamento === 'PAGO').length,
            pendentes: allParcelas.filter(p => p.statusPagamento === 'PENDENTE').length,
            atrasados: allParcelas.filter(p => p.statusPagamento === 'ATRASADO').length,
            aguardando: allParcelas.filter(p => p.statusPagamento === 'AGUARDANDO').length,
        };
    }, [allParcelas]);

    // Filtrar lista baseada no card + busca
    const filteredList = React.useMemo(() => {
        let list = allParcelas;

        // 1. Filtro do Card
        if (filterType !== 'TOTAL') {
            list = list.filter(p => p.statusPagamento === filterType);
        }

        // 2. Filtro de Busca
        if (search) {
            const term = search.toLowerCase();
            list = list.filter(p =>
                p.Contract?.cliente?.name?.toLowerCase().includes(term) || // Nome Cliente
                p.dataVencimento?.toLowerCase().includes(term) ||          // Data
                p.statusPagamento?.toLowerCase().includes(term)            // Status
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

    const isAdmin = user.role === 'ADMIN' || user.isAdmin === true;

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
                                    onClick={() => handleCardClick('AGUARDANDO')}
                                    className={filterType === 'AGUARDANDO' ? 'active' : ''}
                                >
                                    <CardTitle>Aguardando</CardTitle>
                                    <CardIconContainer>
                                        <FaSearch />
                                        <FinanceiroCounter>{counts.aguardando}</FinanceiroCounter>
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