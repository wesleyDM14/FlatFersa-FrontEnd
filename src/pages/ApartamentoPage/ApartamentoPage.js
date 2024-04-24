import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { logoutUser } from "../../services/userService";

import {
    AddApartamentoHeaderButton,
    AddButtonText,
    AdicionarApartamentoButton,
    ApartamentoCounter,
    ContentApartamentoContainer,
    ContentApartamentoHeader,
    HeaderApartamentoContainer,
    HeaderTitle,
    MainApartamentoContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
} from './ApartamentoPage.styles';
import { FaHouseUser, FaPlus } from "react-icons/fa";

const ApartamentoPage = () => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamentos, setApartamentos] = useState([]);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} apartamentoActive={true} />
            <MainApartamentoContainer>
                <HeaderApartamentoContainer>
                    <HeaderTitle>Apartamentos</HeaderTitle>
                    <AddApartamentoHeaderButton>
                        <FaPlus color='green' />
                        <AddButtonText>
                            Adicionar Novo
                        </AddButtonText>
                    </AddApartamentoHeaderButton>
                </HeaderApartamentoContainer>
                <ContentApartamentoContainer>
                    <ContentApartamentoHeader>
                        <ApartamentoCounter>Apartamentos ({apartamentos.length})</ApartamentoCounter>
                        <SearcherContainer>
                            {/*<TextSearcher />
                            <FilterSeacher />*/}
                        </SearcherContainer>
                    </ContentApartamentoHeader>
                    {
                        apartamentos.length === 0 ? (
                            <NoContentContainer>
                                <FaHouseUser color='#6c757d' fontSize={150} className='icon-responsive' />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum apartamento encontrado.</TextContent>
                                    <AdicionarApartamentoButton >
                                        <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Apartamento
                                    </AdicionarApartamentoButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <div></div>
                        )
                    }
                </ContentApartamentoContainer>
            </MainApartamentoContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default ApartamentoPage;