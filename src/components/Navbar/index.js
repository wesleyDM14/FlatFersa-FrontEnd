import React, { useState } from 'react';
// 1. Importe o hook
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaPowerOff, FaUserCog } from 'react-icons/fa';
import {
    NavbarContainer,
    NavbarShowIcon,
    LeftContainer,
    NavbarIten,
    RightContainer,
    NavbarAvatar,
    DropDownMenu,
    DropDownItem,
    NavbarMenuContainer,
    Pinguelo,
} from './Navbar.styles';

import defaultAvatar from '../../assets/user.png';

// 2. Remova 'navigate' das props recebidas
const Navbar = ({ openSidebar, logout, user }) => {

    // 3. Instancie o hook aqui dentro
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const userImage = user?.photoUrl || defaultAvatar;

    return (
        <NavbarContainer>
            <NavbarShowIcon onClick={() => openSidebar()}>
                <FaBars />
            </NavbarShowIcon>

            <LeftContainer>
                <NavbarIten to={'/dashboard'}>
                    <FaHome style={{ marginRight: '8px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Dashboard</span>
                </NavbarIten>
            </LeftContainer>

            <RightContainer>
                <NavbarMenuContainer>
                    <span style={{ marginRight: '10px', fontSize: '14px', color: '#555', fontWeight: '600' }}>
                        {user?.name?.split(' ')[0] || 'Usuário'}
                    </span>

                    <NavbarAvatar
                        $image={userImage}
                        onClick={() => setOpen(!open)}
                    />

                    {open && (
                        <DropDownMenu>
                            <Pinguelo />
                            <DropDownItem onClick={() => { setOpen(false); navigate('/perfil'); }}>
                                <FaUserCog style={{ marginRight: '8px' }} /> Perfil
                            </DropDownItem>

                            {/* O logout vem do pai (DashboardPage), então apenas chamamos a função */}
                            <DropDownItem
                                onClick={() => { setOpen(false); logout(); }}
                                color='#e65061'
                            >
                                <FaPowerOff style={{ marginRight: '8px' }} /> Sair
                            </DropDownItem>
                        </DropDownMenu>
                    )}
                </NavbarMenuContainer>
            </RightContainer>
        </NavbarContainer>
    )
}

export default Navbar;