import { useState } from 'react';
import {
    ClientListContainer,
    ListLabel,
    ClientSingleContainer,
    ClientValue,
    AdminClientContainer,
    EditIcon,
    DeleteIcon,
    ApartmentListHeader,
    SingleApartment,
    DeleteContainer,
    DeleteTitle,
    DeleteButtonContainer,
    CancelButton,
    ConfirmButton,
    modalStyles
} from './../Styles.js';
import {
    FaEdit,
    FaTrash,
} from 'react-icons/fa';
import Modal from 'react-modal';
import { deleteApartment } from '../../auth/actions/apartmentActions.js';

const ApartmentList = ({ user, apartments, setLoading, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState({});

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
            <ApartmentListHeader>
                <ListLabel>Número</ListLabel>
                <ListLabel>Localização</ListLabel>
                <ListLabel>Status</ListLabel>
            </ApartmentListHeader>
            {
                apartments.map((apartment) => (
                    <SingleApartment key={apartment.id}>
                        <ClientSingleContainer onClick={() => console.log('navigate')}>
                            <ClientValue>{apartment.number}</ClientValue>
                        </ClientSingleContainer>
                        <ClientSingleContainer onClick={() => console.log('navigate')}>
                            <ClientValue>{apartment.building}</ClientValue>
                        </ClientSingleContainer>
                        <ClientSingleContainer>
                            <ClientValue>{apartment.ocupado ? 'Ocupado' : 'Vago'}</ClientValue>
                        </ClientSingleContainer>
                        <AdminClientContainer>
                            <EditIcon>
                                <FaEdit onClick={() => {
                                    setSelectedApartment(apartment);
                                    openUpdateModal();
                                }} />
                            </EditIcon>
                            <DeleteIcon>
                                <FaTrash onClick={
                                    () => {
                                        setSelectedApartment(apartment);
                                        openDeleteModal();
                                    }
                                } />
                            </DeleteIcon>
                        </AdminClientContainer>
                    </SingleApartment>
                ))
            }
            <Modal
                isOpen={modalDeleteIsOpen}
                onRequestClose={closeDeleteModal}
                style={modalStyles}
            >
                <DeleteContainer>
                    <DeleteTitle>Quer realmente excluir Apartamento {selectedApartment.number}?</DeleteTitle>
                    <DeleteButtonContainer>
                        <CancelButton
                            onClick={() => {
                                setSelectedApartment({});
                                closeDeleteModal();
                            }}
                        >
                            Cancelar
                        </CancelButton>
                        <ConfirmButton
                            onClick={async () => {
                                await deleteApartment(user, selectedApartment, { setLoading, closeDeleteModal });
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

export default ApartmentList;