import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
    MainClientContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
} from "./ClientPage.styles";
import { FaPlus, FaUsers } from "react-icons/fa";

const ClientPage = () => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} clienteActive={true} />
            <MainClientContainer>
                <HeaderClientContainer>
                    <HeaderTitle>Clientes</HeaderTitle>
                    <AddClientHeaderButton>
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
                            {/*<TextSearcher />
                            <FilterSeacher />*/}
                        </SearcherContainer>
                    </ContentClientHeader>
                    {
                        clientes.length === 0 ? (
                            <NoContentContainer>
                                <FaUsers color='#6c757d' fontSize={150} className='icon-responsive' />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum cliente encontrado.</TextContent>
                                    <AdicionarClientButton >
                                        <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Cliente
                                    </AdicionarClientButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <div></div>
                        )
                    }
                </ContentClientContainer>
            </MainClientContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default ClientPage;