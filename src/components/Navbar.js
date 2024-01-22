import {
    NavbarContainer,
    LeftContainer,
    RightContainer,
    NavbarIten,
    NavbarShowIcon,
    NavbarAvatar
} from './Styles';
import { FaBars} from "react-icons/fa";
import logo from './../assets/logo.png';

const Navbar = ({openSidebar}) => {
    return(
        <NavbarContainer>
            <NavbarShowIcon onClick={()=> openSidebar()}>
                <FaBars />
            </NavbarShowIcon>
            <LeftContainer>
                <NavbarIten to={'/'}>Home</NavbarIten>
                <NavbarIten to={'/'}>Admin</NavbarIten>
            </LeftContainer>
            <RightContainer>
                <NavbarAvatar image={logo}/>
            </RightContainer>
        </NavbarContainer>
    )
}

export default Navbar;