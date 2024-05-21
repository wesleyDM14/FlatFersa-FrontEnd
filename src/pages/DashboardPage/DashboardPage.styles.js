import styled from "styled-components";

export const MainDashboardContainer = styled.main`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    margin-bottom: 28px;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const LoadingContainer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: main;

    @media only screen and (max-width: 978px){
        padding: 0 10px;
    }
`;

export const DashBoardHeaderContainer = styled.div``;

export const HeaderTitle = styled.h1``;

export const DashboardContentContainer = styled.div``;