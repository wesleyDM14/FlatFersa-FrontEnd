import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
    background: ${props => props.theme.colors.primary};
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
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    margin: auto;
    cursor: pointer;
    filter: opacity(0.5) drop-shadow(0 0 0 #a5aaad);
`;

export const NavbarMenuContainer = styled.div``;

export const DropDownMenu = styled.div`
    position: absolute;
    top: 58px;
    width: 150px;
    transform: translateX(-75%);
    background-color: #020509;
    border: 1px solid #FFFa;
    border-radius: 15px;
    padding: 1rem;
    overflow: hidden;
    z-index: 9999;
`;

export const DropDownItem = styled.a`
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    transition: background 500ms;
    padding: 0.5rem;
    color: ${props => props.color ? props.color : props.theme.colors.success};
    cursor: pointer;

    &:hover{
        background-color: rgba(62, 161, 117, 0.3);
    }
`;