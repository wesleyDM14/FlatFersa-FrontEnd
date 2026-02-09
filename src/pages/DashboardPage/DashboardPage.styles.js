import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f3f4f6;
    font-family: 'Inter', sans-serif;
`;

export const MainContent = styled.main`
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    height: 100vh;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 1rem;
        padding-bottom: 80px;
    }
`;

export const DashboardHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
    }

    p {
        color: #6b7280;
        margin-top: 0.5rem;
        font-size: 0.95rem;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

export const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const InfoCard = styled.div`
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: flex-start;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s;
    border: 1px solid #e5e7eb;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;

export const IconBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
    
    background-color: ${props => props.bg || props.color || '#3b82f6'};
    color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const CardContent = styled.div`
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const CardTitle = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.25rem;
`;

export const StatNumber = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
`;

export const StatBadge = styled.span`
    display: inline-flex;
    align-items: center;
    margin-top: 0.5rem;
    padding: 2px 8px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    width: fit-content;

    background-color: ${props => props.$positive ? '#d1fae5' : '#fee2e2'};
    color: ${props => props.$positive ? '#059669' : '#dc2626'};
`;

export const ChartCard = styled.div`
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    min-height: 400px;

    h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
        margin-bottom: 1.5rem;
    }
`;

export const RecentActivityTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.5rem;

    th {
        text-align: left;
        padding: 1rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: #6b7280;
        border-bottom: 2px solid #f3f4f6;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    td {
        padding: 1rem;
        font-size: 0.95rem;
        color: #374151;
        border-bottom: 1px solid #f3f4f6;
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover td {
        background-color: #f9fafb;
    }
`;

export const StatusPill = styled.span`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-align: center;
    min-width: 80px;

    color: white;
    background-color: ${props => {
        switch (props.status?.toUpperCase()) {
            case 'PAGO': return '#10b981';
            case 'PENDENTE': return '#f59e0b';
            case 'ATRASADO': return '#ef4444';
            case 'CANCELADO': return '#6b7280';
            default: return '#3b82f6';
        }
    }};
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #f3f4f6;
`;

export const ActionButton = styled.button`
    margin-top: 10px;
    padding: 10px 16px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background 0.2s;

    &:hover {
        background-color: #2563eb;
    }

    &:active {
        transform: scale(0.98);
    }
`;