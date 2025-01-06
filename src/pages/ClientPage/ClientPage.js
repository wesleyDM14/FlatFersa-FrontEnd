import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";

import { logoutUser } from "../../services/userService";
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
import { FaDatabase, FaPlus, FaUserCheck, FaUserEdit, FaUsers } from "react-icons/fa";
import { getClientes } from "../../services/clientService";
import { ThreeDots } from "react-loader-spinner";
import ClientList from "./ClientList";

const ClientPage = ({ user }) => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [ativos, setAtivos] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState(false);
    const [total, setTotal] = useState(false);
    const [clientesAtivos, setClientesAtivos] = useState([]);
    const [clientesSolicitacao, setClientesSolicitacao] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (user.accessToken) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    await getClientes(user, setClientes, setClientesSolicitacao, setClientesAtivos);
                } catch (error) {
                    console.error("Error loading data", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    const refreshData = async () => {
        setLoading(true);
        try {
            await getClientes(user, setClientes, setClientesSolicitacao, setClientesAtivos);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        user.isAdmin && (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} clienteActive={true} />
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <MainClientContainer>
                            <HeaderClientContainer>
                                <HeaderTitle>Clientes</HeaderTitle>
                                <AddClientHeaderButton onClick={() => navigate('/clientes/novo')}>
                                    <FaPlus color='green' />
                                    <AddButtonText>
                                        Adicionar Novo
                                    </AddButtonText>
                                </AddClientHeaderButton>
                            </HeaderClientContainer>
                            <ClienteCardsContainer>
                                <Card
                                    onClick={() => {
                                        setTotal(false);
                                        setAtivos(!ativos);
                                        setSolicitacoes(false);
                                    }}
                                    className={ativos && 'active'}
                                >
                                    <CardTitle>Clientes Ativos</CardTitle>
                                    <CardIconContainer>
                                        <FaUserCheck />
                                        <ClientCounter>Clientes Ativos ({clientesAtivos.length})</ClientCounter>
                                    </CardIconContainer>
                                </Card>
                                <Card
                                    onClick={() => {
                                        setTotal(false);
                                        setAtivos(false);
                                        setSolicitacoes(!solicitacoes);
                                    }}
                                    className={solicitacoes && 'active'}
                                >
                                    <CardTitle>Solicitações</CardTitle>
                                    <CardIconContainer>
                                        <FaUserEdit />
                                        <ClientCounter>Solicitações ({clientesSolicitacao.length})</ClientCounter>
                                    </CardIconContainer>
                                </Card>
                                <Card
                                    onClick={() => {
                                        setTotal(!total);
                                        setAtivos(false);
                                        setSolicitacoes(false);
                                    }}
                                    className={total && 'active'}
                                >
                                    <CardTitle>Total</CardTitle>
                                    <CardIconContainer>
                                        <FaDatabase />
                                        <ClientCounter>Clientes Totais ({clientes.length})</ClientCounter>
                                    </CardIconContainer>
                                </Card>
                            </ClienteCardsContainer>
                            <ContentClientContainer>
                                <ContentClientHeader>
                                    {
                                        (total || ativos || solicitacoes) && (
                                            <SearcherContainer>
                                                <SearchBar search={search} setSearch={setSearch} />
                                            </SearcherContainer>
                                        )
                                    }
                                </ContentClientHeader>
                                {
                                    clientes.length === 0 ? (
                                        <NoContentContainer>
                                            <FaUsers color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum cliente encontrado.</TextContent>
                                                <AdicionarClientButton onClick={() => navigate('/clientes/novo')}>
                                                    <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Cliente
                                                </AdicionarClientButton>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        total ? (
                                            <ClientList
                                                clientes={clientes}
                                                user={user}
                                                navigate={navigate}
                                                refreshData={refreshData}
                                                search={search}
                                                page={page}
                                                setPage={setPage}
                                                itemsPerPage={itemsPerPage}
                                            />
                                        ) :
                                            ativos ? (
                                                <ClientList
                                                    clientes={clientesAtivos}
                                                    user={user}
                                                    navigate={navigate}
                                                    refreshData={refreshData}
                                                    search={search}
                                                    page={page}
                                                    setPage={setPage}
                                                    itemsPerPage={itemsPerPage}
                                                />
                                            ) :
                                                solicitacoes ? (
                                                    <ClientList
                                                        clientes={clientesSolicitacao}
                                                        user={user}
                                                        navigate={navigate}
                                                        refreshData={refreshData}
                                                        search={search}
                                                        page={page}
                                                        setPage={setPage}
                                                        itemsPerPage={itemsPerPage}
                                                    />
                                                ) : <></>
                                    )
                                }
                            </ContentClientContainer>
                        </MainClientContainer>
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        )
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ClientPage);