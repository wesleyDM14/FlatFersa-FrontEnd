import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { modalStyles } from "../../styles/ModalStyles";
import { FaCheck, FaTimes } from 'react-icons/fa';

import {
    ContentApartamentoContainer,
    DetailApartamentoBackButton,
    DetailApartamentoButtonGroup,
    DetailApartamentoContainer,
    DetailApartamentoDataContainer,
    DetailApartamentoDataLabel,
    DetailApartamentoDataValue,
    DetailApartamentoHeaderContainer,
    DetailApartamentoHeaderTitle,
    DetailApartamentoSelectButton,
    DetailApartamentoValueContainer,
    LayoutSwitchButton,
    LayoutSwitchContainer,
    LayoutSwitchTitle,
    NumAptLabel,
    PlantaAltContainer,
    PlantaBaixaAlt,
    PlantaBaixaApt,
    PlantaBaixaContainer,
    PlantaTerreo,
    PlantaTerreoColumn,
    PlantaTerreoRow,
    PlantaTerreoRowContainer,
} from './ApartamentoPage.styles';

const LayoutPlanta = ({ apartamentos, setSelectedApartamento }) => {
    Modal.setAppElement('#root');
    const [isChecked, setChecked] = useState(false); // false = Térreo, true = 1º Andar
    const [selectedApt, setSelectedApt] = useState(null);
    const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false);

    // Estado para os 30 apartamentos mapeados
    const [mapApts, setMapApts] = useState({});

    useEffect(() => {
        if (apartamentos && apartamentos.length > 0) {
            // Ordena os apartamentos pelo número para garantir o mapeamento correto
            const sorted = [...apartamentos].sort((a, b) => parseInt(a.numero) - parseInt(b.numero));

            // Cria um objeto map para fácil acesso, ex: { 0: aptObj, 1: aptObj... }
            // O layout original espera 30 apartamentos exatos para o Flat Fersa.
            const map = {};
            sorted.forEach((apt, index) => {
                map[index] = apt;
            });
            setMapApts(map);
        }
    }, [apartamentos]);

    const openDetailModal = (apartamento) => {
        if (!apartamento) return;
        setSelectedApt(apartamento);
        setModalDetailIsOpen(true);
    }

    const closeDetailModal = () => {
        setModalDetailIsOpen(false);
        setSelectedApt(null);
    }

    const handleSelectApartamento = () => {
        if (setSelectedApartamento) {
            setSelectedApartamento(selectedApt);
        }
        closeDetailModal();
    }

    // Helper para verificar status
    const isOccupied = (apt) => apt?.status === 'OCUPADO';

    // Helper para renderizar o componente Planta com dados seguros
    const renderAptTerreo = (index, Component, style = {}) => {
        const apt = mapApts[index] || { numero: '?', status: '?' };
        return (
            <Component
                style={style}
                $statusMatch={isOccupied(apt)}
                onClick={() => openDetailModal(apt)}
            >
                <NumAptLabel style={style}>{apt.numero}</NumAptLabel>
                <NumAptLabel style={{ ...style, fontSize: '0.7rem', fontWeight: 400 }}>{apt.status}</NumAptLabel>
            </Component>
        );
    };

    return (
        <ContentApartamentoContainer>
            <LayoutSwitchContainer>
                <LayoutSwitchTitle>{isChecked ? '1º Andar' : 'Térreo'}</LayoutSwitchTitle>
                <LayoutSwitchButton>
                    <input type='checkbox' onClick={() => setChecked(!isChecked)} />
                    <span />
                </LayoutSwitchButton>
            </LayoutSwitchContainer>

            {isChecked ? (
                // --- 1º ANDAR ---
                <PlantaBaixaContainer>
                    {renderAptTerreo(1, PlantaBaixaApt)} {/* Apt 02 na logica antiga era indice 1 */}
                    {renderAptTerreo(16, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                    {renderAptTerreo(18, PlantaBaixaApt)}
                    {renderAptTerreo(22, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                    {renderAptTerreo(24, PlantaBaixaApt)}

                    <PlantaAltContainer>
                        {renderAptTerreo(28, PlantaBaixaAlt)}
                        {renderAptTerreo(26, PlantaBaixaAlt, { transform: 'scaleY(-1)' })}
                    </PlantaAltContainer>
                </PlantaBaixaContainer>
            ) : (
                // --- TÉRREO ---
                <PlantaTerreo>
                    <PlantaTerreoColumn>
                        {renderAptTerreo(21, PlantaBaixaAlt, { transform: 'scaleX(-1)' })}
                        {renderAptTerreo(20, PlantaBaixaAlt, { transform: 'scaleX(-1) scaleY(-1)' })}
                        {renderAptTerreo(15, PlantaBaixaAlt, { transform: 'scaleX(-1)' })}
                        {renderAptTerreo(14, PlantaBaixaAlt, { transform: 'scaleX(-1) scaleY(-1)' })}
                        {renderAptTerreo(13, PlantaBaixaAlt, { transform: 'scaleX(-1)' })}
                        {renderAptTerreo(12, PlantaBaixaAlt, { transform: 'scaleX(-1) scaleY(-1)' })}
                    </PlantaTerreoColumn>

                    <PlantaTerreoRowContainer>
                        <PlantaTerreoRow>
                            {renderAptTerreo(29, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                            {renderAptTerreo(27, PlantaBaixaApt)}
                            {renderAptTerreo(25, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                            {renderAptTerreo(23, PlantaBaixaApt)}
                            {renderAptTerreo(19, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                            {renderAptTerreo(17, PlantaBaixaApt)}
                        </PlantaTerreoRow>

                        <PlantaTerreoRow>
                            {renderAptTerreo(11, PlantaBaixaApt)}
                            {renderAptTerreo(9, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                            {renderAptTerreo(7, PlantaBaixaApt)}
                            {renderAptTerreo(5, PlantaBaixaApt, { transform: 'scaleX(-1)' })}
                            {renderAptTerreo(3, PlantaBaixaApt)}

                            {/* Ajuste manual para os ultimos da fileira de baixo */}
                            {renderAptTerreo(10, PlantaBaixaApt, { transform: 'scaleX(-1) scaleY(-1)' })}
                            {renderAptTerreo(8, PlantaBaixaApt, { transform: 'scaleY(-1)' })}
                            {renderAptTerreo(6, PlantaBaixaApt, { transform: 'scaleX(-1) scaleY(-1)' })}
                            {renderAptTerreo(4, PlantaBaixaApt, { transform: 'scaleY(-1)' })}
                            {renderAptTerreo(2, PlantaBaixaApt, { transform: 'scaleX(-1) scaleY(-1)' })}
                            {renderAptTerreo(0, PlantaBaixaApt, { transform: 'scaleY(-1)' })}
                        </PlantaTerreoRow>
                    </PlantaTerreoRowContainer>
                </PlantaTerreo>
            )}

            {/* Modal de Detalhes (Ao clicar no apto da planta) */}
            <Modal
                isOpen={modalDetailIsOpen}
                onRequestClose={closeDetailModal}
                style={modalStyles}
                contentLabel="Detalhes do Apartamento"
            >
                <DetailApartamentoContainer>
                    <DetailApartamentoHeaderContainer>
                        <DetailApartamentoHeaderTitle>Detalhes - Apt {selectedApt?.numero}</DetailApartamentoHeaderTitle>
                    </DetailApartamentoHeaderContainer>

                    <DetailApartamentoDataContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Prédio:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue>{selectedApt?.predio?.nome}</DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Climatizado:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue>
                                {selectedApt?.climatizado ? <FaCheck color='#10b981' /> : <FaTimes color='#ef4444' />}
                            </DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Status:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue style={{ color: isOccupied(selectedApt) ? '#ef4444' : '#10b981' }}>
                                {selectedApt?.status}
                            </DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                    </DetailApartamentoDataContainer>

                    <DetailApartamentoButtonGroup>
                        <DetailApartamentoBackButton onClick={closeDetailModal}>Fechar</DetailApartamentoBackButton>
                        {/* Se a função setSelectedApartamento foi passada (ex: para edição), mostra botão */}
                        {setSelectedApartamento && !isOccupied(selectedApt) && (
                            <DetailApartamentoSelectButton onClick={handleSelectApartamento}>
                                Editar este Apto
                            </DetailApartamentoSelectButton>
                        )}
                    </DetailApartamentoButtonGroup>
                </DetailApartamentoContainer>
            </Modal>
        </ContentApartamentoContainer>
    );
};

export default LayoutPlanta;