import {
    StyledFormArea,
    StyledFormButton,
    Avatar,
    StyledTitle,
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText,
} from './../components/Styles';

import Logo from './../assets/logo.png';

//formik
import { Formik, Form } from 'formik';
import { TextInput } from './../components/FormLib';
import * as Yup from 'yup';

//icons
import {
    FiMail,
    FiLock
} from 'react-icons/fi';

//loader
import { ThreeDots } from 'react-loader-spinner';

//auth & redux
import { connect } from 'react-redux';
import { loginUser } from '../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser }) => {

    const navigate = useNavigate();

    return (
        <div>
            <StyledFormArea>
                <Avatar $image={Logo} />
                <StyledTitle size={30} color={colors.theme}>Área de Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Endereço de email inválido").required("Obrigatório"),
                            password: Yup.string().min(8, "Senha curta").max(30, "Senha longa").required("Obrigatório"),
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
                                placeholder='Digite seu email'
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
                                {
                                    !isSubmitting && (
                                        <StyledFormButton type='submit'>Login</StyledFormButton>
                                    )
                                }
                                {
                                    isSubmitting && (
                                        <ThreeDots
                                            color={colors.theme}
                                            height={49}
                                            width={100}
                                        />
                                    )
                                }
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    Não possui cadastro? <TextLink to='/signup'>Cadastrar</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                Todos os direitos resevados &copy; 2024
            </CopyrightText>
        </div>
    )
}

export default connect(null, { loginUser })(Login);