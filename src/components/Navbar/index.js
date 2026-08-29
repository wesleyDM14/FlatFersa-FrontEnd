import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaPowerOff, FaUserCog, FaBell, FaBellSlash, FaFileInvoiceDollar, FaTools, FaCog } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
    NotificationIconBox,
    NotificationTextColumn,
    NotificationTitleRow,
    NotificationTitle,
    UnreadDot,
    NotificationContent,
    NotificationTime,
    NotificationEmpty,
} from './Navbar.styles';

import defaultAvatar from '../../assets/user.png';
import { getMeusAvisos, marcarAvisoComoLido } from '../../services/avisoService';

const AVISO_TIPO_STYLE = {
    GERAL: { icon: <FaBell />, color: '#3b82f6' },
    COBRANCA: { icon: <FaFileInvoiceDollar />, color: '#f59e0b' },
    MANUTENCAO: { icon: <FaTools />, color: '#10b981' },
    SISTEMA: { icon: <FaCog />, color: '#6b7280' },
};

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
                                <NotificationEmpty>
                                    <FaBellSlash />
                                    Nenhuma notificação por aqui.
                                </NotificationEmpty>
                            ) : (
                                avisos.slice(0, 15).map(aviso => {
                                    const st = AVISO_TIPO_STYLE[aviso.tipo] || AVISO_TIPO_STYLE.GERAL;
                                    return (
                                        <NotificationItem
                                            key={aviso.id}
                                            $unread={!aviso.lido}
                                            onClick={() => handleReadAviso(aviso)}
                                        >
                                            <NotificationIconBox $color={st.color}>{st.icon}</NotificationIconBox>
                                            <NotificationTextColumn>
                                                <NotificationTitleRow>
                                                    <NotificationTitle>{aviso.titulo}</NotificationTitle>
                                                    {!aviso.lido && <UnreadDot />}
                                                </NotificationTitleRow>
                                                <NotificationContent>{aviso.conteudo}</NotificationContent>
                                                {aviso.createdAt && (
                                                    <NotificationTime>
                                                        {formatDistanceToNow(new Date(aviso.createdAt), { addSuffix: true, locale: ptBR })}
                                                    </NotificationTime>
                                                )}
                                            </NotificationTextColumn>
                                        </NotificationItem>
                                    );
                                })
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
