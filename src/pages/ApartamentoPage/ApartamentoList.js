import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { FaEdit, FaTrash, FaList, FaMap, FaFileInvoice, FaDoorOpen } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import { FormInput } from "../../components/FormLib";
import { deleteApartamentoById, updateApartamento, getApartamentosByPredioId } from "../../services/apartamentoService";
import Pagination from "../../components/Pagination";
import { modalStyles } from "../../styles/ModalStyles";
import { ListRow } from "../../components/ListRow";
import LayoutPlanta from "./LayoutPlanta";

import {
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
    PredioListContainer,
    RadioContainer,
    RadioItemContainer,
    RadioLabel,
    StyledFormArea,
    SubItensContainer,
    SubmitButton
} from "./ApartamentoPage.styles";

const STATUS_STYLE = {
    VAGO: { icon: '#10b981', pillColor: '#059669', pillBg: '#d1fae5', label: 'Vago' },
    OCUPADO: { icon: '#ef4444', pillColor: '#dc2626', pillBg: '#fee2e2', label: 'Ocupado' },
    MANUTENCAO: { icon: '#f59e0b', pillColor: '#d97706', pillBg: '#fef3c7', label: 'Manutenção' },
};

const ApartamentoList = ({ apartamentos, refreshData, page, setPage, totalPages }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [selectedApartamento, setSelectedApartamento] = useState({});
    const [deletting, setDeletting] = useState(false);
    const [showVisualMap, setShowVisualMap] = useState(false);

    // A planta visual precisa do prédio INTEIRO (30 apartamentos), não apenas da página atual
    // da listagem principal (que agora vem paginada do servidor). Por isso, ao ativar o modo
    // planta, buscamos separadamente todos os apartamentos do prédio via rota dedicada
    // (/predios/:id/apartamentos, que não foi paginada nesta mudança de contrato).
    const [plantaApartamentos, setPlantaApartamentos] = useState([]);
    const [loadingPlanta, setLoadingPlanta] = useState(false);

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

    // A lista já vem pronta (filtrada e paginada) do backend via ApartamentoPage.
    const currentPageItems = apartamentos;

    // Lógica para detectar se deve mostrar o botão de Mapa (baseada na página atual)
    const hasFlatFersa = apartamentos.some(apt =>
        apt.predio?.nome?.toLowerCase().includes("fersa")
    );

    // Ao ativar a planta visual, busca TODOS os apartamentos do prédio Flat Fersa
    // (a listagem principal está paginada e não teria os 30 apartamentos necessários).
    useEffect(() => {
        if (showVisualMap && hasFlatFersa) {
            const fersaApt = apartamentos.find(apt => apt.predio?.nome?.toLowerCase().includes("fersa"));
            const predioId = fersaApt?.predio?.id || fersaApt?.predioId;
            if (predioId) {
                setLoadingPlanta(true);
                getApartamentosByPredioId(predioId, setPlantaApartamentos)
                    .finally(() => setLoadingPlanta(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showVisualMap, hasFlatFersa]);

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
                loadingPlanta ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
                        <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                    </div>
                ) : (
                    <LayoutPlanta
                        apartamentos={plantaApartamentos}
                        setSelectedApartamento={(apt) => openEditModal(apt)}
                    />
                )
            ) : (
                <>
                    {currentPageItems.map((apartamento) => {
                        const st = STATUS_STYLE[apartamento.status] || STATUS_STYLE.VAGO;
                        return (
                            <ListRow
                                key={apartamento.id}
                                onClick={() => navigate(`/apartamentos/${apartamento.id}`)}
                                icon={<FaDoorOpen />}
                                iconColor={st.icon}
                                title={`Apto ${apartamento.numero}`}
                                subtitle={apartamento.predio?.nome}
                                statusLabel={st.label}
                                statusColor={st.pillColor}
                                statusBg={st.pillBg}
                                actions={
                                    <>
                                        <EditIcon onClick={() => openEditModal(apartamento)}>
                                            <FaEdit />
                                        </EditIcon>
                                        <DeleteIcon onClick={() => openDeleteModal(apartamento)}>
                                            <FaTrash />
                                        </DeleteIcon>
                                    </>
                                }
                            />
                        );
                    })}

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