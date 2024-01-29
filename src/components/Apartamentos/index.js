import { useState, useEffect } from "react";
import {
    MainContainer,
    MainHeader,
    MainIconTitleContainer,
    MainRegisterContainer,
    MainRegisterIconContainer,
    MainRegisterTitle,
    MainTitle,
    MainTitleContainer,
    StyledFormArea,
    StyledTitle,
    colors,
    modalStyles,
} from "./../Styles";
import {
    FaHotel,
    FaPlusCircle
} from "react-icons/fa";
import Modal from 'react-modal';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { TextInput } from "./../FormLib";
import { ThreeDots } from "react-loader-spinner";

const AptMain = ({ user, navigate }) => {

    Modal.setAppElement(document.getElementById('root'));
    const [apartamentos, setApartamentos] = useState([]);
    const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const openRegisterModal = () => {
        setModalRegisterIsOpen(true);
    }

    const closeRegisterModal = () => {
        setModalRegisterIsOpen(false);
    }

    return (
        <main>
            <MainContainer>
                <MainHeader>
                    <MainTitleContainer>
                        <MainIconTitleContainer>
                            <FaHotel />
                        </MainIconTitleContainer>
                        <MainTitle>Apartamentos</MainTitle>
                    </MainTitleContainer>
                    <MainRegisterContainer>
                        <MainRegisterIconContainer onClick={openRegisterModal}>
                            <FaPlusCircle />
                        </MainRegisterIconContainer>
                        <MainRegisterTitle>Adicionar</MainRegisterTitle>
                    </MainRegisterContainer>
                </MainHeader>
                <Modal
                    isOpen={modalRegisterIsOpen}
                    onRequestClose={closeRegisterModal}
                    style={modalStyles}
                >
                    <StyledFormArea>
                        <StyledTitle color={colors.theme} size={30}>Cadastro de Apartamento</StyledTitle>
                    </StyledFormArea>
                </Modal>
            </MainContainer>
        </main>
    )
}

export default AptMain;