import styled from "styled-components";

export const MainManutencaoContainer = styled.main`
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
    min-height: 70vh;
    width: 100%;
`;

export const HeaderManutencaoContainer = styled.div`
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
        border-color: #be185d;
        background-color: #fdf2f8;
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
    color: #be185d;
`;

export const ManutencaoCounter = styled.span`
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
`;

export const ContentManutencaoContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    padding: 20px;
    min-height: 400px;
`;

export const ContentManutencaoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

export const SearcherContainer = styled.div`
    width: 100%;
`;

export const PredioListContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NoContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    color: #94a3b8;
`;

export const NoContentAvisoContainer = styled.div`
    text-align: center;
`;

export const TextContent = styled.p`
    font-size: 1.1rem;
    font-weight: 600;
`;

export const StyledFormArea = styled.div`
    padding: 10px;
    max-width: 480px;
`;

export const FormInputArea = styled.div`
    margin-bottom: 18px;
`;

export const FormInputLabel = styled.label`
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
`;

export const FormInputLabelRequired = styled(FormInputLabel)`
    &::after {
        content: ' *';
        color: #dc2626;
    }
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    font-size: 0.95rem;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #be185d;
    }
`;

export const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    font-size: 0.95rem;
    font-family: inherit;
    resize: vertical;
    min-height: 90px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #be185d;
    }
`;

export const StyledSelectNative = styled.select`
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    font-size: 0.95rem;
    background: #fff;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #be185d;
    }
`;

export const FileInputArea = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 20px;
    border: 2px dashed #e5e7eb;
    border-radius: 10px;
    color: #94a3b8;
    font-size: 0.85rem;
    cursor: pointer;
    text-align: center;

    &:hover { border-color: #be185d; color: #be185d; }

    img { max-height: 140px; border-radius: 8px; }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #fff;
    color: #374151;
    font-weight: 600;
    cursor: pointer;

    &:hover { background: #f9fafb; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    background: #be185d;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:hover { background: #9d174d; }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const DetailSection = styled.div`
    margin-bottom: 20px;
`;

export const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;

    span:first-child {
        color: #64748b;
        font-size: 0.9rem;
    }

    span:last-child {
        font-weight: 600;
        color: #1e293b;
        text-align: right;
    }
`;

export const DetailPhoto = styled.img`
    width: 100%;
    max-height: 260px;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 10px;
`;

export const StatusButtonsRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
`;

export const StatusActionButton = styled.button`
    flex: 1;
    min-width: 120px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.color || '#be185d'};
    background: ${props => props.$active ? (props.color || '#be185d') : '#fff'};
    color: ${props => props.$active ? '#fff' : (props.color || '#be185d')};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${props => props.color || '#be185d'};
        color: #fff;
    }
`;
