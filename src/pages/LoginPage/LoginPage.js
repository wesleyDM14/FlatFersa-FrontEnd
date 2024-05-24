import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";
import { TextInput } from "../../components/FormLib";
import * as Yup from 'yup';

import { ThreeDots } from "react-loader-spinner";
import logo from '../../assets/favicon.png';

import { FiMail, FiLock } from "react-icons/fi";

import {
    StyledFormArea,
    Avatar,
    StyledTitle,
    ButtonGroup,
    StyledFormButton,
    StyledContainer
} from './LoginPage.styles';

import { loginUser } from "../../services/userService";

const LoginPage = ({ loginUser }) => {

    const navigate = useNavigate();

    return (
        <StyledContainer>
            <StyledFormArea>
                <Avatar $image={logo} />
                <StyledTitle size={30}>Área de Login</StyledTitle>
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
                                width={350}
                            />
                            <TextInput
                                name='password'
                                type='password'
                                label='Senha'
                                placeholder='********'
                                icon={<FiLock />}
                                width={350}
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
                                            height={49}
                                            width={100}
                                        />
                                    )
                                }
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
            </StyledFormArea>
        </StyledContainer>
    )
}

export default connect(null, { loginUser })(LoginPage);