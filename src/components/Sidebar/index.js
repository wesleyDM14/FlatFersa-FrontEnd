
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
    FaHotel,
    FaHouseUser,
    FaMinusSquare,
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
                <MenuItem>
                    <IconItemContainer>
                        <FaMinusSquare />
                    </IconItemContainer>
                    <ItemTitle>Home</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA ADMINISTRATIVA</SubTitle>
                <MenuItem>
                    <IconItemContainer>
                        <FaHotel />
                    </IconItemContainer>
                    <ItemTitle>Prédio</ItemTitle>
                </MenuItem>
                <MenuItem>
                    <IconItemContainer>
                        <FaHouseUser />
                    </IconItemContainer>
                    <ItemTitle>Apartamentos</ItemTitle>
                </MenuItem>
                <MenuItem>
                    <IconItemContainer>
                        <FaUsers />
                    </IconItemContainer>
                    <ItemTitle>Clientes</ItemTitle>
                </MenuItem>
                <MenuItem>
                    <IconItemContainer>
                        <FaRegHandshake />
                    </IconItemContainer>
                    <ItemTitle>Contratos</ItemTitle>
                </MenuItem>
                <MenuItem>
                    <IconItemContainer>
                        <FaMoneyBillWave />
                    </IconItemContainer>
                    <ItemTitle>Financeiro</ItemTitle>
                </MenuItem>
                <SubTitle>ÁREA PESSOAL</SubTitle>
                <MenuItem>
                    <IconItemContainer>
                        <FaUser />
                    </IconItemContainer>
                    <ItemTitle>Perfil</ItemTitle>
                </MenuItem>
                <MenuItem>
                    <IconItemContainer>
                        <FaFile />
                    </IconItemContainer>
                    <ItemTitle>Política de Privacidade</ItemTitle>
                </MenuItem>
                <LogoutContainer>
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