import styled from "styled-components";

// --- LAYOUT GERAL ---
export const MainClientContainer = styled.main`
    padding: 20px 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media (max-width: 768px){
        padding: 15px;
    }
`;

export const HeaderClientContainer = styled.div`
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

export const AddClientHeaderButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #e6fffa;
    padding: 10px 15px;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover { background: #d1fae5; }
`;

export const AddButtonText = styled.p`
    margin-left: 8px;
    color: ${props => props.theme.colors.textGreen};
    font-size: 1rem;
    font-weight: 700;
`;

// --- CONTEÚDO PRINCIPAL ---
export const ContentClientContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    padding: 20px;
    min-height: 400px;
    width: 100%;
`;

// *** O COMPONENTE QUE FALTAVA ***
export const ContentClientHeader = styled.div`
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f5f9;
`;

export const ContentIconContainer = styled.div`
    font-size: 24px;
    color: #4b5563;
    margin-right: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ClientCounter = styled.h3`
    font-size: 1.2rem;
    color: #334155;
    font-weight: 600;
`;

// --- CARDS DASHBOARD ---
export const ClienteCardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    &.active {
        border-color: #3b82f6;
        background-color: #eff6ff;
    }
`;

export const CardTitle = styled.h3`
    font-size: 1.1rem;
    color: #64748b;
    font-weight: 600;
    margin-bottom: 15px;
`;

export const CardIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2rem;
    color: #3b82f6;
`;

// --- FORMULÁRIOS ---
export const StyledFormArea = styled.div`
    padding: 10px 0;
`;

export const FormContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px){
        grid-template-columns: 1fr;
    }
`;

export const FormColum = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 600px){
        grid-template-columns: 1fr;
    }
`;

export const FormInputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

export const FormInputLabelRequired = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 5px;
    
    &::after {
        content: "*";
        color: red;
        margin-left: 2px;
    }
`;

export const FormInputLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 5px;
`;

export const Limitador = styled.div`
    width: 100%;
`;

// --- BOTÕES ---
export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    border: 1px solid #cbd5e1;
    background: transparent;
    border-radius: 6px;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #f1f5f9; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover { background: #333; }
`;

export const RejectButton = styled(SubmitButton)`
    background-color: #ef4444;
    &:hover { background-color: #dc2626; }
`;

// --- UPLOAD DE ARQUIVOS ---
export const StyledFileArea = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    background-color: #f8fafc;
    transition: border 0.2s;
    text-align: center;
    min-height: 150px;

    &:hover {
        border-color: #3b82f6;
        background-color: #eff6ff;
    }
`;

export const StyledFileIconContainer = styled.div`
    font-size: 2.5rem;
    color: #94a3b8;
    margin-bottom: 10px;
`;

export const StyledFileInputTitle = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    color: #475569;
`;

export const StyledFileLegend = styled.span`
    font-size: 0.8rem;
    color: #94a3b8;
`;

export const StyledFileInput = styled.input`
    display: none;
`;

export const Image = styled.img`
    max-width: 100%;
    max-height: 150px;
    object-fit: contain;
    border-radius: 4px;
`;

// --- TABELA E LISTA ---
export const PredioListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PredioListHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 1fr;
    padding: 15px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
    
    @media (max-width: 768px){
        display: none; 
    }
`;

export const ListLabel = styled.h5`
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
`;

export const SinglePredio = styled.div`
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 1fr;
    padding: 15px;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
    cursor: pointer;
    transition: background 0.1s;

    &:hover { background-color: #f8fafc; }

    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        margin-bottom: 15px;
        border-radius: 8px;
    }
`;

export const PredioSingleContainer = styled.div`
    display: flex;
    align-items: center;
    
    @media (max-width: 768px){
        width: 100%;
        justify-content: space-between;
    }
`;

export const StyledLabel = styled.span`
    display: none;
    @media (max-width: 768px){
        display: inline-block;
        font-weight: 600;
        color: #64748b;
        font-size: 0.9rem;
    }
`;

export const PredioValue = styled.span`
    font-size: 0.95rem;
    color: #334155;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const AdminPredioContainer = styled.div`
    display: flex;
    gap: 15px;
    
    @media (max-width: 768px){
        width: 100%;
        justify-content: flex-end;
        border-top: 1px solid #f1f5f9;
        padding-top: 10px;
    }
`;

export const EditIcon = styled.div`
    font-size: 1.2rem;
    color: #3b82f6;
    cursor: pointer;
`;

export const DeleteIcon = styled.div`
    font-size: 1.2rem;
    color: #ef4444;
    cursor: pointer;
`;

// --- ESTADOS VAZIOS E LOADING ---
export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 70vh;
`;

export const NoContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    color: #94a3b8;
`;

export const NoContentAvisoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const TextContent = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

export const AdicionarClientButton = styled(SubmitButton)`
    background-color: #10b981;
    &:hover { background-color: #059669; }
`;

export const SearcherContainer = styled.div`
    margin-bottom: 20px;
`;

// --- MODAIS ---
export const SolicitacaoModalContainer = styled.div`
    padding: 20px;
`;

export const SolicitacaoTitleContainer = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    margin-bottom: 20px;
`;

export const SolicitacaoModalTitle = styled.h2`
    font-size: 1.5rem;
    color: #1e293b;
`;

export const SolicitacaoModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const DataColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const DataContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f5f9;
    padding: 8px 0;
`;

export const SolicitacaoModalContentLabel = styled.span`
    font-weight: 600;
    color: #64748b;
`;

export const SolicitacaoModalContentValue = styled.span`
    color: #0f172a;
    font-weight: 500;
`;

export const LinkImgContainer = styled.a`
    display: block;
    margin-top: 10px;
    text-decoration: none;
`;

export const ImgContainer = styled.div`
    border: 1px solid #e2e8f0;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
`;

export const DocumentImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 4px;
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