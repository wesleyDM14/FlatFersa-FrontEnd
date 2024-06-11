import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import { getUserInfo, logoutUser } from "../../services/userService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
    DashBoardHeaderContainer,
    HeaderTitle,
    LoadingContainer,
    MainDashboardContainer,
} from "./DashboardPage.styles";
import { ThreeDots } from "react-loader-spinner";
import EmConstrucaoPage from "../EmConstrucaoPage/EmConstrucaoPage";

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function loadInfos() {
            if (loading) {
                user.accessToken && await getUserInfo(user, setUserInfo, setLoading);
            }
        }
        loadInfos();
    }, [user, loading]);

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} homeActive={true} />
            {
                user.isAdmin ? (
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <MainDashboardContainer>
                            <EmConstrucaoPage />
                            {
                            /*<MainDashboardContainer>
                            <DashBoardHeaderContainer>
                                <HeaderTitle>Bem vindo {userInfo.name}</HeaderTitle>
                            </DashBoardHeaderContainer >

                            <div>
                                <h1>Avisos</h1>
                                <div>
                                    <p>Conteudo dos avisos</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Apartamentos</h1>
                                    <div>
                                        <p>Total</p>
                                        <p>Ocupados (x/y) %</p>
                                        <p>Vagos (x/y) %</p>
                                    </div>
                                </div>
                                <div>
                                    <h1>Receitas</h1>
                                    <div>
                                        <p>Total Mensal</p>
                                        <p>Multas</p>
                                        <p>Calções</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1>Layout dos Apartamentos</h1>
                            </div>
                        </MainDashboardContainer >
                        */}
                        </MainDashboardContainer>
                    )
                ) : (
                    <MainDashboardContainer>
                        <EmConstrucaoPage />
                    </MainDashboardContainer>
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(Dashboard);