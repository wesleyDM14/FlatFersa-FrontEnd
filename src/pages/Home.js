import {
    StyledTitle,
    StyledSubTitle,
    Avatar,
    StyledButton,
    colors,
    ButtonGroup
} from './../components/Styles';

//Logo
import Logo from './../assets/logo.png';

const Home = () => {
    return (
        <div>
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                backgroundColor: 'transparent',
                width: '100%',
                padding: '80px',
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <Avatar image={Logo} />
            </div>
            <StyledTitle size={65} color={colors.primary}>
                Bem Vindo ao Flat Fersa
            </StyledTitle>
            <StyledSubTitle size={27} color={colors.light}>
                O sistema para gerenciar seu aluguel de flat.
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to='/login'>Login</StyledButton>
            </ButtonGroup>
        </div>
    )
}

export default Home;