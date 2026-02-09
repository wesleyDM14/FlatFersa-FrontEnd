import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";
import { FiMail, FiLock } from "react-icons/fi";
import logo from '../../assets/favicon.png';
import {
    StyledFormArea,
    Avatar,
    StyledTitle,
    ButtonGroup,
    StyledFormButton,
    StyledContainer,
    StyledLink
} from './LoginPage.styles';
import { loginUser } from "../../services/userService";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <StyledContainer>
            <StyledFormArea>
                <Avatar $image={logo} />
                <StyledTitle size={30} color="#333">
                    Acesso ao Sistema
                </StyledTitle>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string()
                                .email("Endereço de email inválido")
                                .required("O e-mail é obrigatório"),
                            password: Yup.string()
                                .required("A senha é obrigatória"),
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        loginUser(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <TextInput
                                name='email'
                                type='text'
                                label='Email'
                                placeholder='exemplo@email.com'
                                icon={<FiMail />}
                            />

                            <TextInput
                                name='password'
                                type='password'
                                label='Senha'
                                placeholder='********'
                                icon={<FiLock />}
                            />

                            <ButtonGroup>
                                {!isSubmitting && (
                                    <StyledFormButton type='submit'>
                                        Entrar
                                    </StyledFormButton>
                                )}

                                {isSubmitting && (
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                        <ThreeDots color="#d32f2f" height={45} width={50} />
                                    </div>
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

                <div style={{ marginTop: '25px', textAlign: 'center' }}>
                    <StyledLink to="/signin">
                        Não tem conta? <strong>Solicitar Acesso</strong>
                    </StyledLink>
                </div>
                <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#999' }}>
                    © Flat Fersa V2
                </p>
            </StyledFormArea>
        </StyledContainer>
    )
}

export default LoginPage;