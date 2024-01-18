import {
    TitleContainer,
    SidebarLogo,
    Title,
    MenuContainer,
    ImageContainer,
    LogoultContainer,
    Logoult,
    IconContainer,
    CloseContainer
} from './../components/Styles';
import {
    FaTimes,
    FaPowerOff
} from 'react-icons/fa';

import Icone from './../assets/icone.png';

const Sidebar = ({ sidebarOpen, closeSidebar, navigate, logoutUser }) => {

    return (
        <div className={sidebarOpen ? 'sidebar-responsive' : ''} id='sidebar'>
            <TitleContainer>
                <ImageContainer>
                    <SidebarLogo image={Icone} />
                    <Title>Gerenciamento de Alugueis</Title>
                </ImageContainer>
                <CloseContainer>
                    <FaTimes onClick={() => closeSidebar()} id={'sidebarIcon'} aria-hidden={true} />
                </CloseContainer>
            </TitleContainer>
            <MenuContainer>
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