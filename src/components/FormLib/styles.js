import styled from "styled-components";

export const StyledTextInput = styled.input`
    width: ${(props) => props.width}px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    color: ${props => props.theme.colors.dark1};
    background-color: ${props => props.theme.colors.light2};
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.$invalid && `background-color: ${props.theme.colors.error}; color: ${props.theme.colors.primary};`}

    &:focus{
        background-color: ${props => props.theme.colors.dark2};
        color: ${props => props.theme.colors.primary};
    }
`;

export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: bold;
`;

export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${props => props.theme.colors.error};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align: left;
`;

export const StyledIcon = styled.p`
    margin: auto;
    color: ${props => props.theme.colors.dark1};
    position: absolute;
    font-size: 25px;
    top: 35px;
    ${(props) => props.$right && `right: 15px;`};
    ${(props) => !props.$right && `left: 15px;`};
`;

export const StyledSelectArea = styled.div`
    display: block;
`;

export const StyledSelectLabel = styled.p`
    font-weight: 600;
    display: block;
    margin-bottom: 5px;

    &::after{
        display: inline-block;
        content: "*";
        margin-left: 2px;
        color: ${props => props.theme.colors.theme};
    }
`;