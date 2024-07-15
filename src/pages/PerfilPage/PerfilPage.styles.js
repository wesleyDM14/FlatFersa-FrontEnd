import styled from 'styled-components';

export const MainPerfilContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const LoadingContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const HeaderPerfilContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 35px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const ContentPerfilContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;

export const StyledFormArea = styled.div`
    margin-top: 10px;
    padding: 50px 35px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;

    @media only screen and (max-width: 978px){
        padding: 30px 10px;
    }
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormInputArea = styled.div`
    box-sizing: inherit;
    margin-bottom: 20px;
    width: 50%;

    @media only screen and (max-width: 978px){
        width:100%;
    }
`;

export const FormInputLabelRequired = styled.p`
    font-weight: 600;
    margin-bottom: 5px;

    &::after{
        display: inline-block;
        content: "*";
        margin-left: 2px;
        color: ${props => props.theme.colors.theme};
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0px 35px;

    @media only screen and (max-width: 978px){
        justify-content: center;
        padding: 30px 10px;
    }
`;

export const BackButton = styled.button`
    cursor: pointer;
    margin-right: 15px;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 4px;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 80px;
    transition: all .2s ease-out;
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};

    &:hover{
        background-color: ${props => props.theme.colors.light2};
    }

    @media only screen and (max-width: 978px){
        min-width: 45%;
    }
`;

export const SubmitButton = styled.button`
    cursor: pointer;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 4px;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 80px;
    transition: all .2s ease-out;
    background-color: #000;;
    color: ${props => props.theme.colors.primary};

    &:hover{
        background-color: #000A;
    }

    @media only screen and (max-width: 978px){
        min-width: 45%;
    }
`;