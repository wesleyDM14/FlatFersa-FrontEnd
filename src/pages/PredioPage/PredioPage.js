import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../services/userService';
import {
    MainPredioContainer,
    HeaderPredioContainer,
    HeaderTitle,
    AddPredioHeaderButton,
    AddButtonText,
    ContentPredioContainer,
    ContentPredioHeader,
    PredioCounter,
    SearcherContainer,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    AdicionarPredioButton
} from './PredioPage.styles';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaBuilding, FaPlus } from 'react-icons/fa';

const PredioPage = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} predioActive={true} />
            <MainPredioContainer>
                <HeaderPredioContainer>
                    <HeaderTitle>Prédios</HeaderTitle>
                    <AddPredioHeaderButton onClick={() => navigate('/predios/novo')}>
                        <FaPlus color='green' />
                        <AddButtonText>
                            Adicionar Novo
                        </AddButtonText>
                    </AddPredioHeaderButton>
                </HeaderPredioContainer>
                <ContentPredioContainer>
                    <ContentPredioHeader>
                        <PredioCounter>Prédios ({predios.length})</PredioCounter>
                        <SearcherContainer>
                            {/*<TextSearcher />
                            <FilterSeacher />*/}
                        </SearcherContainer>
                    </ContentPredioHeader>
                    {
                        predios.length === 0 ? (
                            <NoContentContainer>
                                <FaBuilding color='#6c757d' fontSize={150} className='icon-responsive' />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum prédio encontrado.</TextContent>
                                    <AdicionarPredioButton onClick={() => navigate('/predios/novo')}>
                                        <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Prédio
                                    </AdicionarPredioButton>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <div></div>
                        )
                    }
                </ContentPredioContainer>
            </MainPredioContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default PredioPage;