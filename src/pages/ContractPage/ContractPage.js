import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

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
} from "./ContractPage.styles";
import { FaHandshake, FaPlus } from "react-icons/fa";

const ContractPage = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contratos, setContratos] = useState([]);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} contratoActive={true} />
            <MainContratoContainer>
                <HeaderContratoContainer>
                    <HeaderTitle>Contratos</HeaderTitle>
                    <AddContratoHeaderButton>
                        <FaPlus color='green' />
                        <AddButtonText>
                            Adicionar Novo
                        </AddButtonText>
                    </AddContratoHeaderButton>
                </HeaderContratoContainer>
                <ContentContratoContainer>
                    <ContentContratoHeader>
                        <ContratoCounter>Contratos ({contratos.length})</ContratoCounter>
                        <SearcherContainer>
                            {/*<TextSearcher />
                            <FilterSeacher />*/}
                        </SearcherContainer>
                    </ContentContratoHeader>
                    {
                        contratos.length === 0 ? (
                            <NoContentContainer>
                                <FaHandshake color='#6c757d' fontSize={150} className='icon-responsive' />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum contrato encontrado.</TextContent>
                                    <AdicionarContratoButton >
                                        <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Contrato
                                    </AdicionarContratoButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <div></div>
                        )
                    }
                </ContentContratoContainer>
            </MainContratoContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default ContractPage;