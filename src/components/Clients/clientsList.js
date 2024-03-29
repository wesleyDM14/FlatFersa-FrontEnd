import { useState } from 'react';
import {
    ClientListContainer,
    ClientListHeader,
    ListLabel,
    SingleClient,
    ClientSingleContainer,
    ClientValue,
    AdminClientContainer,
    EditIcon,
    DeleteIcon,
    IconContactContaier,
    ClientContactContainer,
    ClientLabel,
    modalStyles,
    DeleteContainer,
    DeleteTitle,
    DeleteButtonContainer,
    CancelButton,
    ConfirmButton
} from './../Styles.js';
import {
    FaEdit,
    FaTrash,
    FaWhatsapp,
} from 'react-icons/fa';
import Modal from 'react-modal';
import { deleteClient } from '../../auth/actions/clientActions.js';

const ClientList = ({ user, clients, setLoading, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState({});

    const openDeleteModal = () => {
        setModalDeleteIsOpen(true);
    }

    const closeDeleteModal = () => {
        setModalDeleteIsOpen(false);
    }

    const openUpdateModal = () => {
        setModalUpdateIsOpen(true);
    }

    const closeUpdateModal = () => {
        setModalUpdateIsOpen(false);
    }

    return (
        <ClientListContainer>
            <ClientListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Contato</ListLabel>
            </ClientListHeader>
            {
                clients.map((client) => (
                    <SingleClient key={client.id}>
                        <ClientSingleContainer onClick={() => console.log('navigate')}>
                            <ClientLabel>Cliente: </ClientLabel>
                            <ClientValue>{client.name}</ClientValue>
                        </ClientSingleContainer>
                        <ClientContactContainer>
                            <IconContactContaier href={`https://whatsa.me/55${client.phone}`} target='_blank'>
                                <FaWhatsapp />
                            </IconContactContaier>
                            <ClientValue href={`https://whatsa.me/55${client.phone}`} target='_blank'>{client.phone}</ClientValue>
                        </ClientContactContainer>
                        <AdminClientContainer>
                            <EditIcon>
                                <FaEdit onClick={() => {
                                    setSelectedClient(client);
                                    openUpdateModal();
                                }} />
                            </EditIcon>
                            <DeleteIcon>
                                <FaTrash onClick={
                                    () => {
                                        setSelectedClient(client);
                                        openDeleteModal();
                                    }
                                } />
                            </DeleteIcon>
                        </AdminClientContainer>
                    </SingleClient>
                ))
            }
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Quer realmente excluir {selectedClient.name}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <CancelButton
                            onClick={() => {
                                setSelectedClient({});
                                closeDeleteModal();
                            }}
                        >
                            Cancelar
                        </CancelButton>
                        <ConfirmButton
                            onClick={async () => {
                                await deleteClient(user, selectedClient, { setLoading, closeDeleteModal });
                            }}
                        >
                            Confirmar
                        </ConfirmButton>
                    </DeleteButtonContainer>
                </DeleteContainer>
            </Modal>
        </ClientListContainer>
    )
}

export default ClientList;