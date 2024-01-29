import styled from "styled-components";

//background
import background from './../assets/bg.jpg';

//React Router
import { Link } from "react-router-dom";

export const colors = {
    primary: '#fff',
    theme: '#be185d',
    light: '#f3f4f6',
    light2: '#e5e7eb',
    dark1: '#1f2937',
    dark2: '#4b5563',
    dark3: '#9ca3af',
    red: '#dc2626'
}

//Styled components
export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.8), rgba(255,255,255,0.8)), url(${background});
    background-size: cover;
    background-attachment: fixed;
`;

//Home
export const StyledTitle = styled.h2`
    font-size: ${(porps) => porps.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

export const StyledSubTitle = styled.p`
    font-size: ${(porps) => porps.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.primary};
    padding: 5px;
    margin-bottom: 25px;
`;

export const Avatar = styled.div`
    width: 85px;
    height: 85px;
    border-radius: 50px;
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

export const StyledButton = styled(Link)`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${colors.primary};
    border-radius: 25px;
    color: ${colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.primary};
        color: ${colors.theme};
        cursor: pointer;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

//Input
export const StyledTextInput = styled.input`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${colors.dark1};
    background-color: ${colors.light2};
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.$invalid && `background-color: ${colors.red}; color: ${colors.primary};`}

    &:focus{
        background-color: ${colors.dark2};
        color: ${colors.primary};
    }
`;

export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
`;

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || colors.light};
    text-align: center;
    padding: 54px 55px;
`;

export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary};
        cursor: pointer;
    }
`;

export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align: left;
`;

export const ExtraText = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : colors.dark2};
    padding: 2px;
    margin-top: 10px;
`;

export const TextLink = styled(Link)`
    text-decoration: none;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;

    &:hover{
        text-decoration: underline;
        letter-spacing: 1px;
        font-weight: bold;
    }
`;

//Icons
export const StyledIcon = styled.p`
    color: ${colors.dark1};
    position: absolute;
    font-size: 21px;
    top: 35px;
    ${(props) => props.$right && `right: 15px;`};
    ${(props) => !props.$right && `left: 15px;`};
`;

//copyright
export const CopyrightText = styled.p`
    padding: 5px;
    margin: 20px;
    text-align: center;
    color: ${colors.light2};
`;

//sidebar styles
export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f3f4f6;
    margin-bottom: 30px;
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;

    @media only screen and (max-width: 978px) {
        flex-direction: column;
    }
`;

export const SidebarLogo = styled.div`
    width: 80px;
    height: 55px;
    background-image: url(${props => props.$image});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: auto;
`;

export const Title = styled.h1`
    font-size: 18px;
    display: inline;
    margin-left: 15px;
    @media only screen and (max-width: 978px) {
        font-size: 12px;
        text-align: center;
    }
`;

export const MenuContainer = styled.div`
    display:flex ;
    flex-direction: column;
`;

export const CloseContainer = styled.div`
    font-size: 18px;
    display: none;

    @media only screen and (max-width: 978px) {
        display: inline;
        align-items: center;
        justify-content: center;
        color: white;
    }
`;

export const IconContainer = styled.div`
    margin-right: 10px;
    font-size: 18px;
`;

export const MenuTitleSection = styled.h2`
    color: #3ea175;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
    padding: 0 10px;
    font-weight: 700;
`;

export const MenuItemContainer = styled.div`
    color: #f3f4f6;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    &:focus{
        padding: 7px;
        background: rgba(62, 161, 117, 0.3);
        width: 100%;
        border-radius: 3px;
    }
`;

export const MenuItemTitle = styled(Link)`
    text-decoration: none;
    color: #a5aaad;
    font-weight: 700;
    font-size: 14px;
`;

export const LogoultContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    color: #e65061;
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;

export const Logoult = styled.a`
    text-decoration: none;
    color: #e65061;
    font-weight: 700;
    text-transform: uppercase;
`;

//navbar
export const NavbarContainer = styled.nav`
    background: ${colors.primary};
    grid-area: nav;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 30px;
    border-bottom: 1px solid lightgray;
`;

export const LeftContainer = styled.div`
    display: flex;
`;

export const RightContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavbarIten = styled(Link)`
    margin-right: 30px;
    text-decoration: none;
    color: #a5aaad;
    font-size: 25px;
    font-weight: 700;
    cursor: pointer;
`;

export const NavbarShowIcon = styled.div`
    display: none;
    @media only screen and (max-width: 978px) {
        display: inline;
    }
`;

export const NavbarAvatar = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

//main styles
export const MainContainer = styled.div`
    padding: 20px 35px;
`;

export const MainHeader = styled.div`
    display: grid;
    grid-template-columns: 7fr 3fr;
    margin-bottom: 35px;
`;

export const MainTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const MainIconTitleContainer = styled.div`
    margin-right: 20px;
    font-size: 20px;
    color: #a5aaa5;
`;

export const MainTitle = styled.h1`
    font-size: 24px;
    color: #2e4a66;
    margin-bottom: 5px;
`;

export const MainRegisterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MainRegisterIconContainer = styled.div`
    margin-right: 10px;
    font-size: 20px;
    color: #34a806;
    cursor: pointer;
`;

export const MainRegisterTitle = styled.h2`
    font-size: 14px;
    color: #2e4a66;
    margin-right: 15px;
`;

//Clients page
export const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        overflowY: 'auto',
        maxHeight: '500px',
        padding: '0'
    }
}