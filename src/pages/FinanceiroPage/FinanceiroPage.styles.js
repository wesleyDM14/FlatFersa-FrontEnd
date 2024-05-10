import styled from "styled-components";

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

export const MainFinanceiroContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const HeaderFinanceiroContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 35px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const ContentFinanceiroContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;

export const ContentFinanceiroHeader = styled.div`
    padding: 20px 35px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    display: flex;
`;

export const FinanceiroCounter = styled.h3`
    font-size: 16px;
    color: ${props => props.theme.colors.titleColor};
`;

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

export const PredioListContainer = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    padding-right: 30px;
    margin-bottom: 28px;
`;

export const PredioListHeader = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 1fr;
    height: 40px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${props => props.theme.colors.primary};
    box-shadow: 5px 5px 13px #EDEDED, -5px -5px 13px #FFF;
`;

export const ListLabel = styled.h5`
    font-size: 14px;
    color: #2e4a66;
    margin-right: 10px;
`;

export const SinglePredio = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 1fr;
    height: 50px;
    width: 100%;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    cursor: pointer;
`;

export const PredioSingleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StyledLabel = styled.h1`
    font-size: 18px;
    color: ${props => props.theme.colors.lightblue};
    margin-right: 10px;
`;

export const PredioValue = styled.a`
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
    text-decoration: none;
    color: ${props => props.theme.colors.dark1};

    @media (max-width: 1380px) {
        font-weight: 300;
    }
`;

export const AdminPredioContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EditIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${props => props.theme.colors.lightblue};
`;

export const DeleteIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${props => props.theme.colors.red};
`;