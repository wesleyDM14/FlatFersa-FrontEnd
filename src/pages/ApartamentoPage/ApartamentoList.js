import { useState, useMemo } from "react";
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
import { deleteApartamentoById, updateApartamento } from "../../services/apartamentoService";
import Pagination from "../../components/Pagination";

const ApartamentoList = ({ apartamentos, user, setLoading, setLoading2, navigate, search, page, setPage, itemsPerPage }) => {
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

    const filteredApartamentos = useMemo(() =>
        apartamentos.filter(apartamento =>
            apartamento.apartamento.numero.toString().includes(search) ||
            apartamento.predio.nome.toLowerCase().includes(search.toLowerCase())
        ), [apartamentos, search]);

    const totalPages = Math.ceil(filteredApartamentos.length / itemsPerPage);
    const currentPageItems = filteredApartamentos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Numero</ListLabel>
                <ListLabel>Prédio</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                currentPageItems.map((apartamento) => (
                    <SinglePredio key={apartamento.apartamento.id}>
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
                            await deleteApartamentoById(user, selectedApartamento.id, setLoading, setLoading2);
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
                            id: selectedApartamento.id,
                            numero: selectedApartamento.numero,
                            valorBase: selectedApartamento.valorBase,
                            climatizado: selectedApartamento.climatizado,
                        }}
                        validationSchema={
                            Yup.object({
                                numero: Yup.number().required("Obrigatório"),
                                valorBase: Yup.number().required("Obrigatótio"),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            await updateApartamento(user, values, setLoading, setLoading2, setSubmitting, setFieldError);
                        }}
                    >
                        {
                            ({ isSubmitting }) => (
                                <Form>
                                    <FormContent>
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
                                        <FormColum>
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
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default ApartamentoList;