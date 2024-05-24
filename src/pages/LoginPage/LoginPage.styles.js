import styled from "styled-components";

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || props.theme.colors.light};
    text-align: center;
    padding: 54px 55px;
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

export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.theme.colors.theme};
    padding: 5px;
    margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${props => props.theme.colors.theme};
    border-radius: 25px;
    color: ${props => props.theme.colors.theme};
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${props => props.theme.colors.theme};
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
    }
`;

export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;