import React, { useState } from 'react';
import {
    ContentApartamentoContainer,
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

const LayoutPlanta = () => {
    const [isChecked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(!isChecked);
    }
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
                        <PlantaBaixaApt>
                            <NumAptLabel>02</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }}>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>17</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt>
                            <NumAptLabel>19</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }}>
                            <NumAptLabel style={{ transform: 'scaleX(-1)' }}>23</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaBaixaApt>
                            <NumAptLabel>25</NumAptLabel>
                        </PlantaBaixaApt>
                        <PlantaAltContainer>
                            <PlantaBaixaAlt>
                                <NumAptLabel>29</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{ transform: 'scaleY(-1)' }}>
                                <NumAptLabel style={{ transform: 'scaleY(-1)' }}>27</NumAptLabel>
                            </PlantaBaixaAlt>
                        </PlantaAltContainer>
                    </PlantaBaixaContainer>
                ) : (
                    <PlantaTerreo>
                        <PlantaTerreoColumn>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>22</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>21</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>16</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>15</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1)' }}>14</NumAptLabel>
                            </PlantaBaixaAlt>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }}>
                                <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>13</NumAptLabel>
                            </PlantaBaixaAlt>
                        </PlantaTerreoColumn>
                        <PlantaTerreoRowContainer>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>30</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt>
                                    <NumAptLabel>28</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>26</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt>
                                    <NumAptLabel>24</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>20</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt>
                                    <NumAptLabel>18</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt>
                                    <NumAptLabel>12</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>10</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt>
                                    <NumAptLabel>08</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1)' }}>06</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt>
                                    <NumAptLabel>04</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>11</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>09</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>07</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>05</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleX(-1) scaleY(-1)' }}>03</NumAptLabel>
                                </PlantaBaixaApt>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }}>
                                    <NumAptLabel style={{ transform: 'scaleY(-1)' }}>01</NumAptLabel>
                                </PlantaBaixaApt>
                            </PlantaTerreoRow>
                        </PlantaTerreoRowContainer>
                    </PlantaTerreo>
                )
            }
        </ContentApartamentoContainer>
    );
}

export default LayoutPlanta;