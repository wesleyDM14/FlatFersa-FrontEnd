import { useState } from "react";
import Modal from "react-modal";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import {
    AdminPredioContainer,
    ApartamentoCounter,
    BackButton,
    ButtonGroup,
    ContentIconContainer,
    DeleteButtonContainer,
    DeleteContainer,
    DeleteIcon,
    DeleteTitle,
    EditIcon,
    FormColum,
    FormContent,
    FormInputArea,
    FormInputLabelRequired,
    Limitador,
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    RadioContainer,
    RadioItemContainer,
    RadioLabel,
    SinglePredio,
    StyledFormArea,
    StyledLabel,
    SubItensContainer,
    SubmitButton
} from "./ApartamentoPage.styles";

import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { modalStyles } from "../../styles/ModalStyles";
import { ThreeDots } from "react-loader-spinner";
import { FormInput } from "../../components/FormLib";
import { deleteApartamentoById } from "../../services/apartamentoService";

const ApartamentoList = ({ apartamentos, user, setLoading, setLoading2, navigate }) => {
    Modal.setAppElement(document.getElementById('root'));

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [selectedApartamento, setSelectedApartamento] = useState({});

    const openEditModal = () => {
        setModalEditIsOpen(true);
    }

    const closeEditModal = () => {
        setModalEditIsOpen(false);
    }

    const openDeleteModal = () => {
        setModalDeleteIsOpen(true);
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
    }

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Numero</ListLabel>
                <ListLabel>Prédio</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                apartamentos.map((apartamento) => (
                    <SinglePredio key={apartamento.apartamento.numeroContrato}>
                        <PredioSingleContainer>
                            <StyledLabel>Número: </StyledLabel>
                            <PredioValue>{apartamento.apartamento.numero}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Prédio: </StyledLabel>
                            <PredioValue>{apartamento.predio.nome}</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon onClick={() => {
                                setSelectedApartamento(apartamento.apartamento);
                                openEditModal();
                            }}>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon onClick={() => {
                                setSelectedApartamento(apartamento.apartamento);
                                openDeleteModal();
                            }}>
                                <FaTrash />
                            </DeleteIcon>
                        </AdminPredioContainer>
                    </SinglePredio>
                ))
            }
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Apartamento {selectedApartamento.numero}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <BackButton onClick={() => {
                            setSelectedApartamento({});
                            closeDeleteModal();
                        }}>
                            Cancelar
                        </BackButton>
                        <SubmitButton onClick={async () => {
                            await deleteApartamentoById(user, selectedApartamento.numeroContrato, setLoading, setLoading2);
                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                style={modalStyles}
            >
                <StyledFormArea>
                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                        <ContentIconContainer>
                            <FaFileInvoice />
                        </ContentIconContainer>
                        <ApartamentoCounter>Editar Apartamento</ApartamentoCounter>
                    </div>
                    <Formik
                        initialValues={{
                            numeroContrato: selectedApartamento.numeroContrato,
                            numero: selectedApartamento.numero,
                            valorBase: selectedApartamento.valorBase,
                            climatizado: selectedApartamento.climatizado,
                        }}
                        validationSchema={
                            Yup.object({
                                numeroContrato: Yup.string().required("Obrigatório"),
                                numero: Yup.number().required("Obrigatório"),
                                valorBase: Yup.number().required("Obrigatótio"),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            console.log(values);
                        }}
                    >
                        {
                            ({ isSubmitting }) => (
                                <Form>
                                    <FormContent>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nº Conta Contrato</FormInputLabelRequired>
                                                <FormInput
                                                    type="text"
                                                    name="numeroContrato"
                                                    placeholder="Conta contrato da COSERN"
                                                />
                                            </FormInputArea>
                                            <SubItensContainer>
                                                <RadioContainer>
                                                    <RadioItemContainer>
                                                        <RadioLabel>Climatizado?</RadioLabel>
                                                        <Field
                                                            name='climatizado'
                                                            type='checkbox'
                                                        />
                                                    </RadioItemContainer>
                                                </RadioContainer>
                                            </SubItensContainer>
                                        </FormColum>
                                        <FormColum>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Nº do Apartamento</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            type="number"
                                                            min="0"
                                                            step="1"
                                                            name="numero"
                                                            placeholder="Número do Apartamento"
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            type="number"
                                                            min="0.00"
                                                            step="0.01"
                                                            name="valorBase"
                                                            placeholder="Valor do Aluguel"
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                    </FormContent>
                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => closeEditModal()}>Voltar</BackButton>
                                        {!isSubmitting && (
                                            <SubmitButton type="submit">Salvar</SubmitButton>
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
                                    </ButtonGroup>
                                </Form>
                            )
                        }
                    </Formik>
                </StyledFormArea>
            </Modal>
        </PredioListContainer >
    );
}

export default ApartamentoList;