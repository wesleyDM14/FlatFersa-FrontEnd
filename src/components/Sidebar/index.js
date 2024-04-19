
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

const Sidebar = ({ sidebarOpen, closeSidebar, navigate, logoutUser }) => {
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
                <MenuItem onClick={() => navigate('/dashboard')}>
                    <IconItemContainer>
                        <FaHome />
                    </IconItemContainer>
                    <ItemTitle>Home</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA ADMINISTRATIVA</SubTitle>
                <MenuItem onClick={() => navigate('/predios')}>
                    <IconItemContainer>
                        <FaHotel />
                    </IconItemContainer>
                    <ItemTitle>Prédio</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/apartamentos')}>
                    <IconItemContainer>
                        <FaHouseUser />
                    </IconItemContainer>
                    <ItemTitle>Apartamentos</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/clientes')}>
                    <IconItemContainer>
                        <FaUsers />
                    </IconItemContainer>
                    <ItemTitle>Clientes</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/contratos')}>
                    <IconItemContainer>
                        <FaRegHandshake />
                    </IconItemContainer>
                    <ItemTitle>Contratos</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/financeiro')}>
                    <IconItemContainer>
                        <FaMoneyBillWave />
                    </IconItemContainer>
                    <ItemTitle>Financeiro</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA PESSOAL</SubTitle>
                <MenuItem onClick={() => navigate('/perfil')}>
                    <IconItemContainer>
                        <FaUser />
                    </IconItemContainer>
                    <ItemTitle>Perfil</ItemTitle>
                </MenuItem>
                <MenuItem onClick={() => navigate('/politica-privacidade')}>
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

export default Sidebar;