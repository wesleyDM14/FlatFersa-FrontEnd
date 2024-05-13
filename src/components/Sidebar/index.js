import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    FaFile,
    FaHome,
    FaHotel,
    FaHouseUser,
    FaMoneyBillWave,
    FaPowerOff,
    FaRegHandshake,
    FaTimes,
    FaUser,
    FaUsers,
} from 'react-icons/fa';

import logo from '../../assets/favicon.png';

const Sidebar = ({ user, sidebarOpen, closeSidebar, navigate, logoutUser, homeActive, predioActive, apartamentoActive, clienteActive, contratoActive, financeiroActive, perfilActive, politicaActive }) => {
    const [home, setHome] = useState(false);
    const [predio, setPredio] = useState(false);
    const [apartamento, setApartamento] = useState(false);
    const [cliente, setCliente] = useState(false);
    const [contrato, setContrato] = useState(false);
    const [financeiro, setFinanceiro] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [politica, setPolitica] = useState(false);

    useEffect(() => {
        function activePageSet() {
            setHome(homeActive);
            setPredio(predioActive);
            setApartamento(apartamentoActive);
            setCliente(clienteActive);
            setContrato(contratoActive);
            setFinanceiro(financeiroActive);
            setPerfil(perfilActive);
            setPolitica(politicaActive);
        }
        activePageSet();
    }, []);

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
                <MenuItem onClick={() => navigate('/dashboard')} className={home && 'active-menu-item'}>
                    <IconItemContainer>
                        <FaHome />
                    </IconItemContainer>
                    <ItemTitle>Home</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA ADMINISTRATIVA</SubTitle>
                {
                    user.isAdmin && (
                        <MenuItem onClick={() => navigate('/predios')} className={predio && 'active-menu-item'}>
                            <IconItemContainer>
                                <FaHotel />
                            </IconItemContainer>
                            <ItemTitle>Prédio</ItemTitle>
                        </MenuItem>
                    )
                }
                {
                    user.isAdmin && (
                        <MenuItem onClick={() => navigate('/apartamentos')} className={apartamento && 'active-menu-item'}>
                            <IconItemContainer>
                                <FaHouseUser />
                            </IconItemContainer>
                            <ItemTitle>Apartamentos</ItemTitle>
                        </MenuItem>
                    )
                }
                {
                    user.isAdmin && (
                        <MenuItem onClick={() => navigate('/clientes')} className={cliente && 'active-menu-item'}>
                            <IconItemContainer>
                                <FaUsers />
                            </IconItemContainer>
                            <ItemTitle>Clientes</ItemTitle>
                        </MenuItem>
                    )
                }
                {
                    <MenuItem onClick={() => navigate('/contratos')} className={contrato && 'active-menu-item'}>
                        <IconItemContainer>
                            <FaRegHandshake />
                        </IconItemContainer>
                        <ItemTitle>Contratos</ItemTitle>
                    </MenuItem>
                }
                <MenuItem onClick={() => navigate('/financeiro')} className={financeiro && 'active-menu-item'}>
                    <IconItemContainer>
                        <FaMoneyBillWave />
                    </IconItemContainer>
                    <ItemTitle>Financeiro</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA PESSOAL</SubTitle>
                <MenuItem onClick={() => navigate('/perfil')} className={perfil && 'active-menu-item'}>
                    <IconItemContainer>
                        <FaUser />
                    </IconItemContainer>
                    <ItemTitle>Perfil</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/politica-privacidade')} className={politica && 'active-menu-item'}>
                    <IconItemContainer>
                        <FaFile />
                    </IconItemContainer>
                    <ItemTitle>Política de Privacidade</ItemTitle>
                </MenuItem>
                <LogoutContainer onClick={() => logoutUser(navigate)}>
                    <IconItemContainer>
                        <FaPowerOff />
                    </IconItemContainer>
                    <LogoutTitle>Logout</LogoutTitle>
                </LogoutContainer>
            </Menu>
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(Sidebar);