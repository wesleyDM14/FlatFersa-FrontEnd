import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import { logoutUser } from '../../services/userService';

const ContractPage = () => {
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
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
            <h1>Contratos</h1>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default ContractPage;