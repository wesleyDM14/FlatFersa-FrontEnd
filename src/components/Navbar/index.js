import { FaBars, FaHome } from 'react-icons/fa';
import {
    NavbarContainer,
    NavbarShowIcon,
    LeftContainer,
    NavbarIten,
    RightContainer,
    NavbarAvatar
} from './Navbar.styles';

import logo from '../../assets/favicon.png';

const Navbar = ({ openSidebar }) => {
    return (
        <NavbarContainer>
            <NavbarShowIcon onClick={() => openSidebar()}>
                <FaBars />
            </NavbarShowIcon>
            <LeftContainer>
                <NavbarIten to={'/dashboard'}><FaHome /></NavbarIten>
            </LeftContainer>
            <RightContainer>
                <NavbarAvatar image={logo} />
            </RightContainer>
        </NavbarContainer>
    )
}

export default Navbar;