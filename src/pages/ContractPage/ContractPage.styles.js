import styled from "styled-components";

// Layout Principal
export const MainContratoContainer = styled.main`
    padding: 20px 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media (max-width: 768px){
        padding: 15px;
    }
`;

export const HeaderContratoContainer = styled.div`
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

export const AddContratoHeaderButton = styled.div`
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

// Cards de Filtro
export const ContratoCardsContainer = styled.div`
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

export const ContratoCounter = styled.span`
    font-size: 1.8rem;
    font-weight: 800;
    color: #1e293b;
`;

// Área de Conteúdo (Lista)
export const ContentContratoContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    padding: 20px;
    min-height: 400px;
`;

export const ContentContratoHeader = styled.div`
    margin-bottom: 20px;
`;

export const SearcherContainer = styled.div`
    width: 100%;
`;

// Tabela / Lista
export const PredioListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PredioListHeader = styled.div`
    display: grid;
    /* Ajusta colunas baseado se é admin ou não */
    grid-template-columns: ${props => props.$isadmin === 'true' ? '1.5fr 1fr 1fr 0.5fr' : '1fr 1fr'};
    padding: 15px;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    border-radius: 8px 8px 0 0;
    
    @media (max-width: 768px){
        display: none; /* Card layout no mobile */
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
    grid-template-columns: ${props => props.$isadmin === 'true' ? '1.5fr 1fr 1fr 0.5fr' : '1fr 1fr'};
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const AdminPredioContainer = styled.div`
    display: flex;
    gap: 15px;
    justify-content: flex-end;

    @media (max-width: 768px){
        width: 100%;
        border-top: 1px solid #eee;
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

// Empty State
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

export const AdicionarContratoButton = styled.button`
    padding: 10px 20px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
    &:hover { background-color: #059669; }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`;

// --- MODAIS ---
// (Estilos específicos para os modais complexos de contrato)
export const DetailContractContainer = styled.div`
    padding: 20px;
`;

export const DetailContractHeaderContainer = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const DetailContractHeaderTitle = styled.h2`
    color: #1e293b;
`;

export const DetailContractHeaderSubTitle = styled.h4`
    color: #64748b;
    margin-top: 5px;
`;

export const DetailContractDataContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }
`;

export const DetailContractDataColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DetailContractDataColumnRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DetailContractDataSectionTitle = styled.h3`
    font-size: 1rem;
    color: #3b82f6;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    margin-bottom: 10px;
`;

export const DetailContractDataSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const DetailContractValueContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DetailContractDataLabel = styled.span`
    font-weight: 600;
    color: #475569;
`;

export const DetailContractDataValue = styled.span`
    font-weight: 500;
    color: #0f172a;
`;

export const DetailContractButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 30px;
    flex-wrap: wrap;

    @media (max-width: 768px){
        justify-content: center;
    }
`;

export const DetailContractBackButton = styled.button`
    padding: 10px 20px;
    background: transparent;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
    &:hover { background: #f1f5f9; }
`;

export const DetailContractDownloadButton = styled.button`
    padding: 10px 20px;
    background: #000;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover { background: #333; }
`;

export const RejectButton = styled.button`
    padding: 10px 20px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover { background: #dc2626; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover { background: #059669; }
`;

// Estilos de Form
export const StyledFormArea = styled.div`
    padding: 20px;
`;

export const ContentIconContainer = styled.div`
    font-size: 24px;
    color: #4b5563;
    margin-right: 10px;
    display: flex; 
    align-items: center;
    gap: 10px;
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const FormColum = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    @media (max-width: 768px){ grid-template-columns: 1fr; }
`;

export const FormInputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const FormInputLabelRequired = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
    &::after { content: "*"; color: red; margin-left: 2px; }
`;

export const FormInputLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

export const Limitador = styled.div`
    width: 100%;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
`;

// Alerta Modal
export const AlertContainer = styled.div`
    padding: 30px;
    text-align: center;
`;

export const AlertText = styled.h2`
    color: #ef4444;
    margin-bottom: 20px;
`;

export const AlertButton = styled.button`
    padding: 10px 20px;
    background: #333;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;

// Financeiro na Lista
export const FinanceiroList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const FinanceiroListElementContainer = styled.li`
    padding: 8px;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    &:hover { background: #f8fafc; }
`;

export const FinanceiroListElement = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
`;

export const FinanceiroListValue = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const FinanceiroListIconContainer = styled.span`
    display: flex;
    align-items: center;
`;

// Modal Solicitação (Reuso de estilos)
export const SolicitacaoModalContainer = styled(DetailContractContainer)``;
export const SolicitacaoTitleContainer = styled(DetailContractHeaderContainer)``;
export const SolicitacaoModalTitle = styled(DetailContractHeaderTitle)``;
export const SolicitacaoModalContent = styled(DetailContractDataContainer)``;
export const DataColumn = styled(DetailContractDataColumnLeft)``;
export const DataContainer = styled(DetailContractValueContainer)``;
export const SolicitacaoModalContentLabel = styled(DetailContractDataLabel)``;
export const SolicitacaoModalContentValue = styled(DetailContractDataValue)``;

// Deletar
export const DeleteContainer = styled.div`
    padding: 30px;
    text-align: center;
`;
export const DeleteTitle = styled.h3`
    margin-bottom: 20px;
    color: #1e293b;
`;
export const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

// PDF Preview (apenas wrapper simples)
export const PdfPreview = styled.div`
    font-size: 3rem;
    color: #ef4444;
    text-align: center;
    margin: 20px 0;
`;

export const SelectedAptTitleContainer = styled.div`
    text-align: center;
    margin: 20px 0;
`;
export const SelectedAptTitle = styled.h3`
    color: #3b82f6;
`;