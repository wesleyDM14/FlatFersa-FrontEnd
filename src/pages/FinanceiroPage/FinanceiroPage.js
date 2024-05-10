import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import {
    MainFinanceiroContainer,
    HeaderFinanceiroContainer,
    HeaderTitle,
    ContentFinanceiroContainer,
    ContentFinanceiroHeader,
    FinanceiroCounter,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    LoadingContainer,
} from './FinanceiroPage.styles';

import { logoutUser } from '../../services/userService';
import { ThreeDots } from "react-loader-spinner";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { getParcelas } from "../../services/financeiroService";
import ParcelaList from "./ParcelaList";

const FianceiroPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [parcelas, setParcelas] = useState([]);
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function teste() {
            if (loading) {
                await getParcelas(user, setParcelas, setLoading);
            }
        }
        teste();
    }, [user, loading]);

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} financeiroActive={true} />
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
                    <MainFinanceiroContainer>
                        <HeaderFinanceiroContainer>
                            <HeaderTitle>Parcelas de Aluguel</HeaderTitle>
                        </HeaderFinanceiroContainer>
                        <ContentFinanceiroContainer>
                            <ContentFinanceiroHeader>
                                <FinanceiroCounter>Parcelas de Aluguel ({parcelas.length})</FinanceiroCounter>
                            </ContentFinanceiroHeader>
                            {
                                parcelas.length === 0 ? (
                                    <NoContentContainer>
                                        <FaMoneyBill1Wave color='#6c757d' fontSize={150} className='icon-responsive' />
                                        <NoContentAvisoContainer>
                                            <TextContent>Nenhuma parcela encontrada.</TextContent>
                                        </NoContentAvisoContainer>
                                    </NoContentContainer>
                                ) : (
                                    <ParcelaList parcelas={parcelas} user={user} navigate={navigate} setLoading={setLoading} />
                                )
                            }
                        </ContentFinanceiroContainer>
                    </MainFinanceiroContainer>
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(FianceiroPage);