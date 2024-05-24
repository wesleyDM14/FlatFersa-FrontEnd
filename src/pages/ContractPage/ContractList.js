import { useState } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import * as Yup from 'yup';

import { FaCheck, FaEdit, FaFileContract, FaTimes, FaTrash, FaUserAlt } from "react-icons/fa";
import {
    AdminPredioContainer,
    BackButton,
    ButtonGroup,
    ContratoCounter,
    DataColumn,
    DataContainer,
    DataIconContainer,
    DataSection,
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
    RejectButton,
    SinglePredio,
    SolicitacaoContratoDataContainer,
    SolicitacaoModalContainer,
    SolicitacaoModalContent,
    SolicitacaoModalContentLabel,
    SolicitacaoModalContentValue,
    SolicitacaoModalTitle,
    SolicitacaoTitleContainer,
    StyledFormArea,
    StyledLabel,
    SubItensContainer,
    SubTitle,
    SubmitButton
} from "./ContractPage.styles";

import { downloadContract } from "../../services/contratoService";
import { modalStyles } from "../../styles/ModalStyles";
import { FaHouse } from "react-icons/fa6";
import { FormInput, StyledSelect } from "../../components/FormLib";
import { ThreeDots } from "react-loader-spinner";

const ContractList = ({ contratos, user, setLoading, navigate }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalContractIsOpen, setModalContractIsOpen] = useState(false);
    const [selectedContrato, setSelectedContrato] = useState({});
    const [selectedPeriocidade, setSelectedPeriocidade] = useState({});

    const [periocidade, setPeriocidade] = useState([
        { label: 'Anualmente', value: 'ANUALMENTE' },
        { label: 'Semestralmente', value: 'SEMESTRALMENTE' },
    ]);

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

    const openContractModal = () => {
        !(modalEditIsOpen && modalDeleteIsOpen) && setModalContractIsOpen(true);
    }

    const closeContractModal = () => {
        setModalContractIsOpen(false);
    }

    return (
        <PredioListContainer>
            <PredioListHeader $isadmin={user.isAdmin.toString()}>
                {
                    user.isAdmin && (<ListLabel>Cliente</ListLabel>)
                }
                <ListLabel>Apartamento</ListLabel>
                <ListLabel>Status</ListLabel>
                {
                    user.isAdmin && (<ListLabel>Opções</ListLabel>)
                }
            </PredioListHeader>
            {
                contratos.map((contrato) => (
                    <SinglePredio
                        key={contrato.contrato.id}
                        $isadmin={user.isAdmin.toString()}
                        onClick={() => {
                            setSelectedContrato(contrato);
                            console.log(selectedContrato);
                            openContractModal();
                        }}
                    >
                        {
                            user.isAdmin && (
                                <PredioSingleContainer //onClick={async () => {
                                //await downloadContract(user, contrato.contrato.id);
                                >
                                    <StyledLabel>Cliente: </StyledLabel>
                                    <PredioValue>{contrato.cliente.name}</PredioValue>
                                </PredioSingleContainer>
                            )
                        }
                        <PredioSingleContainer >
                            <StyledLabel>Apartamento: </StyledLabel>
                            <PredioValue>{contrato.apartamento.numero}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Status: </StyledLabel>
                            <PredioValue>{contrato.contrato.statusContrato}</PredioValue>
                        </PredioSingleContainer>
                        {
                            user.isAdmin && (
                                <AdminPredioContainer>
                                    <EditIcon>
                                        <FaEdit
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedContrato(contrato);
                                                openEditModal();
                                            }}
                                        />
                                    </EditIcon>
                                    <DeleteIcon>
                                        <FaTrash
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedContrato(contrato);
                                                openDeleteModal();
                                            }}
                                        />
                                    </DeleteIcon>
                                </AdminPredioContainer>
                            )
                        }
                    </SinglePredio>
                ))
            }
            <Modal
                isOpen={modalContractIsOpen}
                onRequestClose={closeContractModal}
                style={modalStyles}
            >
                {
                    selectedContrato.contrato && (
                        selectedContrato.contrato.statusContrato === 'AGUARDANDO' ? (
                            <div>
                                <SolicitacaoModalContainer>
                                    <SolicitacaoTitleContainer>
                                        <SolicitacaoModalTitle>Detalhes da Solicitação</SolicitacaoModalTitle>
                                    </SolicitacaoTitleContainer>
                                    <SolicitacaoModalContent>
                                        <DataColumn>
                                            <DataSection>
                                                <DataIconContainer>
                                                    <FaUserAlt />
                                                </DataIconContainer>
                                                <SubTitle>Dados do Cliente</SubTitle>
                                            </DataSection>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Nome: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.cliente.name}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>CPF: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.cliente.cpf}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Nascimento: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{new Date(selectedContrato.cliente.dateBirth).toLocaleDateString()}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                        </DataColumn>
                                        <DataColumn>
                                            <DataSection>
                                                <DataIconContainer>
                                                    <FaHouse />
                                                </DataIconContainer>
                                                <SubTitle>Dados do Apartamento</SubTitle>
                                            </DataSection>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Número: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.apartamento.numero}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                            <DataContainer>
                                                <SolicitacaoModalContentLabel>Climatizado: </SolicitacaoModalContentLabel>
                                                <SolicitacaoModalContentValue>{selectedContrato.apartamento.climatizado ? <FaCheck color="#0F0" /> : <FaTimes color="#F00" />}</SolicitacaoModalContentValue>
                                            </DataContainer>
                                        </DataColumn>
                                    </SolicitacaoModalContent>
                                    <SolicitacaoContratoDataContainer>
                                        <DataSection>
                                            <DataIconContainer>
                                                <FaFileContract />
                                            </DataIconContainer>
                                            <SubTitle>Dados do Contrato</SubTitle>
                                        </DataSection>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Data de Incício: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>{new Date(selectedContrato.contrato.dataInicio).toLocaleDateString()}</SolicitacaoModalContentValue>
                                        </DataContainer>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Duração: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>{selectedContrato.contrato.duracaoContrato} Meses</SolicitacaoModalContentValue>
                                        </DataContainer>
                                        <DataContainer>
                                            <SolicitacaoModalContentLabel>Vencimento: </SolicitacaoModalContentLabel>
                                            <SolicitacaoModalContentValue>Todo dia {selectedContrato.contrato.diaVencimentoPagamento}</SolicitacaoModalContentValue>
                                        </DataContainer>
                                    </SolicitacaoContratoDataContainer>
                                    <StyledFormArea>
                                        <Formik
                                            initialValues={{
                                                contractoId: selectedContrato.contrato.id,
                                                valorAluguel: selectedContrato.apartamento.valorBase,
                                                limiteKwh: 0,
                                            }}

                                            validationSchema={Yup.object({
                                                valorAluguel: Yup.number().required('Obrigatório'),
                                                limiteKwh: Yup.number().required('Obrigatório'),
                                            })}

                                            onSubmit={(values, { setSubmitting, setFieldError }) => {
                                                console.log(values);
                                            }}
                                        >
                                            {
                                                ({ isSubmitting }) => (
                                                    <Form>
                                                        <FormContent>
                                                            <FormColum>
                                                                <FormInputArea>
                                                                    <StyledSelect options={periocidade} setSelectedOption={setSelectedPeriocidade} label='Periocidade de Reajuste' />
                                                                </FormInputArea>
                                                            </FormColum>
                                                            <FormColum>
                                                                <SubItensContainer>
                                                                    <FormInputArea>
                                                                        <FormInputLabelRequired>Limite de KWh</FormInputLabelRequired>
                                                                        <Limitador>
                                                                            <FormInput
                                                                                type="number"
                                                                                min="0"
                                                                                step="1"
                                                                                name="limiteKwh"
                                                                                placeholder="Valor limite de KWh"
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
                                                                                name="valorAluguel"
                                                                                placeholder="Valor do Aluguel"
                                                                            />
                                                                        </Limitador>
                                                                    </FormInputArea>
                                                                </SubItensContainer>
                                                            </FormColum>
                                                        </FormContent>
                                                        <ButtonGroup>
                                                            <BackButton
                                                                type='button'
                                                                onClick={() => {
                                                                    setSelectedContrato({});
                                                                    closeContractModal();
                                                                }}
                                                            >
                                                                Fechar
                                                            </BackButton>
                                                            <RejectButton
                                                                type='button'
                                                                onClick={() => console.log('rejeitou')}
                                                            >
                                                                Rejeitar
                                                            </RejectButton>
                                                            {!isSubmitting && (
                                                                <SubmitButton type="submit">Aprovar</SubmitButton>
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
                                </SolicitacaoModalContainer>
                            </div>
                        ) : (
                            <div>
                                <h1>Detalhes do contrato</h1>
                                <p>Histórico do Contrato</p>
                            </div>
                        )
                    )
                }
            </Modal>
            <Modal
                isOpen={modalEditIsOpen}
                onRequestClose={closeEditModal}
                style={modalStyles}
            >
                <h1>Modal Edit</h1>
            </Modal>
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Deseja excluir o Contrato?</DeleteTitle>
                    <ContratoCounter>Cliente: {selectedContrato.cliente && (selectedContrato.cliente.name)} / Apartamento: {selectedContrato.apartamento && (selectedContrato.apartamento.numero)}</ContratoCounter>
                    <DeleteButtonContainer>
                        <BackButton onClick={() => {
                            console.log(selectedContrato);
                            setSelectedContrato({});
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

export default ContractList;