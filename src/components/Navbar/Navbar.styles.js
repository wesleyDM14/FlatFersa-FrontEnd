import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
    grid-area: nav;
    height: 70px; /* Um pouco mais alto para respirar */
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    
    /* Sombra suave para destacar do fundo cinza do dashboard */
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    position: sticky;
    top: 0;
    z-index: 999;

    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;

export const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px; /* Espaço entre o nome e o avatar */
`;

export const NavbarIten = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #64748b; /* Cinza azulado moderno */
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
        color: #3b82f6; /* Azul destaque */
    }

    svg {
        font-size: 1.2rem;
    }
`;

export const NavbarShowIcon = styled.div`
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #333;
    margin-right: 15px;

    @media only screen and (max-width: 978px) {
        display: flex;
        align-items: center;
    }
`;

export const NavbarMenuContainer = styled.div`
    position: relative; /* Necessário para o Dropdown absoluto funcionar */
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const NavbarAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%; /* Totalmente redondo */
    
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    
    border: 2px solid #f1f5f9; /* Borda sutil */
    transition: transform 0.2s, border-color 0.2s;

    &:hover {
        transform: scale(1.05);
        border-color: #3b82f6;
    }
`;

/* O Dropdown agora é um card flutuante branco limpo */
export const DropDownMenu = styled.div`
    position: absolute;
    top: 55px; /* Logo abaixo do Avatar */
    right: 0; /* Alinhado à direita */
    width: 200px;
    
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
    
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    /* Animação suave de entrada */
    animation: fadeIn 0.2s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Pequeno triângulo CSS (Seta) apontando para cima */
    &::before {
        content: "";
        position: absolute;
        top: -6px;
        right: 12px;
        width: 12px;
        height: 12px;
        background: white;
        transform: rotate(45deg);
        border-top: 1px solid #f3f4f6;
        border-left: 1px solid #f3f4f6;
    }
`;

/* Pinguelo removido pois usamos o ::before acima que é mais limpo */
export const Pinguelo = styled.div`
    display: none; 
`;

export const BellContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.3rem;
    color: #64748b;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #f1f5f9;
        color: #3b82f6;
    }
`;

export const BellBadge = styled.span`
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: #ef4444;
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
`;

export const NotificationDropdown = styled(DropDownMenu)`
    width: 340px;
    max-height: 420px;
    overflow-y: auto;
    padding: 0.5rem 0.5rem 0.25rem;
`;

export const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px 10px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 5px;

    span:first-child {
        font-weight: 700;
        color: #1e293b;
        font-size: 0.9rem;
    }

    span:last-child {
        font-size: 0.75rem;
        color: #3b82f6;
        cursor: pointer;
        font-weight: 600;
    }
`;

export const NotificationItem = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${props => props.$unread ? '#eff6ff' : 'transparent'};
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${props => props.$unread ? '#e0edff' : '#f8fafc'};
    }

    & + & {
        margin-top: 2px;
    }
`;

export const NotificationIconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    min-width: 34px;
    border-radius: 9px;
    font-size: 14px;
    color: #fff;
    background: ${props => props.$color || '#3b82f6'};
    margin-top: 2px;
`;

export const NotificationTextColumn = styled.div`
    flex: 1;
    min-width: 0;
`;

export const NotificationTitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const NotificationTitle = styled.div`
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const UnreadDot = styled.span`
    width: 8px;
    height: 8px;
    min-width: 8px;
    border-radius: 50%;
    background: #ef4444;
`;

export const NotificationContent = styled.div`
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 3px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const NotificationTime = styled.div`
    font-size: 0.7rem;
    color: #9ca3af;
    margin-top: 4px;
    font-weight: 600;
`;

export const NotificationEmpty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    padding: 36px 10px;
    color: #9ca3af;
    font-size: 0.85rem;

    svg {
        font-size: 1.8rem;
        color: #d1d5db;
    }
`;

export const DropDownItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    
    /* Cor dinâmica (vermelho para sair, cinza para outros) */
    color: ${props => props.color ? props.color : '#4b5563'};
    
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f8fafc; /* Cinza bem claro */
        color: ${props => props.color ? '#dc2626' : '#3b82f6'};
    }

    svg {
        font-size: 1.1rem;
    }
`;