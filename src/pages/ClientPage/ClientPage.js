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
    ClientCounter,
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
import { FaPlus, FaUsers } from "react-icons/fa";
import { getClientes } from "../../services/clientService";
import { ThreeDots } from "react-loader-spinner";
import ClientList from "./ClientList";

const ClientPage = ({ user }) => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);
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
        if (loading && user.accessToken) {
            getClientes(user, setClientes, setLoading);
        }
    }, [user, loading]);

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
                            <ContentClientContainer>
                                <ContentClientHeader>
                                    <ClientCounter>Clientes ({clientes.length})</ClientCounter>
                                    <SearcherContainer>
                                        <SearchBar search={search} setSearch={setSearch} />
                                    </SearcherContainer>
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
                                        <ClientList
                                            clientes={clientes}
                                            user={user}
                                            navigate={navigate}
                                            setLoading={setLoading}
                                            search={search}
                                            page={page}
                                            setPage={setPage}
                                            itemsPerPage={itemsPerPage}
                                        />
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