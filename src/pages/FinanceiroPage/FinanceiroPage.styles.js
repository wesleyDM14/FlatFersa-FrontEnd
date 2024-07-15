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
    flex-direction: column;
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
    flex-direction: column;
`;

export const FinanceiroCounter = styled.h3`
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

    @media (max-width: 978px) {
        display: none;
    }
`;

export const PredioValue = styled.a`
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
    text-decoration: none;
    color: ${props => props.theme.colors.dark1};
    display: flex;
    align-items: center;
    justify-content: center;

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

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-top: 15px;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const CardsContainerAdmin = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 15px;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px;
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    cursor: pointer;
    transition: 0.5s ease;

    &:hover{
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
        transition: 0.5s ease;
    }

    @media only screen and (max-width: 978px){
        width: 80%;
    }
`;

export const CardTitle = styled.h1`
    font-size: 25px;
    font-weight: bold;
    color: ${props => props.theme.colors.titleColor};
`;

export const CardIconContainer = styled.div`
    font-size: 35px;
    color: ${props => props.theme.colors.dark1};
    text-align: center;
    margin-top: 15px;
`;

export const CardContent = styled.p``;

export const PrestacaoDetailMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    display: flex;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const PrestacaoDetailHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PrestacaoDetailHeaderTitle = styled.h2`
    font-size: 25px;
    font-weight: bold;
    color: ${props => props.theme.colors.titleColor};
`;

export const PrestcaoDetailContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 35px;
    padding: 25px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
    transition: 0.5s ease;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const PrestacaoDetailLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 15px;
    flex: 1;
`;

export const PrestacaoDetailValueContainer = styled.div`
    display: flex;
`;

export const PrestacaoDetailLabel = styled.span`
    font-weight: bold;
    margin-right: 5px;
`;

export const PrestacaoDetailValue = styled.p`
    color: ${props => props.theme.colors.dark1};
`;

export const PrestacaoDetailRightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;

    @media only screen and (max-width: 978px){
        margin-top: 15px;
    }
`;

export const PrestacaoDetailPagamentoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const QrCodePagamento = styled.img`
    width: 250px;
    margin-top: 15px;
`;

export const QrCodeCopiaEColaContainer = styled.div`
    width: 80%; /* ou qualquer valor que você preferir */
    max-width: 600px; /* limite máximo de largura */
    height: 100px;
    margin: auto; /* centraliza horizontalmente */
    border: 1px solid #ccc; /* apenas para visualização */
    overflow: hidden; /* esconde o conteúdo que excede a área */
    position: relative; /* necessário para o posicionamento absoluto */
`;

export const QrCodeCopiaECola = styled.p`
    position: absolute; /* permite o posicionamento dentro do contêiner */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    word-wrap: break-word;
`;

export const PrestacaoDetailButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px 35px;
    margin-top: 15px;

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
        //min-width: 45%;
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
    margin-right: 15px;
    &:hover{
        background-color: #000A;
    }

    @media only screen and (max-width: 978px){
        //min-width: 45%;
    }
`;

export const WaitingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const WaitingIcon = styled.div`
    margin-top: 5px;
    font-size: 150px;
    color: ${props => props.theme.colors.dark2};
`;

export const WaitingTitle = styled.h2`
    font-size: 20px;
`;

export const ComprovanteContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ComprovanteTitle = styled.h2``;

export const ComprovanteImg = styled.img`
    width: 150px;
`;

export const ComprovanteIconContainer = styled.div`
    font-size: 150px;
    color: ${props => props.theme.colors.dark2};
`;

export const PdfPreview = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: red;
`;