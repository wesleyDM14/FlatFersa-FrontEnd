import styled from "styled-components";
import { Card } from '@mui/material';

export const DashboardContainer = styled.div`
    grid-area: main;
    padding: 2rem;
    background: #f8fafc;

    @media only screen and (max-width: 978px){
        padding: 0;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const ChartCard = styled(Card)`
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    max-height: 600px; 

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const InfoCard = styled(Card)`
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`;

export const RecentActivity = styled(ChartCard)`
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
    }
`;

export const CardTitle = styled.h3`
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: #1e293b;
`;

export const StatNumber = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 0.5rem;
`;

export const StatBadge = styled.span`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: ${props => props.color || '#e2e8f0'};
    color: white;
    font-size: 0.875rem;
`;

export const Divider = styled.div`
    height: 1px;
    background: #e2e8f0;
    margin: 1rem 0;
`;

export const IconContainer = styled.div`
    background: ${props => props.color};
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

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

export const DashBoardHeaderContainer = styled.div`
    margin-bottom: 15px;
`;

export const HeaderTitle = styled.h1``;

export const DashboardContentContainer = styled.div``;