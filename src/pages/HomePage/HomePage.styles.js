import styled from "styled-components";
import { Link } from "react-router-dom";

import background from '../../assets/bg.jpg';

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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const LogoContainer = styled.div`
`;

export const StyledTitle = styled.h2`
    font-size: ${(porps) => porps.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : props.theme.colors.primary};
    padding: 5px;
    margin-bottom: 20px;
`;

export const StyledSubTitle = styled.p`
    font-size: ${(porps) => porps.size}px;
    text-align: center;
    color: ${(props) => props.color ? props.color : props.theme.colors.primary};
    padding: 5px;
    margin-bottom: 25px;
`;

export const Avatar = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

export const StyledButton = styled(Link)`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 3px solid ${props => props.theme.colors.primary};
    border-radius: 25px;
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.theme};
        cursor: pointer;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;