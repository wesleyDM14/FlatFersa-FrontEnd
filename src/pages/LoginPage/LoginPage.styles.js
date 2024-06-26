import styled from "styled-components";

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || props.theme.colors.light};
    padding: 54px 55px;
`;

export const Avatar = styled.div`
    width: 85px;
    height: 85px;
    border-radius: 50px;
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: center;
    margin: auto;
`;

export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) => props.theme.colors.theme};
    padding: 5px;
    margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 16px;
    border: 2px solid ${props => props.theme.colors.theme};
    border-radius: 25px;
    color: ${props => props.theme.colors.theme};
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${props => props.theme.colors.theme};
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
    }
`;

export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledLink = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: ${props => props.theme.colors.dark1};

    &:hover{
        color: ${props => props.theme.colors.dark2};
        transform: scale(1.1);
        text-decoration: underline;
    }
`;

export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormColum = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

export const FormInputArea = styled.div`
    box-sizing: inherit;
    margin-bottom: 20px;
`;

export const FormInputLabelRequired = styled.p`
    font-weight: 600;
    margin-bottom: 5px;

    &::after{
        display: inline-block;
        content: "*";
        margin-left: 2px;
        color: ${props => props.theme.colors.theme};
    }
`;

export const FormInputLabel = styled.p`
    font-weight: 600;
    margin-bottom: 5px;
`;

export const FormTextInput = styled.input`
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    align-items: center;
    border: 1px solid #0a0a0a0d;
    border-radius: 4px;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    line-height: 1.5;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const ButtonFormGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px 35px;

    @media only screen and (max-width: 978px){
        justify-content: center;
        padding: 30px 10px;
    }
`;

export const BackButton = styled.button`
    cursor: pointer;
    margin-right: 15px;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 4px;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 80px;
    transition: all .2s ease-out;
    background-color: transparent;
    color: ${props => props.theme.colors.secondary};

    &:hover{
        background-color: ${props => props.theme.colors.light2};
    }

    @media only screen and (max-width: 978px){
        min-width: 45%;
    }
`;

export const SubmitButton = styled.button`
    cursor: pointer;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 4px;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 80px;
    transition: all .2s ease-out;
    background-color: #000;;
    color: ${props => props.theme.colors.primary};

    &:hover{
        background-color: #000A;
    }

    @media only screen and (max-width: 978px){
        min-width: 45%;
    }
`;

export const SubItensContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media only screen and (max-width: 978px){
        display: flex;
        flex-direction: column;
    }
`;

export const Limitador = styled.div`
    max-width: 90%;

    @media only screen and (max-width: 978px){
        max-width: 100%;
    }
`;

export const StyledFileArea = styled.div`
    text-align: center;
    border: 2px dashed #dbdbdb;
    max-width: 100%;
    width: 90%;
    background-color: #fff;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    padding-bottom: calc(.5em - 1px);
    padding-left: calc(.75em - 1px);
    padding-right: calc(.75em - 1px);
    padding-top: calc(.5em - 1px);
    cursor: pointer;
    position: relative;

    &:hover{
        border-color: #000;
    }
`;

export const StyledFileIconContainer = styled.div`
    font-size: 60px;
    color: ${props => props.theme.colors.secondary};
`;

export const StyledFileInputTitle = styled.h3`

`;

export const StyledFileLegend = styled.p`
    font-size: 0.87rem;
    color: #bbcada;
`;

export const StyledFileInput = styled.input`
    opacity: 0;
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

export const Image = styled.img`
    max-width: 100%;
    width: 50%;
`;