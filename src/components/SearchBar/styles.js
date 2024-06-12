import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const SearchInput = styled.input`
    width: 90%;
    margin-top: 15px;
    padding: 15px;
    padding-left: 50px;

    @media only screen and (max-width: 978px){
       width: 80%;
    }
`;

export const SearchIcon = styled.p`
    margin: auto;
    color: ${props => props.theme.colors.pcolor};
    position: absolute;
    font-size: 25px;
    top: 40%;
    left: 15px;
`;