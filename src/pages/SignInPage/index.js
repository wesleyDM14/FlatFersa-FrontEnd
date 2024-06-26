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

const SingInPage = () => {

    const navigate = useNavigate();
    const [selectedBackImage, setSelectedBackImage] = useState();
    const [selectedFrontImage, setSelectedFrontImage] = useState();
    const [date, setDate] = useState(new Date());

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
    const FILE_SIZE = 5 * 1024 * 1024; //tamanho máximo 5MB

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
                            name: Yup.string().required('Nome é Obrigatório').min(2, 'Nome deve ter no mínimo 2 caracteres'),
                            cpf: Yup.string().required('CPF é obrigatório').matches(/^\d{11}$/, 'CPF inválido'),
                            rg: Yup.string().required('RG é obrigatório').min(9, 'RG deve ter no mínimo 9 caracteres'),
                            dateBirth: Yup.date().required('Data de nascimento é obrigatória').nullable(),
                            phone: Yup.string().required('Telefone é obrigatório').matches(/^\d{10,11}$/, 'Telefone inválido'),
                            address: Yup.string().required('Endereço é obrigatório'),
                            email: Yup.string().required('Email é obrigatório').email('Email inválido'),
                            documentBack: Yup.mixed().required('Documento de Identificação é Obrigatório').test('fileSize', 'O arquivo é muito grande', value => value && value.size <= FILE_SIZE).test('fileFormat', 'Formato de arquivo não suportado', value => value && SUPPORTED_FORMATS.includes(value.type)),
                            documentFront: Yup.mixed().required('Documento de Identificação é Obrigatório').test('fileSize', 'O arquivo é muito grande', value => value && value.size <= FILE_SIZE).test('fileFormat', 'Formato de arquivo não suportado', value => value && SUPPORTED_FORMATS.includes(value.type)),
                        })
                    }
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        values.dateBirth = date;
                        await requestCreateClient(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                    {
                        ({ isSubmitting, setFieldValue, values }) => (
                            <Form>
                                <FormContent>
                                    <FormInputArea>
                                        <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                        <FormInput
                                            type='text'
                                            name='name'
                                            placeholder='Nome do cliente'
                                        />
                                    </FormInputArea>
                                    <FormInputArea>
                                        <FormInputLabelRequired>Email</FormInputLabelRequired>
                                        <FormInput
                                            type='text'
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
                                                    placeholder='CPF do cliente'
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
                                        <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                        <FormInput
                                            type='text'
                                            name='address'
                                            placeholder='Endereço do cliente'
                                        />
                                    </FormInputArea>
                                    <SubItensContainer>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Data de Nascimento</FormInputLabelRequired>
                                            <Limitador>
                                                <StyledDatePicker selectedDate={date} setSelectedDate={setDate} />
                                            </Limitador>
                                        </FormInputArea>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Telefone</FormInputLabelRequired>
                                            <Limitador>
                                                <MaskedInput
                                                    name='phone'
                                                    type='text'
                                                    mask='(99)99999-9999'
                                                    value={values.phone}
                                                />
                                            </Limitador>
                                        </FormInputArea>
                                    </SubItensContainer>
                                    <FormInputArea>
                                        <FormInputLabel>Documento de Identificação (Frente)</FormInputLabel>
                                        <StyledFileArea>
                                            {
                                                selectedFrontImage ? (
                                                    <Image
                                                        src={selectedFrontImage}
                                                    />
                                                ) : (
                                                    <div>
                                                        <StyledFileIconContainer>
                                                            <FaCloudUploadAlt />
                                                        </StyledFileIconContainer>
                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                        <StyledFileLegend>Tamanho máximo 5MB</StyledFileLegend>
                                                    </div>
                                                )
                                            }
                                            <StyledFileInput
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    setFieldValue('documentFront', file);
                                                    setSelectedFrontImage(file ? URL.createObjectURL(file) : undefined);
                                                }}
                                            />
                                        </StyledFileArea>
                                    </FormInputArea>
                                    <FormInputArea>
                                        <FormInputLabel>Documento de Identificação (Verso)</FormInputLabel>
                                        <StyledFileArea>
                                            {
                                                selectedBackImage ? (
                                                    <Image
                                                        src={selectedBackImage}
                                                    />
                                                ) : (
                                                    <div>
                                                        <StyledFileIconContainer>
                                                            <FaCloudUploadAlt />
                                                        </StyledFileIconContainer>
                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                        <StyledFileLegend>Tamanho máximo 5MB</StyledFileLegend>
                                                    </div>
                                                )
                                            }
                                            <StyledFileInput
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    setFieldValue('documentBack', file);
                                                    setSelectedBackImage(file ? URL.createObjectURL(file) : undefined);
                                                }}
                                            />
                                        </StyledFileArea>
                                    </FormInputArea>
                                </FormContent>
                                <ButtonFormGroup>
                                    <BackButton type='button' onClick={() => navigate('/login')}>Voltar</BackButton>
                                    {!isSubmitting && (
                                        <SubmitButton type="submit">Solicitar Acesso</SubmitButton>
                                    )}
                                    {
                                        isSubmitting && (
                                            <ThreeDots
                                                color={'#4e4e4e'}
                                                height={49}
                                                width={100}
                                            />
                                        )
                                    }
                                </ButtonFormGroup>
                            </Form>
                        )
                    }
                </Formik>
            </StyledFormArea>
        </StyledContainer >
    )
}

export default SingInPage;