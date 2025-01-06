import { useState, useMemo } from "react";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import {
    AdminPredioContainer,
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
    LimitadorAlt,
    ListLabel,
    PredioCounter,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    SinglePredio,
    StyledFormArea,
    StyledLabel,
    SubItensContainer,
    SubmitButton
} from "./PredioPage.styles";

import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { modalStyles } from "../../styles/ModalStyles";
import { ThreeDots } from "react-loader-spinner";
import { FinalidadeSelected, FormInput } from "../../components/FormLib";
import { deletePredioById, updatePredio } from "../../services/predioService";
import Pagination from "../../components/Pagination";

const PredioList = ({ predios, user, refreshData, navigate, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [selectedPredio, setSelectedPredio] = useState({});
    const [selectedFinalidade, setSelectedFinalidade] = useState('');

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

    const filteredPredios = useMemo(() =>
        predios.filter(predio =>
            predio.nome.toLowerCase().includes(search.toLowerCase()) ||
            predio.cidade.toLowerCase().includes(search.toLowerCase())
        ), [predios, search]);

    const totalPages = Math.ceil(filteredPredios.length / itemsPerPage);
    const currentPageItems = filteredPredios.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Cidade</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                currentPageItems.map((predio) => (
                    <SinglePredio
                        key={predio.id}
                    //onClick={() => navigate(`/predios/${predio.id}`)}
                    >
                        <PredioSingleContainer>
                            <StyledLabel>Prédio: </StyledLabel>
                            <PredioValue>{predio.nome}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Cidade: </StyledLabel>
                            <PredioValue>{predio.cidade}</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon onClick={(event) => {
                                event.stopPropagation();
                                setSelectedPredio(predio);
                                setSelectedFinalidade(predio.finalidade);
                                openEditModal();
                            }}>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon onClick={(event) => {
                                event.stopPropagation();
                                setSelectedPredio(predio);
                                setSelectedFinalidade(predio.finalidade);
                                openDeleteModal();
                            }}>
                                <FaTrash />
                            </DeleteIcon>
                        </AdminPredioContainer>
                    </SinglePredio>
                ))
            }
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
                        <PredioCounter>Editar Prédio</PredioCounter>
                    </div>
                    <Formik
                        initialValues={{
                            id: selectedPredio.id,
                            nome: selectedPredio.nome,
                            endereco: selectedPredio.endereco,
                            cidade: selectedPredio.cidade,
                            estado: selectedPredio.estado,
                            bairro: selectedPredio.bairro,
                            numApt: selectedPredio.numApt,
                            kwhPrice: selectedPredio.kwhPrice,
                            finalidade: selectedPredio.finalidade,
                        }}
                        validationSchema={
                            Yup.object({
                                nome: Yup.string().required("Obrigatório"),
                                endereco: Yup.string().required("Obrigatótio"),
                                cidade: Yup.string().required("Obrigatório"),
                                estado: Yup.string().required("Obrigatório").min(2).max(2, 'Apenas a Sigla do estado'),
                                bairro: Yup.string().required('Obrigatório'),
                                numApt: Yup.number().required('Obrigatório'),
                                kwhPrice: Yup.number().required('Obrigatório'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            values.finalidade = selectedFinalidade;
                            await updatePredio(user, values, setSubmitting, setFieldError);
                            refreshData();
                            closeEditModal();
                        }}
                    >
                        {
                            ({ isSubmitting }) => (
                                <Form>
                                    <FormContent>
                                        <FormColum>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                                <FormInput
                                                    type="text"
                                                    name='nome'
                                                    placeholder="Nome Identificador do Prédio"
                                                />
                                            </FormInputArea>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                                <FormInput
                                                    type="text"
                                                    name='endereco'
                                                    placeholder="Endereço e Número"
                                                />
                                            </FormInputArea>
                                            <FormInputArea>
                                                <FinalidadeSelected
                                                    handleChange={setSelectedFinalidade}
                                                    initialValue={selectedFinalidade}
                                                />
                                            </FormInputArea>
                                        </FormColum>
                                        <FormColum>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Qnt Apartamentos</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            type="number"
                                                            name='numApt'
                                                            step='1'
                                                            min='0'
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                                <SubItensContainer>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Estado</FormInputLabelRequired>
                                                        <LimitadorAlt>
                                                            <FormInput
                                                                type="text"
                                                                name='estado'
                                                                placeholder="Sigla"
                                                            />
                                                        </LimitadorAlt>
                                                    </FormInputArea>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>kWh (R$)</FormInputLabelRequired>
                                                        <LimitadorAlt>
                                                            <FormInput
                                                                type="number"
                                                                min="0.00"
                                                                step="0.01"
                                                                name="kwhPrice"
                                                                placeholder="R$"
                                                            />
                                                        </LimitadorAlt>
                                                    </FormInputArea>
                                                </SubItensContainer>
                                            </SubItensContainer>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <Limitador>
                                                        <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                                        <FormInput
                                                            type="text"
                                                            name='cidade'
                                                            placeholder="Cidade"
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                                <FormInputArea>
                                                    <Limitador>
                                                        <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                        <FormInput
                                                            type="text"
                                                            name='bairro'
                                                            placeholder="Bairro"
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
                                            </SubItensContainer>
                                        </FormColum>
                                    </FormContent>
                                    <ButtonGroup>
                                        <BackButton type='button' onClick={() => {
                                            closeEditModal();
                                            setSelectedPredio({});
                                        }}>
                                            Voltar
                                        </BackButton>
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
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Prédio {selectedPredio.nome}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <BackButton onClick={() => {
                            setSelectedPredio({});
                            closeDeleteModal();
                        }}>
                            Cancelar
                        </BackButton>
                        <SubmitButton onClick={async () => {
                            await deletePredioById(user, selectedPredio.id);
                            refreshData();
                            closeDeleteModal();
                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default PredioList;