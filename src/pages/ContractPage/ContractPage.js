import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";
import { FaDatabase, FaFileContract, FaFileImport, FaHandshake, FaPlus } from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";
import ContractList from "./ContractList";

import { logoutUser } from '../../services/userService';
import { getContratos } from "../../services/contratoService";

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

const ContractPage = ({ user }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contratos, setContratos] = useState([]);

    // Filtros
    const [filterType, setFilterType] = useState('TOTAL');

    const [contratosAtivos, setContratosAtivos] = useState([]);
    const [contratosSolicitacao, setContratosSolicitacao] = useState([]);
    const [contratoAtivoUser, setContratoAtivoUser] = useState(false);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const handleLogout = () => logoutUser(navigate);

    // Helper para verificar se é admin com segurança
    const isAdmin = user && (user.role === 'ADMIN' || user.isAdmin === true);

    const fetchData = async () => {
        // Não reseta o loading para true aqui para evitar flicker se já estiver carregando
        try {
            console.log("Buscando contratos...");
            await getContratos(
                setContratos,
                setContratoAtivoUser,
                setContratosAtivos,
                setContratosSolicitacao,
                null, // Não passamos setLoading aqui
                isAdmin // Passa a flag de admin calculada
            );
        } catch (error) {
            console.error("Erro ao buscar contratos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // CORREÇÃO CRÍTICA: 
        // Só tenta buscar se o usuário tiver ID (estiver logado).
        // Se não tiver token ainda, NÃO mata o loading, espera o Redux atualizar.
        if (user && user.id) {
            fetchData();
        }
        // Se o user for null, o loading continua true (renderizado no if abaixo)
    }, [user]);

    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1);
        setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const getCurrentList = () => {
        switch (filterType) {
            case 'ATIVOS': return contratosAtivos;
            case 'SOLICITACOES': return contratosSolicitacao;
            default: return contratos;
        }
    };

    const currentList = getCurrentList();

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
                                    <ContratoCounter>{contratosAtivos.length}</ContratoCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('SOLICITACOES')}
                                className={filterType === 'SOLICITACOES' ? 'active' : ''}
                            >
                                <CardTitle>Solicitações</CardTitle>
                                <CardIconContainer>
                                    <FaFileImport />
                                    <ContratoCounter>{contratosSolicitacao.length}</ContratoCounter>
                                </CardIconContainer>
                            </Card>

                            <Card
                                onClick={() => handleCardClick('TOTAL')}
                                className={filterType === 'TOTAL' ? 'active' : ''}
                            >
                                <CardTitle>Histórico Total</CardTitle>
                                <CardIconContainer>
                                    <FaDatabase />
                                    <ContratoCounter>{contratos.length}</ContratoCounter>
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

                        {currentList.length === 0 ? (
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
                                contratos={currentList}
                                user={user}
                                setLoading={setLoading}
                                navigate={navigate}
                                search={search}
                                page={page}
                                setPage={setPage}
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