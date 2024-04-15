import {
    StyledTitle,
    StyledSubTitle,
    Avatar,
    StyledButton,
    ButtonGroup,
    LogoContainer,
    StyledContainer,
    Container
} from './HomePage.styles';

import logo from '../../assets/favicon.png';

const HomePage = () => {

    return (
        <StyledContainer>
            <Container>
                <LogoContainer>
                    <Avatar image={logo} />
                </LogoContainer>
                <StyledTitle size={65}> Bem Vindo ao Flat Fersa</StyledTitle>
                <StyledSubTitle size={27}>
                    O sistema para gerenciar seu aluguel de flat's.
                </StyledSubTitle>
                <ButtonGroup>
                    <StyledButton to='/login' >Login</StyledButton>
                </ButtonGroup>
            </Container>
        </StyledContainer>
    );

}

export default HomePage;