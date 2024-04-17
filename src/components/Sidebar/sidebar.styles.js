import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f3f4f6;
    margin-bottom: 30px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.img`
    width: 55px;
    object-fit: contain;
`;

export const ImgBackCircle = styled.div`
    background: #fff;
    border-radius: 20%;
`;

export const Title = styled.h1`
    font-size: 18px;
    display: inline;
    margin-left: 15px;
`;

export const IconTitleContainer = styled.div`
    font-size: 18px;
    display: none;
    @media only screen and (max-width: 978px){
        display: inline;
    }
`;

export const Menu = styled.div``;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    color: #f3f4f6;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;

    &:hover{
        background-color: rgba(62, 161, 117, 0.3);
        border-radius: 3px;
    }
`;

export const ItemTitle = styled.a`
    text-decoration: none;
    color: #a5aaad;
    font-weight: 700;
    cursor: pointer;
`;

export const IconItemContainer = styled.div`
display: flex;
    font-size: 18px;
    margin-right: 10px;
    align-items: center;
`;

export const SubTitle = styled.h2`
    color: #3ea175;
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 5px;
    padding: 0 10px;
    font-weight: 700;
`;

export const LogoutContainer = styled.div`
    display: flex;
    margin-top: 20px;
    padding: 10px;
    color: #e65061;
`;

export const LogoutTitle = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: #e65061;
    font-weight: 700;
    text-transform: uppercase;
`;