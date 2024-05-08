import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/userService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import LayoutPlanta from "../ApartamentoPage/LayoutPlanta";
import { MainDashboardContainer } from "./DashboardPage.styles";

const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} homeActive={true} />
            <MainDashboardContainer>
                <LayoutPlanta />
            </MainDashboardContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

export default Dashboard;