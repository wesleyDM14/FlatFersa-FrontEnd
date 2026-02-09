import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';

import { FormInput, MaskedInput, StyledDatePicker } from "../../components/FormLib";
import logo from '../../assets/favicon.png';

import {
    Avatar,
    BackButton,
    ButtonFormGroup,
    FormContent,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    Image,
    Limitador,
    StyledContainer,
    StyledFileArea,
    StyledFileIconContainer,
    StyledFileInput,
    StyledFileInputTitle,
    StyledFileLegend,
    StyledFormArea,
    StyledTitle,
    SubItensContainer,
    SubmitButton,
} from "../LoginPage/LoginPage.styles";

import { FaCloudUploadAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { requestCreateClient } from "../../services/userService";

const SignInPage = () => {

    const navigate = useNavigate();
    const [selectedBackImage, setSelectedBackImage] = useState();
    const [selectedFrontImage, setSelectedFrontImage] = useState();
    const [date, setDate] = useState(new Date());

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
    const FILE_SIZE = 5 * 1024 * 1024; // 5MB

    return (
        <StyledContainer>
            <StyledFormArea>
                <Avatar $image={logo} />
                <StyledTitle size={30}>Solicitação de Acesso</StyledTitle>

                <Formik
                    initialValues={{
                        name: '',
                        cpf: '',
                        rg: '',
                        dateBirth: new Date(),
                        phone: '',
                        address: '',
                        email: '',
                        documentFront: null,
                        documentBack: null
                    }}
                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string().required('Nome é Obrigatório').min(2, 'Nome muito curto'),
                            cpf: Yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'), // Ajustei regex para bater com a máscara
                            rg: Yup.string().required('RG é obrigatório'),
                            dateBirth: Yup.date().required('Data de nascimento obrigatória').nullable(),
                            phone: Yup.string().required('Telefone é obrigatório'),
                            address: Yup.string().required('Endereço é obrigatório'),
                            email: Yup.string().required('Email é obrigatório').email('Email inválido'),
                            documentFront: Yup.mixed()
                                .required('Frente do RG/CNH obrigatória')
                                .test('fileSize', 'Arquivo muito grande (Max 5MB)', value => !value || (value && value.size <= FILE_SIZE))
                                .test('fileFormat', 'Formato inválido (Use JPG ou PNG)', value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
                            documentBack: Yup.mixed()
                                .required('Verso do RG/CNH obrigatório')
                                .test('fileSize', 'Arquivo muito grande (Max 5MB)', value => !value || (value && value.size <= FILE_SIZE))
                                .test('fileFormat', 'Formato inválido (Use JPG ou PNG)', value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
                        })
                    }
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        const formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('cpf', values.cpf);
                        formData.append('rg', values.rg);
                        formData.append('dateBirth', values.dateBirth.toISOString());
                        formData.append('phone', values.phone);
                        formData.append('address', values.address);
                        formData.append('email', values.email);
                        formData.append('documentFront', values.documentFront);
                        formData.append('documentBack', values.documentBack);

                        await requestCreateClient(formData, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <FormContent>
                                <FormInputArea>
                                    <FormInputLabelRequired>Nome Completo</FormInputLabelRequired>
                                    <FormInput
                                        type='text'
                                        name='name'
                                        placeholder='Nome do cliente'
                                    />
                                </FormInputArea>
                                <FormInputArea>
                                    <FormInputLabelRequired>Email</FormInputLabelRequired>
                                    <FormInput
                                        type='email'
                                        name='email'
                                        placeholder='Email do cliente'
                                    />
                                </FormInputArea>
                                <SubItensContainer>
                                    <FormInputArea>
                                        <FormInputLabelRequired>CPF</FormInputLabelRequired>
                                        <Limitador>
                                            <MaskedInput
                                                name='cpf'
                                                mask='999.999.999-99'
                                                value={values.cpf}
                                                type='text'
                                                placeholder='000.000.000-00'
                                                onChange={(e) => setFieldValue('cpf', e.target.value)}
                                            />
                                        </Limitador>
                                    </FormInputArea>
                                    <FormInputArea>
                                        <FormInputLabelRequired>RG</FormInputLabelRequired>
                                        <Limitador>
                                            <FormInput
                                                name='rg'
                                                type='text'
                                                placeholder='RG do cliente'
                                            />
                                        </Limitador>
                                    </FormInputArea>
                                </SubItensContainer>
                                <FormInputArea>
                                    <FormInputLabelRequired>Endereço Completo</FormInputLabelRequired>
                                    <FormInput
                                        type='text'
                                        name='address'
                                        placeholder='Rua, Número, Bairro...'
                                    />
                                </FormInputArea>
                                <SubItensContainer>
                                    <FormInputArea>
                                        <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                        <Limitador>
                                            <StyledDatePicker
                                                selectedDate={date}
                                                setSelectedDate={(newDate) => {
                                                    setDate(newDate);
                                                    setFieldValue('dateBirth', newDate);
                                                }}
                                            />
                                        </Limitador>
                                    </FormInputArea>
                                    <FormInputArea>
                                        <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                        <Limitador>
                                            <MaskedInput
                                                name='phone'
                                                mask='(99) 99999-9999'
                                                value={values.phone}
                                                type='text'
                                                placeholder='(00) 00000-0000'
                                                onChange={(e) => setFieldValue('phone', e.target.value)}
                                            />
                                        </Limitador>
                                    </FormInputArea>
                                </SubItensContainer>
                                <FormInputArea>
                                    <FormInputLabel>Documento (Frente)</FormInputLabel>
                                    <StyledFileArea>
                                        {selectedFrontImage ? (
                                            <Image src={selectedFrontImage} />
                                        ) : (
                                            <div>
                                                <StyledFileIconContainer>
                                                    <FaCloudUploadAlt />
                                                </StyledFileIconContainer>
                                                <StyledFileInputTitle>Clique para enviar</StyledFileInputTitle>
                                                <StyledFileLegend>JPG ou PNG (Max 5MB)</StyledFileLegend>
                                            </div>
                                        )}
                                        <StyledFileInput
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                if (file) {
                                                    setFieldValue('documentFront', file);
                                                    setSelectedFrontImage(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </StyledFileArea>
                                </FormInputArea>
                                <FormInputArea>
                                    <FormInputLabel>Documento (Verso)</FormInputLabel>
                                    <StyledFileArea>
                                        {selectedBackImage ? (
                                            <Image src={selectedBackImage} />
                                        ) : (
                                            <div>
                                                <StyledFileIconContainer>
                                                    <FaCloudUploadAlt />
                                                </StyledFileIconContainer>
                                                <StyledFileInputTitle>Clique para enviar</StyledFileInputTitle>
                                                <StyledFileLegend>JPG ou PNG (Max 5MB)</StyledFileLegend>
                                            </div>
                                        )}
                                        <StyledFileInput
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                if (file) {
                                                    setFieldValue('documentBack', file);
                                                    setSelectedBackImage(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </StyledFileArea>
                                </FormInputArea>

                            </FormContent>

                            <ButtonFormGroup>
                                <BackButton type='button' onClick={() => navigate('/login')}>
                                    Voltar
                                </BackButton>

                                {!isSubmitting && (
                                    <SubmitButton type="submit">Solicitar Acesso</SubmitButton>
                                )}

                                {isSubmitting && (
                                    <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                                )}
                            </ButtonFormGroup>
                        </Form>
                    )}
                </Formik>
            </StyledFormArea>
        </StyledContainer >
    )
}

export default SignInPage;