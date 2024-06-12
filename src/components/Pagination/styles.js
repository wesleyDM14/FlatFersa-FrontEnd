import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const PaginationButton = styled.button`
    background-color: #FFF;
    border: 1px solid #ddd;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:disabled{
        background-color: #ddd;
        cursor: not-allowed;
    }
`;