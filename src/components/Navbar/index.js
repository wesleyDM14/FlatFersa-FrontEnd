import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaPowerOff, FaUserCog, FaBell } from 'react-icons/fa';
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
    BellContainer,
    BellBadge,
    NotificationDropdown,
    NotificationHeader,
    NotificationItem,
    NotificationTitle,
    NotificationContent,
    NotificationEmpty,
} from './Navbar.styles';

import defaultAvatar from '../../assets/user.png';
import { getMeusAvisos, marcarAvisoComoLido } from '../../services/avisoService';

const Navbar = ({ openSidebar, logout, user }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [avisos, setAvisos] = useState([]);

    const userImage = user?.photoUrl || defaultAvatar;
    const naoLidos = avisos.filter(a => !a.lido).length;

    const fetchAvisos = useCallback(async () => {
        try {
            const data = await getMeusAvisos();
            setAvisos(data || []);
        } catch (err) {
            console.error("Erro ao buscar avisos", err);
        }
    }, []);

    useEffect(() => {
        if (user?.id) fetchAvisos();
    }, [user, fetchAvisos]);

    const handleOpenNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        setOpen(false);
    };

    const handleReadAviso = async (aviso) => {
        if (!aviso.lido) {
            try {
                await marcarAvisoComoLido(aviso.id);
                setAvisos(prev => prev.map(a => a.id === aviso.id ? { ...a, lido: true } : a));
            } catch (err) {
                console.error("Erro ao marcar aviso como lido", err);
            }
        }
    };

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
                    <BellContainer onClick={handleOpenNotifications}>
                        <FaBell />
                        {naoLidos > 0 && <BellBadge>{naoLidos > 9 ? '9+' : naoLidos}</BellBadge>}
                    </BellContainer>

                    {notificationsOpen && (
                        <NotificationDropdown>
                            <NotificationHeader>
                                <span>Notificações</span>
                            </NotificationHeader>

                            {avisos.length === 0 ? (
                                <NotificationEmpty>Nenhuma notificação por aqui.</NotificationEmpty>
                            ) : (
                                avisos.slice(0, 15).map(aviso => (
                                    <NotificationItem
                                        key={aviso.id}
                                        $unread={!aviso.lido}
                                        onClick={() => handleReadAviso(aviso)}
                                    >
                                        <NotificationTitle>{aviso.titulo}</NotificationTitle>
                                        <NotificationContent>{aviso.conteudo}</NotificationContent>
                                    </NotificationItem>
                                ))
                            )}
                        </NotificationDropdown>
                    )}
                </NavbarMenuContainer>

                <NavbarMenuContainer>
                    <span style={{ marginRight: '10px', fontSize: '14px', color: '#555', fontWeight: '600' }}>
                        {user?.name?.split(' ')[0] || 'Usuário'}
                    </span>

                    <NavbarAvatar
                        $image={userImage}
                        onClick={() => { setOpen(!open); setNotificationsOpen(false); }}
                    />

                    {open && (
                        <DropDownMenu>
                            <Pinguelo />
                            <DropDownItem onClick={() => { setOpen(false); navigate('/perfil'); }}>
                                <FaUserCog style={{ marginRight: '8px' }} /> Perfil
                            </DropDownItem>

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
