import { useState } from "react";
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
import { FormInput } from "../../components/FormLib";



const PredioList = ({ predios, user, setLoading, navigate }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [selectedPredio, setSelectedPredio] = useState({});

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
                <ListLabel>Nome</ListLabel>
                <ListLabel>Cidade</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                predios.map((predio) => (
                    <SinglePredio key={predio.id}>
                        <PredioSingleContainer>
                            <StyledLabel>Prédio: </StyledLabel>
                            <PredioValue>{predio.nome}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Cidade: </StyledLabel>
                            <PredioValue>{predio.cidade}</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon onClick={() => {
                                setSelectedPredio(predio);
                                openEditModal();
                            }}>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon onClick={() => {
                                setSelectedPredio(predio);
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
                            nome: selectedPredio.nome,
                            endereco: selectedPredio.endereco,
                            cidade: selectedPredio.cidade,
                            estado: selectedPredio.estado,
                            bairro: selectedPredio.bairro,
                            numApt: selectedPredio.numApt,
                        }}
                        validationSchema={
                            Yup.object({
                                nome: Yup.string().required("Obrigatório"),
                                endereco: Yup.string().required("Obrigatótio"),
                                cidade: Yup.string().required("Obrigatório"),
                                estado: Yup.string().required("Obrigatório").min(2).max(2, 'Apenas a Sigla do estado'),
                                bairro: Yup.string().required('Obrigatório'),
                                numApt: Yup.number().required('Obrigatório')
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            //await createPredio(values, user, navigate, setSubmitting, setFieldError);
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
                                        </FormColum>
                                        <FormColum>
                                            <SubItensContainer>
                                                <FormInputArea>
                                                    <FormInputLabelRequired>Estado</FormInputLabelRequired>
                                                    <Limitador>
                                                        <FormInput
                                                            type="text"
                                                            name='estado'
                                                            placeholder="Sigla do Estado"
                                                        />
                                                    </Limitador>
                                                </FormInputArea>
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
                        <SubmitButton onClick={() => {

                        }}>
                            Excluir
                        </SubmitButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
        </PredioListContainer >
    );
}

export default PredioList;