import styled from "styled-components";

import AptLayout from '../../assets/aptLayout.png';
import AptLayoutAlt from '../../assets/aptLayoutAlt.png';

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
    display: flex;
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

export const ContentIconContainer = styled.div`
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

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

export const RadioContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const RadioLabel = styled.span`
    font-weight: 600;
    margin-right: 5px;
`;

export const RadioItemContainer = styled.label`
`;

export const LayoutSwitchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LayoutSwitchTitle = styled.h2`
    font-size: 16px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const LayoutSwitchButton = styled.label`
    background: #fff;
    width: 4rem;
    height: 2rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 5px;

    input {
        height: 100%;
        width: 100%;
        opacity: 0;
    }

    span {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        background: lightgray;
        left: 0;
        box-shadow: 2px 2px 4px gray;
        cursor: pointer;
        transition: 0.5s;
    }

    input:checked + span {
        left: 50%;
        background: green;
    }
`;

export const PlantaBaixaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #fff;
    height: 650px;
    margin-top: 25px;
    border: 1px solid #eee;
    position: relative;
`;

export const PlantaBaixaApt = styled.div`
    width: 15%;
    height: 100px;
    background-image: url(${AptLayout});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-size:100% 100%;
    filter: opacity(0.5) drop-shadow(0 0 0 #ff0000);
    border: 3px solid green;
    cursor: pointer;
    margin-right: 1px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        width: 17%;
        height: 105px;
    }
`;

export const PlantaAltContainer = styled.div`
    display: flex;
    width: 15%;
    margin-left: 25px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const PlantaBaixaAlt = styled.div`
    width: 90%;
    height: 100px;
    background-image: url(${AptLayoutAlt});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-size:100% 100%;
    filter: opacity(0.5) drop-shadow(0 0 0 #ff0000);
    border: 3px solid green;
    cursor: pointer;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover{
        width: 92%;
        height: 105px;
    }
`;

export const PlantaTerreoColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    margin: 5px 5px;
`;

export const PlantaTerreoRow = styled.div`
    display: flex;
    margin: 5px 5px;
`;

export const PlantaTerreoRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;
`;

export const PlantaTerreo = styled.div`
    display: flex;
    width: 100%;
    background: #fff;
    height: 650px;
    margin-top: 25px;
    border: 1px solid #eee;
    position: relative;
    overflow: hidden;
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

export const NumAptLabel = styled.p`
    color: #000;
    font-size: 28px;
    font-weight: 700;
`;