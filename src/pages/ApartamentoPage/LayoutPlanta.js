import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { modalStyles } from "../../styles/ModalStyles";
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
import { FaCheck, FaTimes } from 'react-icons/fa';

const LayoutPlanta = ({ apartamentos, setSelectedApartamento }) => {
    Modal.setAppElement(document.getElementById('root'));
    const [isChecked, setChecked] = useState(false);
    const [selectedApt, setSelectedApt] = useState(null);
    const [apt01, setApt01] = useState({});
    const [apt02, setApt02] = useState({});
    const [apt03, setApt03] = useState({});
    const [apt04, setApt04] = useState({});
    const [apt05, setApt05] = useState({});
    const [apt06, setApt06] = useState({});
    const [apt07, setApt07] = useState({});
    const [apt08, setApt08] = useState({});
    const [apt09, setApt09] = useState({});
    const [apt10, setApt10] = useState({});
    const [apt11, setApt11] = useState({});
    const [apt12, setApt12] = useState({});
    const [apt13, setApt13] = useState({});
    const [apt14, setApt14] = useState({});
    const [apt15, setApt15] = useState({});
    const [apt16, setApt16] = useState({});
    const [apt17, setApt17] = useState({});
    const [apt18, setApt18] = useState({});
    const [apt19, setApt19] = useState({});
    const [apt20, setApt20] = useState({});
    const [apt21, setApt21] = useState({});
    const [apt22, setApt22] = useState({});
    const [apt23, setApt23] = useState({});
    const [apt24, setApt24] = useState({});
    const [apt25, setApt25] = useState({});
    const [apt26, setApt26] = useState({});
    const [apt27, setApt27] = useState({});
    const [apt28, setApt28] = useState({});
    const [apt29, setApt29] = useState({});
    const [apt30, setApt30] = useState({});
    const [modalDetailIsOpen, setModalDetailIsOpen] = useState(false);

    const openDetailModal = (apartamento) => {
        setSelectedApt(apartamento);
        setModalDetailIsOpen(true);
    }

    const closeDetailModal = () => {
        setModalDetailIsOpen(false);
        setSelectedApt(null);
    }

    const handleCheck = () => {
        setChecked(!isChecked);
    }

    const handleSelectApartamento = () => {
        setSelectedApartamento(selectedApt);
        closeDetailModal();
    }

    useEffect(() => {
        function attachAptId() {
            if (apartamentos.length === 30) {
                setApt01(apartamentos[0]);
                setApt02(apartamentos[1]);
                setApt03(apartamentos[2]);
                setApt04(apartamentos[3]);
                setApt05(apartamentos[4]);
                setApt06(apartamentos[5]);
                setApt07(apartamentos[6]);
                setApt08(apartamentos[7]);
                setApt09(apartamentos[8]);
                setApt10(apartamentos[9]);
                setApt11(apartamentos[10]);
                setApt12(apartamentos[11]);
                setApt13(apartamentos[12]);
                setApt14(apartamentos[13]);
                setApt15(apartamentos[14]);
                setApt16(apartamentos[15]);
                setApt17(apartamentos[16]);
                setApt18(apartamentos[17]);
                setApt19(apartamentos[18]);
                setApt20(apartamentos[19]);
                setApt21(apartamentos[20]);
                setApt22(apartamentos[21]);
                setApt23(apartamentos[22]);
                setApt24(apartamentos[23]);
                setApt25(apartamentos[24]);
                setApt26(apartamentos[25]);
                setApt27(apartamentos[26]);
                setApt28(apartamentos[27]);
                setApt29(apartamentos[28]);
                setApt30(apartamentos[29]);
            }
        }
        attachAptId();
    }, [apartamentos]);

    return (
        <ContentApartamentoContainer>
            <LayoutSwitchContainer>
                <LayoutSwitchTitle>{isChecked ? '1º Andar' : 'Térreo'}</LayoutSwitchTitle>
                <LayoutSwitchButton>
                    <input type='checkbox' onClick={handleCheck} />
                    <span />
                </LayoutSwitchButton>
            </LayoutSwitchContainer>
            {
                isChecked ? (
                    <PlantaBaixaContainer>
                        <PlantaBaixaApt $statusMatch={'OCUPADO' === apt02.status} onClick={() => openDetailModal(apt02)}>
                            <NumAptLabel>02</NumAptLabel>
                            <NumAptLabel>{apt02.status}</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }} $statusMatch={'OCUPADO' === apt17.status} onClick={() => openDetailModal(apt17)}>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>17</NumAptLabel>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt17.status}</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt $statusMatch={'OCUPADO' === apt19.status} onClick={() => openDetailModal(apt19)}>
                            <NumAptLabel>19</NumAptLabel>
                            <NumAptLabel>{apt19.status}</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }} $statusMatch={'OCUPADO' === apt23.status} onClick={() => openDetailModal(apt23)}>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>23</NumAptLabel>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt23.status}</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt $statusMatch={'OCUPADO' === apt25.status} onClick={() => openDetailModal(apt25)}>
                            <NumAptLabel>25</NumAptLabel>
                            <NumAptLabel>{apt25.status}</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaAltContainer>
                            <PlantaBaixaAlt $statusMatch={'OCUPADO' === apt29.status} onClick={() => openDetailModal(apt29)}>
                                <NumAptLabel>29</NumAptLabel>
                                <NumAptLabel>{apt29.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{ transform: 'scaleY(-1)' }} $statusMatch={'OCUPADO' === apt27.status} onClick={() => openDetailModal(apt27)}>
                                <NumAptLabel style={{ transform: 'scaleY(-1)' }}>27</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleY(-1)' }}>{apt27.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                        </PlantaAltContainer>
                    </PlantaBaixaContainer>

                ) : (
                    <PlantaTerreo>
                        <PlantaTerreoColumn>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} $statusMatch={'OCUPADO' === apt22.status} onClick={() => openDetailModal(apt22)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>22</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt22.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} $statusMatch={'OCUPADO' === apt21.status} onClick={() => openDetailModal(apt21)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>21</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt21.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} $statusMatch={'OCUPADO' === apt16.status} onClick={() => openDetailModal(apt16)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>16</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt16.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} $statusMatch={'OCUPADO' === apt15.status} onClick={() => openDetailModal(apt15)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>15</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt15.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} $statusMatch={'OCUPADO' === apt14.status} onClick={() => openDetailModal(apt14)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>14</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt14.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} $statusMatch={'OCUPADO' === apt13.status} onClick={() => openDetailModal(apt13)}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>13</NumAptLabel>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt13.status}</NumAptLabel>
                            </PlantaBaixaAlt>
                        </PlantaTerreoColumn>
                        <PlantaTerreoRowContainer>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} $statusMatch={'OCUPADO' === apt30.status} onClick={() => openDetailModal(apt30)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>30</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt30.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt28.status} onClick={() => openDetailModal(apt28)}>
                                    <NumAptLabel>28</NumAptLabel>
                                    <NumAptLabel>{apt28.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} $statusMatch={'OCUPADO' === apt26.status} onClick={() => openDetailModal(apt26)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>26</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt26.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt24.status} onClick={() => openDetailModal(apt24)}>
                                    <NumAptLabel>24</NumAptLabel>
                                    <NumAptLabel>{apt24.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} $statusMatch={'OCUPADO' === apt20.status} onClick={() => openDetailModal(apt20)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>20</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt20.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt18.status} onClick={() => openDetailModal(apt18)}>
                                    <NumAptLabel>18</NumAptLabel>
                                    <NumAptLabel>{apt18.status}</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt12.status} onClick={() => openDetailModal(apt12)}>
                                    <NumAptLabel>12</NumAptLabel>
                                    <NumAptLabel>{apt12.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} $statusMatch={'OCUPADO' === apt10.status} onClick={() => openDetailModal(apt10)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>10</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt10.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt08.status} onClick={() => openDetailModal(apt08)}>
                                    <NumAptLabel>08</NumAptLabel>
                                    <NumAptLabel>{apt08.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} $statusMatch={'OCUPADO' === apt06.status} onClick={() => openDetailModal(apt06)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>06</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>{apt06.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt $statusMatch={'OCUPADO' === apt04.status} onClick={() => openDetailModal(apt04)}>
                                    <NumAptLabel>04</NumAptLabel>
                                    <NumAptLabel>{apt04.status}</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt11.status} onClick={() => openDetailModal(apt11)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>11</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt11.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt09.status} onClick={() => openDetailModal(apt09)}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>09</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>{apt09.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt07.status} onClick={() => openDetailModal(apt07)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>07</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt07.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt05.status} onClick={() => openDetailModal(apt05)}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>05</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>{apt05.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt03.status} onClick={() => openDetailModal(apt03)}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>03</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>{apt03.status}</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} $statusMatch={'OCUPADO' === apt01.status} onClick={() => openDetailModal(apt01)}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>01</NumAptLabel>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>{apt01.status}</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                        </PlantaTerreoRowContainer>
                    </PlantaTerreo>
                )
            }
            <Modal
                isOpen={modalDetailIsOpen}
                onRequestClose={closeDetailModal}
                style={modalStyles}
            >
                <DetailApartamentoContainer>
                    <DetailApartamentoHeaderContainer>
                        <DetailApartamentoHeaderTitle>Detalhes do Apartamento</DetailApartamentoHeaderTitle>
                    </DetailApartamentoHeaderContainer>
                    <DetailApartamentoDataContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Número:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue>{selectedApt && selectedApt.numero}</DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Climatizado:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue>{selectedApt && selectedApt.climatizado ? <FaCheck color='#0F0' /> : <FaTimes color='#F00' />}</DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                        <DetailApartamentoValueContainer>
                            <DetailApartamentoDataLabel>Status:</DetailApartamentoDataLabel>
                            <DetailApartamentoDataValue>{selectedApt && selectedApt.status}</DetailApartamentoDataValue>
                        </DetailApartamentoValueContainer>
                    </DetailApartamentoDataContainer>
                    <DetailApartamentoButtonGroup>
                        <DetailApartamentoBackButton onClick={closeDetailModal}>Voltar</DetailApartamentoBackButton>
                        {selectedApt && selectedApt.status !== 'OCUPADO' && (
                            <DetailApartamentoSelectButton onClick={handleSelectApartamento}>Selecionar</DetailApartamentoSelectButton>
                        )}
                    </DetailApartamentoButtonGroup>
                </DetailApartamentoContainer>
            </Modal>
        </ContentApartamentoContainer>
    );
}

export default LayoutPlanta;