import styled from "styled-components";

export const MainApartamentoContainer = styled.main`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const HeaderApartamentoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 35px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const AddApartamentoHeaderButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const AddButtonText = styled.p`
    margin-left: 5px;
    color: ${props => props.theme.colors.textGreen};
    font-size: 1.1rem;
    font-weight: 700;
`;

export const ContentApartamentoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;

export const ContentApartamentoHeader = styled.div`
    padding: 20px 35px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const ApartamentoCounter = styled.h3`
    font-size: 16px;
    color: ${props => props.theme.colors.titleColor};
`;

export const SearcherContainer = styled.div``;

export const NoContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 50px 35px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;

    @media only screen and (max-width: 978px){
        padding: 30px 10px;
    }
`;

export const NoContentAvisoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TextContent = styled.p`
    color: ${props => props.theme.colors.secondary};
    font-size: 1.3rem;

    @media only screen and (max-width: 978px){
        font-size: 0.9rem;
    }
`;

export const AdicionarApartamentoButton = styled.button`
    display: flex;
    align-items: center;
    margin-top: 15px;
    padding: 10px 25px;
    background-color: ${props => props.theme.colors.success};
    border: 1px solid green;
    border-radius: 3px;
    font-size: 14px;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.colors.textGreen};
    }

    @media only screen and (max-width: 978px){
        padding: 5px 15px;
    }
`;