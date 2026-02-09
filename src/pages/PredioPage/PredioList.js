import { useState, useMemo } from "react";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
// Componentes e Serviços
import { FinalidadeSelected, FormInput } from "../../components/FormLib";
import { deletePredioById, updatePredio } from "../../services/predioService";
import Pagination from "../../components/Pagination";
import { modalStyles } from "../../styles/ModalStyles";

// Estilos
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

const PredioList = ({ predios, refreshData, search, page, setPage, itemsPerPage }) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();

    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [deletting, setDeletting] = useState(false);

    const [selectedPredio, setSelectedPredio] = useState({});
    const [selectedFinalidade, setSelectedFinalidade] = useState(null);

    // --- MANIPULAÇÃO DE MODAIS ---
    const openEditModal = (predio) => {
        setSelectedPredio(predio);
        // Ajusta para o formato que o Select espera (pode variar dependendo da sua lib, aqui assumo string ou obj)
        setSelectedFinalidade(predio.finalidade);
        setModalEditIsOpen(true);
    };

    const closeEditModal = () => {
        setModalEditIsOpen(false);
        setSelectedPredio({});
    };

    const openDeleteModal = (predio) => {
        setSelectedPredio(predio);
        setModalDeleteIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
        setSelectedPredio({});
    };

    // --- LÓGICA DE FILTRO E PAGINAÇÃO ---
    const filteredPredios = useMemo(() =>
        predios.filter(predio =>
            predio.nome?.toLowerCase().includes(search.toLowerCase()) ||
            predio.cidade?.toLowerCase().includes(search.toLowerCase())
        ), [predios, search]);

    const totalPages = Math.ceil(filteredPredios.length / itemsPerPage);
    const currentPageItems = filteredPredios.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            {/* CABEÇALHO DA LISTA */}
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Cidade</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>

            {/* LISTA DE ITENS */}
            {currentPageItems.map((predio) => (
                <SinglePredio key={predio.id} onClick={() => navigate(`/predios/${predio.id}`)}>
                    <PredioSingleContainer>
                        <StyledLabel>Prédio: </StyledLabel>
                        <PredioValue>{predio.nome}</PredioValue>
                    </PredioSingleContainer>

                    <PredioSingleContainer>
                        <StyledLabel>Cidade: </StyledLabel>
                        <PredioValue>{predio.cidade}</PredioValue>
                    </PredioSingleContainer>

                    <AdminPredioContainer>
                        <EditIcon onClick={(e) => { e.stopPropagation(); openEditModal(predio); }}>
                            <FaEdit />
                        </EditIcon>
                        <DeleteIcon onClick={(e) => { e.stopPropagation(); openDeleteModal(predio); }}>
                            <FaTrash />
                        </DeleteIcon>
                    </AdminPredioContainer>
                </SinglePredio>
            ))}

            {/* --- MODAL DE EDIÇÃO --- */}
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                style={modalStyles}
                contentLabel="Editar Prédio"
            >
                <StyledFormArea>
                    <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', gap: '10px' }}>
                        <FaFileInvoice size={24} color="#333" />
                        <PredioCounter>Editar Prédio</PredioCounter>
                    </div>

                    <Formik
                        initialValues={{
                            id: selectedPredio.id,
                            nome: selectedPredio.nome || '',
                            endereco: selectedPredio.endereco || '',
                            cidade: selectedPredio.cidade || '',
                            estado: selectedPredio.estado || '',
                            bairro: selectedPredio.bairro || '',
                            numApt: selectedPredio.numApt || 0,
                            kwhPrice: selectedPredio.kwhPrice || 0,
                            finalidade: selectedPredio.finalidade || '',
                        }}
                        validationSchema={
                            Yup.object({
                                nome: Yup.string().required("Obrigatório"),
                                endereco: Yup.string().required("Obrigatório"),
                                cidade: Yup.string().required("Obrigatório"),
                                estado: Yup.string().required("Obrigatório").max(2),
                                numApt: Yup.number().required('Obrigatório'),
                                kwhPrice: Yup.number().required('Obrigatório'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                            // Atualiza a finalidade com o valor do estado local
                            if (selectedFinalidade) {
                                values.finalidade = selectedFinalidade.value || selectedFinalidade;
                            }

                            // Serviço V2: sem passar 'user'
                            await updatePredio(values, setSubmitting, setFieldError);

                            refreshData(); // Recarrega a lista
                            closeEditModal();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormContent>
                                    {/* COLUNA 1 */}
                                    <FormColum>
                                        <FormInputArea>
                                            <FormInputLabelRequired>Nome</FormInputLabelRequired>
                                            <FormInput type="text" name='nome' placeholder="Nome do Prédio" />
                                        </FormInputArea>

                                        <FormInputArea>
                                            <FormInputLabelRequired>Endereço</FormInputLabelRequired>
                                            <FormInput type="text" name='endereco' placeholder="Endereço" />
                                        </FormInputArea>

                                        <FormInputArea>
                                            <FormInputLabelRequired>Finalidade</FormInputLabelRequired>
                                            <FinalidadeSelected
                                                handleChange={setSelectedFinalidade}
                                                initialValue={selectedFinalidade}
                                            />
                                        </FormInputArea>
                                    </FormColum>

                                    {/* COLUNA 2 */}
                                    <FormColum>
                                        <SubItensContainer>
                                            <FormInputArea>
                                                <FormInputLabelRequired>Qtd. Apts</FormInputLabelRequired>
                                                <Limitador>
                                                    <FormInput type="number" name='numApt' />
                                                </Limitador>
                                            </FormInputArea>

                                            <FormInputArea>
                                                <FormInputLabelRequired>Estado</FormInputLabelRequired>
                                                <LimitadorAlt>
                                                    <FormInput type="text" name='estado' maxLength={2} />
                                                </LimitadorAlt>
                                            </FormInputArea>
                                        </SubItensContainer>

                                        <SubItensContainer>
                                            <FormInputArea>
                                                <FormInputLabelRequired>kWh (R$)</FormInputLabelRequired>
                                                <LimitadorAlt>
                                                    <FormInput type="number" name='kwhPrice' step="0.01" />
                                                </LimitadorAlt>
                                            </FormInputArea>

                                            <FormInputArea>
                                                <FormInputLabelRequired>Bairro</FormInputLabelRequired>
                                                <Limitador>
                                                    <FormInput type="text" name='bairro' />
                                                </Limitador>
                                            </FormInputArea>
                                        </SubItensContainer>

                                        <FormInputArea>
                                            <FormInputLabelRequired>Cidade</FormInputLabelRequired>
                                            <FormInput type="text" name='cidade' />
                                        </FormInputArea>
                                    </FormColum>
                                </FormContent>

                                <ButtonGroup>
                                    <BackButton type='button' onClick={closeEditModal}>
                                        Cancelar
                                    </BackButton>

                                    {!isSubmitting ? (
                                        <SubmitButton type="submit">Salvar Alterações</SubmitButton>
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
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
                contentLabel="Excluir Prédio"
            >
                <DeleteContainer>
                    <DeleteTitle>
                        Deseja realmente excluir o prédio <strong>{selectedPredio.nome}</strong>?
                    </DeleteTitle>
                    <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '20px' }}>
                        Essa ação não pode ser desfeita e pode afetar apartamentos vinculados.
                    </p>

                    {deletting ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ThreeDots color={'#dc2626'} height={40} width={40} />
                        </div>
                    ) : (
                        <DeleteButtonContainer>
                            <BackButton onClick={closeDeleteModal}>Cancelar</BackButton>

                            <SubmitButton
                                onClick={async () => {
                                    setDeletting(true);
                                    // Serviço V2: Sem user, passa refreshData como callback opcional ou chama depois
                                    await deletePredioById(selectedPredio.id, setDeletting);
                                    refreshData();
                                    closeDeleteModal();
                                }}
                                style={{ backgroundColor: '#dc2626' }} // Vermelho para perigo
                            >
                                Confirmar Exclusão
                            </SubmitButton>
                        </DeleteButtonContainer>
                    )}
                </DeleteContainer>
            </Modal>

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer>
    );
}

export default PredioList;