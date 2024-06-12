import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";

import { logoutUser } from '../../services/userService';

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
import { FaDatabase, FaFileContract, FaFileImport, FaHandshake, FaPlus } from "react-icons/fa";
import { getContratos } from "../../services/contratoService";
import { ThreeDots } from "react-loader-spinner";
import ContractList from "./ContractList";

const ContractPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contratos, setContratos] = useState([]);
    const [contratosInfo, setContratosInfo] = useState([]);
    const [contratoAtivo, setContratoAtivo] = useState(false);

    const [ativos, setAtivos] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState(false);
    const [historico, setHistorico] = useState(false);

    const [contratosAtivos, setContratosAtivos] = useState([]);
    const [contratosSolicitacao, setContratosSolicitacao] = useState([]);

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
        async function teste() {
            if (loading) {
                user.accessToken && await getContratos(user, setContratos, setLoading, setContratoAtivo, setContratosInfo, setContratosAtivos, setContratosSolicitacao);
            }
        }
        teste();
    }, [user, loading]);

    return (
        user.isAdmin ? (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
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
                        <MainContratoContainer>
                            <ContratoCardsContainer>
                                <Card
                                    onClick={() => {
                                        setHistorico(false);
                                        setAtivos(!ativos);
                                        setSolicitacoes(false);
                                    }}
                                    className={ativos && 'active'}
                                >
                                    <CardTitle>Contratos Ativos</CardTitle>
                                    <CardIconContainer>
                                        <FaFileContract />
                                        <ContratoCounter>Contratos Ativos ({contratosAtivos.length})</ContratoCounter>
                                    </CardIconContainer>
                                </Card>
                                <Card
                                    onClick={() => {
                                        setHistorico(false);
                                        setAtivos(false);
                                        setSolicitacoes(!solicitacoes);
                                    }}
                                    className={solicitacoes && 'active'}
                                >
                                    <CardTitle>Solicitações</CardTitle>
                                    <CardIconContainer>
                                        <FaFileImport />
                                        <ContratoCounter>Solicitações ({contratosSolicitacao.length})</ContratoCounter>
                                    </CardIconContainer>
                                </Card>
                                <Card
                                    onClick={() => {
                                        setHistorico(!historico);
                                        setAtivos(false);
                                        setSolicitacoes(false);
                                    }}
                                    className={historico && 'active'}
                                >
                                    <CardTitle>Histórico</CardTitle>
                                    <CardIconContainer>
                                        <FaDatabase />
                                        <ContratoCounter>Contratos Totais ({contratosInfo.length})</ContratoCounter>
                                    </CardIconContainer>
                                </Card>
                            </ContratoCardsContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Contratos</HeaderTitle>
                                <AddContratoHeaderButton onClick={() => navigate('/contratos/novo')}>
                                    <FaPlus color='green' />
                                    <AddButtonText>
                                        Adicionar Novo
                                    </AddButtonText>
                                </AddContratoHeaderButton>
                            </HeaderContratoContainer>
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    {
                                        (ativos || solicitacoes || historico) && (
                                            <SearcherContainer>
                                                <SearchBar search={search} setSearch={setSearch} />
                                            </SearcherContainer>
                                        )
                                    }
                                </ContentContratoHeader>
                                {
                                    contratos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHandshake color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum contrato encontrado.</TextContent>
                                                <AdicionarContratoButton onClick={() => navigate('/contratos/novo')}>
                                                    <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Contrato
                                                </AdicionarContratoButton>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        historico ? (
                                            <ContractList
                                                user={user}
                                                contratos={contratosInfo}
                                                navigate={navigate}
                                                setLoading={setLoading}
                                                search={search}
                                                page={page}
                                                setPage={setPage}
                                                itemsPerPage={itemsPerPage}
                                            />
                                        ) :
                                            ativos ? (
                                                <ContractList
                                                    user={user}
                                                    contratos={contratosAtivos}
                                                    navigate={navigate}
                                                    setLoading={setLoading}
                                                    search={search}
                                                    page={page}
                                                    setPage={setPage}
                                                    itemsPerPage={itemsPerPage}
                                                />
                                            ) :
                                                solicitacoes ? (
                                                    <ContractList
                                                        user={user}
                                                        contratos={contratosSolicitacao}
                                                        navigate={navigate}
                                                        setLoading={setLoading}
                                                        search={search}
                                                        page={page}
                                                        setPage={setPage}
                                                        itemsPerPage={itemsPerPage}
                                                    />
                                                ) : <></>
                                    )
                                }
                            </ContentContratoContainer>
                        </MainContratoContainer>
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        ) : (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
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
                        <MainContratoContainer>
                            <HeaderContratoContainer>
                                <HeaderTitle>Contratos</HeaderTitle>
                                {
                                    !contratoAtivo && (
                                        <AddContratoHeaderButton onClick={() => {
                                            navigate('/contratos/novo');
                                        }}>
                                            <FaPlus color='green' />
                                            <AddButtonText>
                                                Nova Solicitação
                                            </AddButtonText>
                                        </AddContratoHeaderButton>
                                    )
                                }
                            </HeaderContratoContainer>
                            <ContentContratoContainer>
                                <ContentContratoHeader>
                                    <ContratoCounter>Contratos ({contratos.length})</ContratoCounter>
                                    <SearcherContainer>
                                        <SearcherContainer>
                                            <SearchBar search={search} setSearch={setSearch} />
                                        </SearcherContainer>
                                    </SearcherContainer>
                                </ContentContratoHeader>
                                {
                                    contratos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHandshake color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum contrato encontrado.</TextContent>
                                                {
                                                    !contratoAtivo && (
                                                        <AdicionarContratoButton onClick={() => navigate('/contratos/novo')}>
                                                            <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Nova Solicitação
                                                        </AdicionarContratoButton>
                                                    )
                                                }
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        <ContractList
                                            user={user}
                                            contratos={contratos}
                                            navigate={navigate}
                                            setLoading={setLoading}
                                            search={search}
                                            page={page}
                                            setPage={setPage}
                                            itemsPerPage={itemsPerPage}
                                        />
                                    )
                                }
                            </ContentContratoContainer>
                        </MainContratoContainer>
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

export default connect(mapStateToProps)(ContractPage);