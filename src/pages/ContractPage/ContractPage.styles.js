import styled from "styled-components";

export const MainContratoContainer = styled.main`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const HeaderContratoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 35px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const AddContratoHeaderButton = styled.div`
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

export const ContentContratoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`;

export const ContentContratoHeader = styled.div`
    padding: 20px 35px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const ContratoCounter = styled.h3`
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

export const AdicionarContratoButton = styled.button`
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

export const ContentIconContainer = styled.div`
    display: flex;
    margin-right: 5px;
    font-size: 18px;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const FormColum = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

export const FormInputArea = styled.div`
    box-sizing: inherit;
    margin-bottom: 20px;
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

export const FormInputLabel = styled.p`
    font-weight: 600;
    margin-bottom: 5px;
`;

export const FormTextInput = styled.input`
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    align-items: center;
    border: 1px solid #0a0a0a0d;
    border-radius: 4px;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    line-height: 1.5;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const ButtonGroup = styled.div`
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

    &:hover{
        background-color: #000A;
    }

    @media only screen and (max-width: 978px){
        //min-width: 45%;
    }
`;

export const RejectButton = styled.button`
    cursor: pointer;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 4px;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 80px;
    margin-right: 15px;
    transition: all .2s ease-out;
    background-color: ${props => props.theme.colors.textRed};
    color: ${props => props.theme.colors.primary};

    &:hover{
        background-color: #F00;
    }

    @media only screen and (max-width: 978px){
        margin-top: 15px;
        min-width: 95%;
    }
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const Limitador = styled.div`
    max-width: 90%;

    @media only screen and (max-width: 978px){
        max-width: 100%;
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

export const PredioListContainer = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    padding-right: 30px;
    margin-bottom: 28px;
`;

export const PredioListHeader = styled.div`
    display: grid;
    grid-template-columns: ${props => props.$isadmin === 'true' ? '5fr 2fr 2fr 1fr' : '2fr 2fr'};
    height: 40px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: ${props => props.theme.colors.primary};
    box-shadow: 5px 5px 13px #EDEDED, -5px -5px 13px #FFF;

    @media only screen and (max-width: 978px){
        grid-template-columns: ${props => props.$isadmin === 'true' ? '1fr 1fr 1fr 0.2fr' : '2fr 2fr'};
    }
`;

export const ListLabel = styled.h5`
    font-size: 14px;
    color: #2e4a66;
    margin-right: 10px;
`;

export const SinglePredio = styled.div`
    display: grid;
    grid-template-columns: ${props => props.$isadmin === 'true' ? '5fr 2fr 2fr 1fr' : '2fr 2fr'};
    height: 50px;
    width: 100%;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    cursor: pointer;

    @media only screen and (max-width: 978px){
        grid-template-columns: ${props => props.$isadmin === 'true' ? '1fr 1fr 1fr 0.2fr' : '2fr 2fr'};
    }
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

    @media only screen and (max-width: 978px){
        display: none;
    }
`;

export const PredioValue = styled.a`
    font-size: 14px;
    font-weight: 700;
    margin-right: 30px;
    text-decoration: none;
    color: ${props => props.theme.colors.dark1};

    @media only screen and (max-width: 978px){
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
    }
`;

export const AdminPredioContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 978px){
        flex-direction: row;
    }
`;

export const EditIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${props => props.theme.colors.lightblue};
`;

export const DeleteIcon = styled.div`
    font-size: 18px;
    margin-left: 10px;
    color: ${props => props.theme.colors.textRed};
`;

export const SelectedAptTitleContainer = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SelectedAptTitle = styled.h1`
    font-size: 18px;
    color: ${props => props.theme.colors.lightblue};
    margin-right: 10px;
`;

export const AlertContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const AlertText = styled.h1`
    font-size: 28px;
    color: #ed3d3e;
    margin-bottom: 15px;
`;

export const AlertButton = styled.button`
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

export const ContratoCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

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

export const DeleteContainer = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 25px;
`;

export const DeleteTitle = styled.h1`
    font-size: 20px;
    color: #2e4a66;
`;

export const DeleteButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
`;

export const SolicitacaoModalContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
`;

export const SolicitacaoTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
`;

export const SolicitacaoModalTitle = styled.h1`
    font-size: 30px;
    color: #2e4a66;

    @media only screen and (max-width: 978px){
        font-size: 24px;
    }
`;

export const SolicitacaoModalContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 25px;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
        margin-top: 0;
    }

`;

export const DataSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

    @media only screen and (max-width: 978px){
        margin-top: 15px;
    }
`;

export const DataColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DataContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

export const DataIconContainer = styled.div`
    font-size: 18px;
    color: ${props => props.theme.colors.dark1};
    margin-right: 15px;
    align-items: center;

    @media only screen and (max-width: 978px){
        font-size: 16px;
    }
`;

export const SubTitle = styled.h2`
    font-size: 18px;
    color: ${props => props.theme.colors.dark1};

    @media only screen and (max-width: 978px){
        font-size: 16px;
    }
`;

export const SolicitacaoModalContentLabel = styled.h3`
    font-size: 18px;
    color: ${props => props.theme.colors.dark2};
    margin-right: 15px;

    @media only screen and (max-width: 978px){
        font-size: 16px;
    }
`;

export const SolicitacaoModalContentValue = styled.p`
    font-size: 18px;
    color: ${props => props.theme.colors.dark1};
    margin-right: 15px;

    @media only screen and (max-width: 978px){
        font-size: 16px;
    }
`;

export const SolicitacaoContratoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
`;

export const DetailContractContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

export const DetailContractHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DetailContractHeaderTitle = styled.h2``;

export const DetailContractHeaderSubTitle = styled.h3`
    margin-top: 5px;
`;

export const DetailContractDataContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const DetailContractDataColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailContractDataColumnRight = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;

    @media only screen and (max-width: 978px){
        margin-left: 0;
    }
`;

export const DetailContractDataSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DetailContractDataSectionTitle = styled.h2`
    font-size: 18px;
    color: ${props => props.theme.colors.dark3};
    margin-bottom: 15px;
    margin-top: 5px;

    @media only screen and (max-width: 978px){
        font-size: 16px;
    }
`;

export const DetailContractDataLabel = styled.span`
    font-size: 15px;
    color: ${props => props.theme.colors.dark1};
    font-weight: 700;

    @media only screen and (max-width: 978px){
        font-size: 13px;
    }
`;

export const DetailContractValueContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

export const DetailContractDataValue = styled.span`
    font-size: 15px;
    color: ${props => props.theme.colors.dark1};
    font-weight: 500;

    @media only screen and (max-width: 978px){
        font-size: 13px;
    }
`;

export const DetailContractButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

    @media only screen and (max-width: 978px){
        flex-direction: column;
    }
`;

export const DetailContractBackButton = styled.button`
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
        min-width: 95%;
    }
`;

export const DetailContractDownloadButton = styled.button`
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
    margin-right: 5px;

    &:hover{
        background-color: #000A;
    }

    @media only screen and (max-width: 978px){
        min-width: 95%;
        margin-top: 15px;
        margin-right: 15px;
    }
`;

export const FinanceiroList = styled.ul`
    list-style-type: none;
`;

export const FinanceiroListElement = styled.li`
    display: flex;
`;

export const FinanceiroListValue = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
        color: #00F;
    }
`;

export const FinanceiroListIconContainer = styled.div`
    display: flex;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${props => props.theme.colors.dark2};
`;

export const FinanceiroListElementContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
