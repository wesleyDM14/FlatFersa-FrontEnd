import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #f9fafb;
    margin-bottom: 36px;
    padding: 0 4px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.img`
    width: 34px;
    object-fit: contain;
`;

export const ImgBackCircle = styled.div`
    background: #fff;
    border-radius: 10px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h1`
    font-size: 19px;
    font-weight: 800;
    display: inline;
    margin-left: 12px;
    letter-spacing: 0.2px;
`;

export const IconTitleContainer = styled.div`
    font-size: 18px;
    display: none;
    margin-left: auto;
    cursor: pointer;
    color: #9ca3af;

    @media only screen and (max-width: 978px){
        display: inline;
    }
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    color: #d1d5db;
    padding: 11px 12px;
    border-radius: 10px;
    margin-bottom: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover{
        background-color: rgba(255, 255, 255, 0.06);
    }

    &.active-menu-item {
        background: linear-gradient(90deg, rgba(236, 72, 153, 0.28), rgba(236, 72, 153, 0.06));
        color: #ffffff;
    }
`;

export const ItemTitle = styled.a`
    text-decoration: none;
    color: inherit;
    font-weight: 600;
    font-size: 14.5px;
`;

export const IconItemContainer = styled.div`
    display: flex;
    font-size: 17px;
    margin-right: 12px;
    align-items: center;
    color: inherit;
    width: 20px;
`;

export const SubTitle = styled.h2`
    color: #6b7280;
    font-size: 11px;
    margin-top: 22px;
    margin-bottom: 8px;
    padding: 0 12px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
`;

export const LogoutContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
    padding: 11px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: rgba(230, 80, 97, 0.12);
    }
`;

export const LogoutTitle = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: #f87171;
    font-weight: 700;
    font-size: 13.5px;
    letter-spacing: 0.3px;
`;
