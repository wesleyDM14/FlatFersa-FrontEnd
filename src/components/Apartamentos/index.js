import { useState, useEffect } from "react";
import {
    ButtonGroup,
    LoadingContainer,
    MainContainer,
    MainHeader,
    MainIconTitleContainer,
    MainRegisterContainer,
    MainRegisterIconContainer,
    MainRegisterTitle,
    MainTitle,
    MainTitleContainer,
    StyledFormArea,
    StyledFormButton,
    StyledTitle,
    colors,
    modalStyles,
} from "./../Styles";
import {
    FaGlobe,
    FaHotel,
    FaMoneyBillWave,
    FaPlusCircle
} from "react-icons/fa";
import { Tb123 } from 'react-icons/tb';
import Modal from 'react-modal';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { TextInput } from "./../FormLib";
import { ThreeDots } from "react-loader-spinner";
import { getAllApartment, registerApartment } from "../../auth/actions/apartmentActions";
import ApartmentList from "./apartmentsList";

const AptMain = ({ user, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const [apartamentos, setApartamentos] = useState([]);
    const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openRegisterModal = () => {
        setModalRegisterIsOpen(true);
    }

    const closeRegisterModal = () => {
        setModalRegisterIsOpen(false);
    }

    useEffect(() => {
        async function loadDataApartments() {
            if (loading) {
                let temp = await getAllApartment(user, { setLoading });
                setApartamentos(temp);
            }
        }
        loadDataApartments();
    }, [user, loading]);

    return (
        <main>
            <MainContainer>
                <MainHeader>
                    <MainTitleContainer>
                        <MainIconTitleContainer>
                            <FaHotel />
                        </MainIconTitleContainer>
                        <MainTitle>Apartamentos</MainTitle>
                    </MainTitleContainer>
                    <MainRegisterContainer>
                        <MainRegisterIconContainer onClick={openRegisterModal}>
                            <FaPlusCircle />
                        </MainRegisterIconContainer>
                        <MainRegisterTitle>Adicionar</MainRegisterTitle>
                    </MainRegisterContainer>
                </MainHeader>
                <Modal
                    isOpen={modalRegisterIsOpen}
                    onRequestClose={closeRegisterModal}
                    style={modalStyles}
                >
                    <StyledFormArea>
                        <StyledTitle color={colors.theme} size={30}>Cadastro de Apartamento</StyledTitle>
                        <Formik
                            initialValues={{
                                number: '',
                                baseValue: '',
                                building: '',
                            }}
                            validationSchema={
                                Yup.object({
                                    number: Yup.number().required("Obrigatório"),
                                    baseValue: Yup.number().required('Obrigatótio'),
                                    building: Yup.string(),
                                })
                            }
                            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                await registerApartment(values, user, { closeRegisterModal, setSubmitting, setFieldError });
                            }}
                        >
                            {
                                ({ isSubmitting }) => (
                                    <Form>
                                        <TextInput
                                            name='number'
                                            type='number'
                                            label='Número'
                                            placeholder='Digite o número do apartamento'
                                            icon={<Tb123 />}
                                            width={350}
                                        />
                                        <TextInput
                                            name='baseValue'
                                            type='number'
                                            step='0.2'
                                            label='Valor de Aluguel'
                                            placeholder='Digite o valor do aluguel'
                                            icon={<FaMoneyBillWave />}
                                            width={350}
                                        />
                                        <TextInput
                                            name="building"
                                            type="text"
                                            label="Prédio/Cidade"
                                            placeholder="Digite a localidade"
                                            icon={<FaGlobe />}
                                            width={350}
                                        />
                                        <ButtonGroup>
                                            {
                                                !isSubmitting && (
                                                    <StyledFormButton type='submit'>
                                                        Registrar
                                                    </StyledFormButton>
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
                                )
                            }
                        </Formik>
                    </StyledFormArea>
                </Modal>
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={colors.dark3}
                                height={80}
                                width={300}
                            />
                        </LoadingContainer>
                    ) : (
                        <ApartmentList user={user} apartments={apartamentos} setLoading={setLoading} navigate={navigate} />
                    )
                }
            </MainContainer>
        </main>
    )
}

export default AptMain;