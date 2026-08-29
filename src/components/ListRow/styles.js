import styled from 'styled-components';

export const RowContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    background: #fff;
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 10px;
    border: 1px solid #eef0f3;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    cursor: ${p => p.$clickable ? 'pointer' : 'default'};
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;

    &:hover {
        transform: ${p => p.$clickable ? 'translateY(-2px)' : 'none'};
        box-shadow: ${p => p.$clickable ? '0 6px 16px rgba(0,0,0,0.07)' : '0 1px 2px rgba(0,0,0,0.03)'};
        border-color: ${p => p.$clickable ? '#e5e7eb' : '#eef0f3'};
    }

    @media (max-width: 640px) {
        padding: 12px;
        gap: 10px;
    }
`;

export const IconBox = styled.div`
    width: 42px;
    height: 42px;
    min-width: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    background: ${p => p.$color || '#3b82f6'};
`;

export const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

export const PrimaryText = styled.span`
    font-size: 15px;
    font-weight: 700;
    color: #1f2937;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SecondaryText = styled.span`
    font-size: 13px;
    color: #6b7280;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TrailingArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 8px;
    flex-shrink: 0;
`;

export const ActionsArea = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: 8px;
    flex-shrink: 0;

    svg {
        font-size: 17px;
    }
`;

export const StatusPill = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    color: ${p => p.$color || '#374151'};
    background: ${p => p.$bg || '#f3f4f6'};
`;

export const ListSection = styled.div`
    display: flex;
    flex-direction: column;
`;
