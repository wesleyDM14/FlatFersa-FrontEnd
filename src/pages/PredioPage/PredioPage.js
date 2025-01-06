import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../services/userService';
import { getPredios } from '../../services/predioService';

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
    AdicionarPredioButton,
    LoadingContainer
} from './PredioPage.styles';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';

import { FaBuilding, FaPlus } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import PredioList from './PredioList';

const PredioPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predios, setPredios] = useState([]);
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
                    await getPredios(user, setPredios);
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
            await getPredios(user, setPredios);
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        user.isAdmin && (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} predioActive={true} />
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
                                        <SearchBar search={search} setSearch={setSearch} />
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
                                        <PredioList
                                            predios={predios}
                                            user={user}
                                            navigate={navigate}
                                            refreshData={refreshData}
                                            search={search}
                                            page={page}
                                            setPage={setPage}
                                            itemsPerPage={itemsPerPage}
                                        />
                                    )
                                }
                            </ContentPredioContainer>
                        </MainPredioContainer>
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

export default connect(mapStateToProps)(PredioPage);