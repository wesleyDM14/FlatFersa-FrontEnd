import {
    TitleContainer,
    SidebarLogo,
    Title,
    MenuContainer,
    ImageContainer,
    LogoultContainer,
    Logoult,
    IconContainer,
    CloseContainer,
    MenuItemContainer,
    MenuItemTitle,
    MenuTitleSection
} from './../components/Styles';
import {
    FaTimes,
    FaPowerOff,
    FaUserFriends,
    FaRegFileAlt,
    FaUserAlt,
    FaHotel,
} from 'react-icons/fa';

import Icone from './../assets/icone.png';

const Sidebar = ({ sidebarOpen, closeSidebar, navigate, logoutUser }) => {

    return (
        <div className={sidebarOpen ? 'sidebar-responsive' : ''} id='sidebar'>
            <TitleContainer>
                <ImageContainer>
                    <SidebarLogo $image={Icone} />
                    <Title>Gerenciamento de Alugueis</Title>
                </ImageContainer>
                <CloseContainer>
                    <FaTimes onClick={() => closeSidebar()} id='sidebarIcon' aria-hidden={true} />
                </CloseContainer>
            </TitleContainer>
            <MenuContainer>
                <MenuTitleSection>GESTÃO</MenuTitleSection>
                <MenuItemContainer onClick={() => {
                    navigate('/apartamentos');
                }}>
                    <IconContainer>
                        <FaHotel />
                    </IconContainer>
                    <MenuItemTitle>Apartamentos</MenuItemTitle>
                </MenuItemContainer>
                <MenuItemContainer onClick={() => {
                    navigate('/clients');
                }}>
                    <IconContainer>
                        <FaUserFriends />
                    </IconContainer>
                    <MenuItemTitle>Clientes</MenuItemTitle>
                </MenuItemContainer>
                <MenuItemContainer>
                    <IconContainer>
                        <FaRegFileAlt />
                    </IconContainer>
                    <MenuItemTitle>Contratos</MenuItemTitle>
                </MenuItemContainer>
                <MenuTitleSection>PESSOAL</MenuTitleSection>
                <MenuItemContainer>
                    <IconContainer>
                        <FaUserAlt />
                    </IconContainer>
                    <MenuItemTitle>Perfil</MenuItemTitle>
                </MenuItemContainer>
                <MenuTitleSection>SISTEMA</MenuTitleSection>
                <LogoultContainer onClick={() => {
                    logoutUser(navigate);
                }}>
                    <IconContainer>
                        <FaPowerOff />
                    </IconContainer>
                    <Logoult>Logout</Logoult>
                </LogoultContainer>
            </MenuContainer>
        </div>
    )
}

export default Sidebar;