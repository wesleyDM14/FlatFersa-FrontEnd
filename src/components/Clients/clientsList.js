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
    ClientLabel
} from './../Styles.js';
import {
    FaEdit,
    FaTrash,
    FaWhatsapp,
    FaAngleUp,
    FaAngleDown
} from 'react-icons/fa';

const ClientList = ({ clients, navigate }) => {

    const [nameUp, setNameUp] = useState(true);
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
        </ClientListContainer>
    )
}

export default ClientList;