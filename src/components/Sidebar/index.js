import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate aqui
import {
    Header,
    TitleContainer,
    Avatar,
    Title,
    Menu,
    MenuItem,
    ItemTitle,
    SubTitle,
    LogoutContainer,
    LogoutTitle,
    ImgBackCircle,
    IconTitleContainer,
    IconItemContainer,
} from './sidebar.styles';

import {
    FaHome,
    FaHotel,
    FaDoorOpen,
    FaMoneyBillWave,
    FaPowerOff,
    FaRegHandshake,
    FaTimes,
    FaUser,
    FaUsers,
    FaKey
} from 'react-icons/fa';

import logo from '../../assets/favicon.png';

// Removemos 'navigate' das props recebidas
const Sidebar = ({ user, sidebarOpen, closeSidebar, logoutUser }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook instanciado diretamente aqui
    const currentPath = location.pathname;

    const isActive = (path) => currentPath.startsWith(path) ? 'active-menu-item' : '';

    const handleNavigate = (path) => {
        navigate(path); // Agora funciona garantido
        if (window.innerWidth <= 978) {
            closeSidebar();
        }
    };

    return (
        <div className={sidebarOpen ? 'sidebar-responsive' : ""} id='sidebar'>
            <Header>
                <TitleContainer>
                    <ImgBackCircle>
                        <Avatar src={logo} alt='logo' />
                    </ImgBackCircle>
                    <Title>FlatFersa</Title>
                </TitleContainer>
                <IconTitleContainer>
                    <FaTimes onClick={() => closeSidebar()} id='sidebarIcon' aria-hidden='true' />
                </IconTitleContainer>
            </Header>

            <Menu>
                <MenuItem onClick={() => handleNavigate('/dashboard')} className={isActive('/dashboard')}>
                    <IconItemContainer><FaHome /></IconItemContainer>
                    <ItemTitle>Visão Geral</ItemTitle>
                </MenuItem>

                {user?.role === 'ADMIN' && (
                    <>
                        <SubTitle>GESTÃO</SubTitle>

                        <MenuItem onClick={() => handleNavigate('/predios')} className={isActive('/predios')}>
                            <IconItemContainer><FaHotel /></IconItemContainer>
                            <ItemTitle>Prédios</ItemTitle>
                        </MenuItem>

                        <MenuItem onClick={() => handleNavigate('/apartamentos')} className={isActive('/apartamentos')}>
                            <IconItemContainer><FaDoorOpen /></IconItemContainer>
                            <ItemTitle>Apartamentos</ItemTitle>
                        </MenuItem>

                        <MenuItem onClick={() => handleNavigate('/clientes')} className={isActive('/clientes')}>
                            <IconItemContainer><FaUsers /></IconItemContainer>
                            <ItemTitle>Clientes</ItemTitle>
                        </MenuItem>

                        <MenuItem onClick={() => handleNavigate('/contratos')} className={isActive('/contratos')}>
                            <IconItemContainer><FaKey /></IconItemContainer>
                            <ItemTitle>Contratos</ItemTitle>
                        </MenuItem>

                        <MenuItem onClick={() => handleNavigate('/financeiro')} className={isActive('/financeiro')}>
                            <IconItemContainer><FaMoneyBillWave /></IconItemContainer>
                            <ItemTitle>Financeiro</ItemTitle>
                        </MenuItem>
                    </>
                )}

                {user?.role !== 'ADMIN' && (
                    <>
                        <SubTitle>MEUS PAGAMENTOS</SubTitle>
                        <MenuItem onClick={() => handleNavigate('/meus-pagamentos')} className={isActive('/meus-pagamentos')}>
                            <IconItemContainer><FaMoneyBillWave /></IconItemContainer>
                            <ItemTitle>Faturas</ItemTitle>
                        </MenuItem>

                        <MenuItem onClick={() => handleNavigate('/meu-contrato')} className={isActive('/meu-contrato')}>
                            <IconItemContainer><FaRegHandshake /></IconItemContainer>
                            <ItemTitle>Meu Contrato</ItemTitle>
                        </MenuItem>
                    </>
                )}

                <SubTitle>CONTA</SubTitle>

                <MenuItem onClick={() => handleNavigate('/perfil')} className={isActive('/perfil')}>
                    <IconItemContainer><FaUser /></IconItemContainer>
                    <ItemTitle>Meu Perfil</ItemTitle>
                </MenuItem>

                <LogoutContainer onClick={() => logoutUser(navigate)}>
                    <IconItemContainer><FaPowerOff /></IconItemContainer>
                    <LogoutTitle>Sair do Sistema</LogoutTitle>
                </LogoutContainer>
            </Menu>
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(Sidebar);