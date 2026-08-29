import styled from 'styled-components';

export const MainPerfilContainer = styled.div`
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
    width: 100%;
    min-height: 70vh;
`;

export const HeaderPerfilContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
`;

export const HeaderTitle = styled.h2`
    font-size: 26px;
    color: ${props => props.theme.colors.titleColor};
    font-weight: 700;
`;

export const ContentPerfilContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// Card de Perfil
export const ProfileCard = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const SectionTitle = styled.h3`
    font-size: 1.1rem;
    color: #3b82f6;
    margin-bottom: 15px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 10px;
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
    gap: 15px;
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    
    @media (max-width: 600px){
        grid-template-columns: 1fr;
    }
`;

export const FormInputArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FormInputLabelRequired = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #334155;

    &::after{
        content: "*";
        color: red;
        margin-left: 2px;
    }
`;

export const FormInputLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #334155;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
`;

export const BackButton = styled.button`
    padding: 10px 20px;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    color: #555;

    &:hover { background: #f3f4f6; }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background: #000;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;

    &:hover { background: #333; }
`;

export const Limitador = styled.div`
    width: 100%;
`;

// Upload de Foto
export const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const AvatarImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #3b82f6;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const UploadButton = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    cursor: pointer;
    color: #3b82f6;
    font-weight: 600;
    font-size: 0.9rem;
    
    &:hover { text-decoration: underline; }
    
    input { display: none; }
`;