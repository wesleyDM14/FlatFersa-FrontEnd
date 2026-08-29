import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ThreeDots } from "react-loader-spinner";

// Componentes de Layout Global
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Ação de Logout
import { logoutUser } from "../../services/userService";

// Estilos
import {
    MainContent,
    DashboardHeader,
    LoadingContainer
} from "./DashboardPage.styles";

// Componentes Filhos
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";

const DashboardPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return (
            <LoadingContainer>
                <ThreeDots color="#3b82f6" height={80} width={80} />
            </LoadingContainer>
        );
    }

    const handleLogout = () => {
        logoutUser(navigate);
    };

    return (
        <div className="container">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                navigate={navigate}
                logoutUser={handleLogout}
            />

            <MainContent>
                <DashboardHeader>
                    <div>
                        <h1>Olá, {user.name?.split(' ')[0] || 'Usuário'} 👋</h1>
                        <p>
                            {user.role === 'ADMIN'
                                ? 'Visão geral do seu negócio e faturamento.'
                                : 'Acompanhe suas faturas e consumo de energia.'}
                        </p>
                    </div>
                </DashboardHeader>

                {user.role === 'ADMIN' ? (
                    <AdminDashboard />
                ) : (
                    <ClientDashboard />
                )}

            </MainContent>

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(DashboardPage);