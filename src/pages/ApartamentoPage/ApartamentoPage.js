import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";

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
    LoadingContainer,
    MainApartamentoContainer,
    NoContentAvisoContainer,
    NoContentContainer,
    SearcherContainer,
    TextContent,
} from './ApartamentoPage.styles';
import { FaHouseUser, FaPlus } from "react-icons/fa";
import { getApartamentos, getApartamentosWithInfos } from "../../services/apartamentoService";
import { ThreeDots } from "react-loader-spinner";
import ApartamentoList from "./ApartamentoList";

const ApartamentoPage = ({ user }) => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamentos, setApartamentos] = useState([]);
    const [apartamentoInfos, setApartamentosInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
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
            getApartamentos(user, setApartamentos, setLoading);
        }
    }, [loading, user]);

    useEffect(() => {
        if (loading2 && user.accessToken) {
            getApartamentosWithInfos(user, setApartamentosInfo, setLoading2);
        }
    }, [loading2, user]);

    return (
        user.isAdmin && (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} apartamentoActive={true} />
                {
                    loading && loading2 ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <MainApartamentoContainer>
                            <HeaderApartamentoContainer>
                                <HeaderTitle>Apartamentos</HeaderTitle>
                                <AddApartamentoHeaderButton onClick={() => navigate('/apartamentos/novo')}>
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
                                        <SearchBar search={search} setSearch={setSearch} />
                                    </SearcherContainer>
                                </ContentApartamentoHeader>
                                {
                                    apartamentos.length === 0 ? (
                                        <NoContentContainer>
                                            <FaHouseUser color='#6c757d' fontSize={150} className='icon-responsive' />
                                            <NoContentAvisoContainer>
                                                <TextContent>Nenhum apartamento encontrado.</TextContent>
                                                <AdicionarApartamentoButton onClick={() => navigate('/apartamentos/novo')}>
                                                    <FaPlus color='#fff' fontSize={15} className="icon-add-button" /> Novo Apartamento
                                                </AdicionarApartamentoButton>
                                            </NoContentAvisoContainer>
                                        </NoContentContainer>
                                    ) : (
                                        <ApartamentoList
                                            apartamentos={apartamentoInfos}
                                            user={user}
                                            setLoading={setLoading}
                                            setLoading2={setLoading2}
                                            navigate={navigate}
                                            search={search}
                                            page={page}
                                            setPage={setPage}
                                            itemsPerPage={itemsPerPage}
                                        />
                                    )
                                }
                            </ContentApartamentoContainer>
                        </MainApartamentoContainer>
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

export default connect(mapStateToProps)(ApartamentoPage);