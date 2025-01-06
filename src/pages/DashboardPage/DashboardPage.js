import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import { logoutUser } from "../../services/userService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
    LoadingContainer,
    MainDashboardContainer,
} from "./DashboardPage.styles";
import { ThreeDots } from "react-loader-spinner";
import EmConstrucaoPage from "../EmConstrucaoPage/EmConstrucaoPage";

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (user.accessToken) {
            setLoading(false);
        }
    }, [user]);

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