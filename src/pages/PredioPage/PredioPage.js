import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../../services/userService';
import {
    MainPredioContainer,
} from './PredioPage.styles';

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PredioPage = () => {
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
            <MainPredioContainer>
                <h1>Predios</h1>
            </MainPredioContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default PredioPage;