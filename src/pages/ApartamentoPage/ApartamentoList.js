import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { FaEdit, FaTrash, FaList, FaMap, FaFileInvoice } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import { FormInput } from "../../components/FormLib";
import { deleteApartamentoById, updateApartamento } from "../../services/apartamentoService";
import Pagination from "../../components/Pagination";
import { modalStyles } from "../../styles/ModalStyles";
import LayoutPlanta from "./LayoutPlanta";

import {
    AdminPredioContainer,
    ApartamentoCounter,
    BackButton,
    ButtonGroup,
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

const ApartamentoList = ({ apartamentos, refreshData, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [selectedApartamento, setSelectedApartamento] = useState({});
    const [deletting, setDeletting] = useState(false);
    const [showVisualMap, setShowVisualMap] = useState(false);

    // --- MANIPULAÇÃO DE MODAIS ---
    const openEditModal = (apartamento) => {
        setSelectedApartamento(apartamento);
        setModalEditIsOpen(true);
    };

    const closeEditModal = () => {
        setModalEditIsOpen(false);
        setSelectedApartamento({});
    };

    const openDeleteModal = (apartamento) => {
        setSelectedApartamento(apartamento);
        setModalDeleteIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
        setSelectedApartamento({});
    };

    // --- FILTRAGEM ---
    const filteredApartamentos = useMemo(() =>
        apartamentos.filter(apt =>
            apt.numero?.toString().includes(search) ||
            apt.predio?.nome.toLowerCase().includes(search.toLowerCase())
        ), [apartamentos, search]);

    // Lógica para detectar se deve mostrar o botão de Mapa
    const hasFlatFersa = filteredApartamentos.some(apt =>
        apt.predio?.nome.toLowerCase().includes("fersa")
    );

    // Paginação
    const totalPages = Math.ceil(filteredApartamentos.length / itemsPerPage);
    const currentPageItems = filteredApartamentos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            {/* BOTÃO DE ALTERNAR VISUALIZAÇÃO (SÓ SE TIVER FLAT FERSA NA LISTA) */}
            {hasFlatFersa && (
                <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => setShowVisualMap(!showVisualMap)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 16px', borderRadius: '5px',
                            border: '1px solid #3b82f6', background: showVisualMap ? '#3b82f6' : 'white',
                            color: showVisualMap ? 'white' : '#3b82f6', cursor: 'pointer', fontWeight: '600'
                        }}
                    >
                        {showVisualMap ? <><FaList /> Ver Lista</> : <><FaMap /> Ver Planta Visual</>}
                    </button>
                </div>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL: PLANTA OU LISTA */}
            {showVisualMap && hasFlatFersa ? (
                <LayoutPlanta
                    apartamentos={filteredApartamentos}
                    setSelectedApartamento={(apt) => openEditModal(apt)}
                />
            ) : (
                <>
                    <PredioListHeader>
                        <ListLabel>Número</ListLabel>
                        <ListLabel>Prédio</ListLabel>
                        <ListLabel>Status</ListLabel>
                        <ListLabel>Opções</ListLabel>
                    </PredioListHeader>

                    {currentPageItems.map((apartamento) => (
                        <SinglePredio key={apartamento.id} onClick={() => navigate(`/apartamentos/${apartamento.id}`)}>
                            <PredioSingleContainer>
                                <StyledLabel>Número: </StyledLabel>
                                <PredioValue>{apartamento.numero}</PredioValue>
                            </PredioSingleContainer>
                            <PredioSingleContainer>
                                <StyledLabel>Prédio: </StyledLabel>
                                <PredioValue>{apartamento.predio?.nome}</PredioValue>
                            </PredioSingleContainer>
                            <PredioSingleContainer>
                                <StyledLabel>Status: </StyledLabel>
                                <PredioValue
                                    style={{ color: apartamento.status === 'OCUPADO' ? '#ef4444' : '#10b981', fontWeight: 700 }}
                                >
                                    {apartamento.status}
                                </PredioValue>
                            </PredioSingleContainer>
                            <AdminPredioContainer>
                                <EditIcon onClick={(e) => { e.stopPropagation(); openEditModal(apartamento); }}>
                                    <FaEdit />
                                </EditIcon>
                                <DeleteIcon onClick={(e) => { e.stopPropagation(); openDeleteModal(apartamento); }}>
                                    <FaTrash />
                                </DeleteIcon>
                            </AdminPredioContainer>
                        </SinglePredio>
                    ))}

                    <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
                </>
            )}

            {/* --- MODAL DE EDIÇÃO --- */}
            <Modal isOpen={modalEditIsOpen} onRequestClose={closeEditModal} style={modalStyles}>
                <StyledFormArea>
                    <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', gap: '10px' }}>
                        <FaFileInvoice size={20} color="#555" />
                        <ApartamentoCounter>Editar Apartamento {selectedApartamento.numero}</ApartamentoCounter>
                    </div>
                    <Formik
                        initialValues={{
                            id: selectedApartamento.id,
                            numero: selectedApartamento.numero,
                            valorBase: selectedApartamento.valorBase,
                            climatizado: selectedApartamento.climatizado || false,
                        }}
                        validationSchema={Yup.object({
                            numero: Yup.number().required("Obrigatório"),
                            valorBase: Yup.number().required("Obrigatório"),
                        })}
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            await updateApartamento(values, setSubmitting, setFieldError);
                            refreshData();
                            closeEditModal();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormContent>
                                    <FormColum>
                                        <SubItensContainer>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Nº do Apartamento</FormInputLabelRequired>
                                                <Limitador>
                                                    <FormInput type="number" name="numero" placeholder="Número" />
                                                </Limitador>
                                            </FormInputArea>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Valor Aluguel (R$)</FormInputLabelRequired>
                                                <Limitador>
                                                    <FormInput type="number" step="0.01" name="valorBase" placeholder="Valor" />
                                                </Limitador>
                                            </FormInputArea>
                                        </SubItensContainer>
                                    </FormColum>
                                    <FormColum>
                                        <RadioContainer>
                                            <RadioItemContainer>
                                                <RadioLabel>Climatizado?</RadioLabel>
                                                <Field name='climatizado' type='checkbox' />
                                            </RadioItemContainer>
                                        </RadioContainer>
                                    </FormColum>
                                </FormContent>
                                <ButtonGroup>
                                    <BackButton type='button' onClick={closeEditModal}>Cancelar</BackButton>
                                    {!isSubmitting ? (
                                        <SubmitButton type="submit">Salvar</SubmitButton>
                                    ) : (
                                        <ThreeDots color={'#4e4e4e'} height={30} width={50} />
                                    )}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                </StyledFormArea>
            </Modal>

            {/* --- MODAL DE EXCLUSÃO --- */}
            <Modal isOpen={modalDeleteIsOpen} onRequestClose={closeDeleteModal} style={modalStyles}>
                <DeleteContainer>
                    <DeleteTitle>Excluir Apartamento {selectedApartamento.numero}?</DeleteTitle>
                    {deletting ? (
                        <ThreeDots color={'#dc2626'} height={40} width={40} />
                    ) : (
                        <DeleteButtonContainer>
                            <BackButton onClick={closeDeleteModal}>Cancelar</BackButton>
                            <SubmitButton
                                onClick={async () => {
                                    setDeletting(true);
                                    await deleteApartamentoById(selectedApartamento.id, setDeletting);
                                    refreshData();
                                    closeDeleteModal();
                                }}
                                style={{ backgroundColor: '#dc2626' }}
                            >
                                Excluir
                            </SubmitButton>
                        </DeleteButtonContainer>
                    )}
                </DeleteContainer>
            </Modal>
        </PredioListContainer>
    );
};

export default ApartamentoList;