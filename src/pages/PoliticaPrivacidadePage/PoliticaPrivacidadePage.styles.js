import styled from "styled-components";

export const PoliticaContainer = styled.main`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const ContentContainer = styled.div`
    min-height: 100vh;
    padding: 20px 35px;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #fff;
`;

export const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
`;

export const ContentTitle = styled.h1`
    font-size: 34px;
    color: #545454;
`;

export const ContentBody = styled.div`
`;

export const ContentParagraph = styled.p`
    margin: 0 0 24px;
    font-size: 1em;
    font-weight: normal;
    color: #545454;
`;

export const ContentSubTitle = styled.h2`
    color: #545454;
`;

export const ContentList = styled.ul`
    margin-left: 30px;
`;

export const ContentListItem = styled.li`
    color: #545454;
`;

export const Link = styled.a`
    text-decoration: underline;
    color: ${props => props.theme.colors.textGreen};
`;