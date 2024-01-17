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
import { cpf } from 'cpf-cnpj-validator';

//icons
import {
    FiMail,
    FiUser,
    FiPhone,
    FiFileText,
} from 'react-icons/fi';

//loader
import { ThreeDots } from 'react-loader-spinner';

//auth & redux
import { connect } from 'react-redux';
import { signupUser } from '../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Signup = ({ signupUser }) => {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const navigate = useNavigate();

    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle size={30} color={colors.theme}>Novo Acesso</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        nome: "",
                        cpf: "",
                        telefone: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Endereço de email inválido").required("Obrigatório"),
                            nome: Yup.string().required("Obrigatório"),
                            cpf: Yup.string().required("Obrigatório").test((value) => cpf.isValid(value)),
                            telefone: Yup.string().matches(phoneRegExp, 'Numero de telefone inválido')
                                .min(11, 'Telefone curto').max(11, 'Telefone Longo').required("Obrigatório"),
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        console.log(values);
                        signupUser(values, navigate, setFieldError, setSubmitting);
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
                                name='cpf'
                                type='text'
                                label='CPF'
                                placeholder='Digite seu cpf'
                                icon={<FiFileText />}
                            />
                            <TextInput
                                name='nome'
                                type='text'
                                label='Nome'
                                placeholder='Digite seu nome'
                                icon={<FiUser />}
                            />
                            <TextInput
                                name='telefone'
                                type='text'
                                label='Telefone'
                                placeholder='Digite seu Telefone'
                                icon={<FiPhone />}
                            />
                            <ButtonGroup>
                                {
                                    !isSubmitting && (
                                        <StyledFormButton type='submit'>Solicitar</StyledFormButton>
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
                    Já possui cadastro? <TextLink to='/login'>Login</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                Todos os direitos resevados &copy; 2024
            </CopyrightText>
        </div>
    )
}

export default connect(null, { signupUser })(Signup);