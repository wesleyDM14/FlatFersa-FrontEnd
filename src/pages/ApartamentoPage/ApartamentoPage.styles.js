import styled from "styled-components";
import AptLayout from '../../assets/aptLayout.png';
import AptLayoutAlt from '../../assets/aptLayoutAlt.png';

// --- LAYOUT GERAL ---
export const MainApartamentoContainer = styled.main`
    padding: 20px 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media (max-width: 768px){
        padding: 10px;
    }
`;

export const HeaderApartamentoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
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
    background: #e6fffa;
    padding: 10px 15px;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover {
        background: #d1fae5;
    }
`;

export const AddButtonText = styled.p`
    margin-left: 8px;
    color: ${props => props.theme.colors.textGreen};
    font-size: 1rem;
    font-weight: 700;
`;

export const ContentApartamentoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const ContentApartamentoHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid #eee;
`;

export const ApartamentoCounter = styled.h3`
    font-size: 16px;
    color: ${props => props.theme.colors.titleColor};
    margin-bottom: 15px;
`;

export const SearcherContainer = styled.div`
    width: 100%;
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

// --- ESTADOS VAZIOS ---
export const NoContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: #fff;
    border-radius: 8px;
`;

export const NoContentAvisoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const TextContent = styled.p`
    color: ${props => props.theme.colors.secondary};
    font-size: 1.1rem;
    margin-bottom: 15px;
`;

export const AdicionarApartamentoButton = styled.button`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.success};
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        background-color: ${props => props.theme.colors.textGreen};
    }
`;

// --- TABELA / LISTA ---
export const PredioListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PredioListHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 15px 20px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    
    @media (max-width: 768px){
        grid-template-columns: 1fr 2fr 0.5fr;
    }
`;

export const ListLabel = styled.h5`
    font-size: 14px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
`;

export const SinglePredio = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 15px 20px;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
    cursor: pointer;
    transition: background 0.1s;

    &:hover {
        background-color: #f8fafc;
    }

    @media (max-width: 768px){
        grid-template-columns: 1fr 2fr 0.5fr;
    }
`;

export const PredioSingleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledLabel = styled.span`
    font-size: 14px;
    color: #94a3b8;
    margin-right: 5px;
    display: none; // Escondido no desktop, útil se quiser mostrar no mobile

    @media (max-width: 768px){
        display: inline;
        font-size: 12px;
    }
`;

export const PredioValue = styled.span`
    font-size: 14px;
    color: #334155;
    font-weight: 500;
`;

export const AdminPredioContainer = styled.div`
    display: flex;
    gap: 15px;
    justify-content: flex-start;
`;

export const EditIcon = styled.div`
    font-size: 18px;
    color: ${props => props.theme.colors.lightblue};
    cursor: pointer;
    &:hover { color: #2563eb; }
`;

export const DeleteIcon = styled.div`
    font-size: 18px;
    color: ${props => props.theme.colors.textRed};
    cursor: pointer;
    &:hover { color: #dc2626; }
`;

// --- MODAIS E FORMS ---
export const StyledFormArea = styled.div`
    padding: 20px;
`;

export const ContentIconContainer = styled.div`
    font-size: 24px;
    color: #4b5563;
    margin-right: 10px;
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FormColum = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }
`;

export const FormInputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

export const FormInputLabelRequired = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #374151;

    &::after {
        content: "*";
        color: red;
        margin-left: 2px;
    }
`;

export const Limitador = styled.div`
    width: 100%;
`;

export const RadioContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

export const RadioItemContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const RadioLabel = styled.span`
    margin-right: 10px;
    font-weight: 500;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #ccc;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    color: #555;

    &:hover { background: #f3f4f6; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;

    &:hover { background: #333; }
`;

export const DeleteContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

export const DeleteTitle = styled.h3`
    margin-bottom: 20px;
    color: #1f2937;
`;

export const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

// --- LAYOUT DA PLANTA (FLAT FERSA) ---
export const LayoutSwitchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
`;

export const LayoutSwitchTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 10px;
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
    border: 1px solid #ccc;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background: #94a3b8;
        left: 2px;
        transition: 0.3s;
        cursor: pointer;
    }

    input:checked + span {
        left: calc(100% - 1.8rem - 2px);
        background: #10b981;
    }
`;

export const PlantaBaixaContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    overflow-x: auto;
    background: white;
    min-height: 500px;
    
    /* Ajustes específicos para manter o layout do Flat Fersa */
    gap: 2px;
    border: 1px solid #e2e8f0;
`;

export const PlantaTerreo = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 500px;
    padding: 20px;
    overflow-x: auto;
    gap: 5px;
`;

export const PlantaTerreoColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    min-width: 80px;
    gap: 2px;
`;

export const PlantaTerreoRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 2px;
    justify-content: space-between;
`;

export const PlantaTerreoRow = styled.div`
    display: flex;
    width: 100%;
    gap: 2px;
`;

// Estilo Base do Card da Planta
const PlantaCardBase = styled.div`
    width: 100%; 
    height: 100px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border: 2px solid ${props => props.$statusMatch ? '#ef4444' : '#10b981'}; /* Verde livre, Vermelho ocupado */
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    background-color: ${props => props.$statusMatch ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};

    &:hover {
        transform: scale(1.05);
        z-index: 10;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
`;

export const PlantaBaixaApt = styled(PlantaCardBase)`
    background-image: url(${AptLayout});
    width: 16%; /* Ajuste para caber na linha */
    min-width: 80px;
`;

export const PlantaBaixaAlt = styled(PlantaCardBase)`
    background-image: url(${AptLayoutAlt});
`;

export const PlantaAltContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 16%;
    gap: 2px;
    justify-content: center;
`;

export const NumAptLabel = styled.span`
    font-weight: 800;
    font-size: 1.1rem;
    color: #000;
    text-shadow: 1px 1px 0 #fff;
    background: rgba(255,255,255,0.7);
    padding: 2px 5px;
    border-radius: 4px;
`;

// --- MODAL DETALHES PLANTA ---
export const DetailApartamentoContainer = styled.div`
    padding: 20px;
`;

export const DetailApartamentoHeaderContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const DetailApartamentoHeaderTitle = styled.h2`
    color: #1e293b;
`;

export const DetailApartamentoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const DetailApartamentoValueContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px 0;
`;

export const DetailApartamentoDataLabel = styled.span`
    font-weight: 600;
    color: #64748b;
`;

export const DetailApartamentoDataValue = styled.span`
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
`;

export const DetailApartamentoButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
`;

export const DetailApartamentoBackButton = styled(BackButton)``;
export const DetailApartamentoSelectButton = styled(SubmitButton)``;