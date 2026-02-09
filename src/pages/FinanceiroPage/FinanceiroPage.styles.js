import styled from "styled-components";

// Layout Principal
export const MainFinanceiroContainer = styled.main`
    padding: 20px 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media (max-width: 768px){
        padding: 15px;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 100%;
`;

export const HeaderFinanceiroContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    flex-wrap: wrap;
    gap: 15px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

// Cards
export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    width: 100%;
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

export const FinanceiroCounter = styled.span`
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
`;

// Conteúdo e Tabela
export const ContentFinanceiroContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    padding: 20px;
    min-height: 400px;
`;

export const ContentFinanceiroHeader = styled.div`
    margin-bottom: 20px;
`;

export const SearcherContainer = styled.div`
    width: 100%;
`;

export const PredioListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PredioListHeader = styled.div`
    display: grid;
    /* Ajuste de colunas: Cliente(se admin) | Vencimento | Valor | Status */
    grid-template-columns: ${props => props.$isAdmin ? '2fr 1.5fr 1fr 1fr' : '1.5fr 1fr 1fr'};
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
    grid-template-columns: ${props => props.$isAdmin ? '2fr 1.5fr 1fr 1fr' : '1.5fr 1fr 1fr'};
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
`;

// Detalhes da Parcela (ParcelaInfo)
export const PrestacaoDetailMainContainer = styled.div`
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    margin-top: 20px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
`;

export const PrestacaoDetailHeaderContainer = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export const PrestacaoDetailHeaderTitle = styled.h2`
    font-size: 1.5rem;
    color: #1e293b;
    margin: 0;
`;

export const PrestcaoDetailContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media (max-width: 900px){
        grid-template-columns: 1fr;
    }
`;

export const PrestacaoDetailLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PrestacaoDetailRightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PrestacaoDetailValueContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px 0;
`;

export const PrestacaoDetailLabel = styled.span`
    font-weight: 600;
    color: #64748b;
`;

export const PrestacaoDetailValue = styled.span`
    font-weight: 700;
    color: #0f172a;
`;

export const PrestacaoDetailPagamentoContainer = styled.div`
    text-align: center;
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
`;

export const QrCodePagamento = styled.img`
    max-width: 200px;
    margin: 15px 0;
`;

export const QrCodeCopiaEColaContainer = styled.div`
    background: #e2e8f0;
    padding: 10px;
    border-radius: 4px;
    word-break: break-all;
    font-size: 0.8rem;
    font-family: monospace;
    max-height: 100px;
    overflow-y: auto;
`;

export const QrCodeCopiaECola = styled.p``;

// Botões Detalhes
export const PrestacaoDetailButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
    flex-wrap: wrap;

    @media (max-width: 768px){
        justify-content: center;
    }
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    &:hover { background: #f1f5f9; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    &:hover { background: #059669; }
`;

export const RejectButton = styled.button`
    padding: 10px 20px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s;
    &:hover { background: #dc2626; }
`;

// Comprovante
export const ComprovanteContainer = styled.div`
    text-align: center;
`;
export const ComprovanteTitle = styled.h3`
    margin-bottom: 10px;
    color: #334155;
`;
export const ComprovanteImg = styled.img`
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
`;
export const ComprovanteIconContainer = styled.div`
    font-size: 3rem;
    color: #10b981;
    margin-bottom: 10px;
`;
export const WaitingContainer = styled.div`
    text-align: center;
    padding: 30px;
    color: #94a3b8;
`;
export const WaitingIcon = styled.div` font-size: 3rem; margin-top: 10px; `;
export const WaitingTitle = styled.h3``;

export const PdfPreview = styled.div` font-size: 40px; color: red; text-align: center; `;

// Estados Vazios
export const NoContentContainer = styled.div` display: flex; flex-direction: column; align-items: center; padding: 50px; color: #94a3b8; `;
export const NoContentAvisoContainer = styled.div` margin-top: 20px; `;
export const TextContent = styled.p` font-size: 1.2rem; `;