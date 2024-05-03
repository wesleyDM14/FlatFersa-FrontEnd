import React, { useState } from 'react';
import { FaBars, FaHome, FaPowerOff } from 'react-icons/fa';
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

import user from '../../assets/user.png';

const Navbar = ({ openSidebar, logout, navigate }) => {

    const [open, setOpen] = useState(false);

    return (
        <NavbarContainer>
            <NavbarShowIcon onClick={() => openSidebar()}>
                <FaBars />
            </NavbarShowIcon>
            <LeftContainer>
                <NavbarIten to={'/dashboard'}><FaHome /></NavbarIten>
            </LeftContainer>
            <RightContainer>
                <NavbarMenuContainer>
                    <NavbarAvatar $image={user} onClick={() => setOpen(!open)} />
                    {
                        open && (
                            <DropDownMenu>
                                <Pinguelo />
                                <DropDownItem onClick={() => navigate('/perfil')}>Meu Perfil</DropDownItem>
                                <DropDownItem onClick={() => logout(navigate)} color='#e65061'><FaPowerOff /> Logout</DropDownItem>
                            </DropDownMenu>
                        )
                    }
                </NavbarMenuContainer>
            </RightContainer>
        </NavbarContainer>
    )
}

export default Navbar;