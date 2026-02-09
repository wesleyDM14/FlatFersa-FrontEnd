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