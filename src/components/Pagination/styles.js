import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
`;

export const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 34px;
    height: 34px;
    padding: 0 8px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background-color: #fff;
    color: #374151;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover:not(:disabled) {
        border-color: #be185d;
        color: #be185d;
    }

    &.active {
        background-color: #be185d;
        border-color: #be185d;
        color: #fff;
        cursor: default;
    }

    &:disabled:not(.active) {
        color: #d1d5db;
        cursor: not-allowed;
    }
`;

export const PaginationEllipsis = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 34px;
    height: 34px;
    color: #9ca3af;
    font-weight: 700;
`;
