import React, { useState } from 'react';
import {
    ContentApartamentoContainer,
    LayoutSwitchButton,
    LayoutSwitchContainer,
    LayoutSwitchTitle,
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
                        <PlantaBaixaApt />
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }} />
                        <PlantaBaixaApt />
                        <PlantaBaixaApt style={{ transform: 'scaleX(-1)' }} />
                        <PlantaBaixaApt />
                        <PlantaAltContainer>
                            <PlantaBaixaAlt />
                            <PlantaBaixaAlt style={{ transform: 'scaleY(-1)' }} />
                        </PlantaAltContainer>
                    </PlantaBaixaContainer>
                ) : (
                    <PlantaTerreo>
                        <PlantaTerreoColumn>
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} />
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} />
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} />
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} />
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1)',
                            }} />
                            <PlantaBaixaAlt style={{
                                transform: 'scaleX(-1) scaleY(-1)',
                            }} />
                        </PlantaTerreoColumn>
                        <PlantaTerreoRowContainer>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} />
                                <PlantaBaixaApt />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} />
                                <PlantaBaixaApt />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} />
                                <PlantaBaixaApt />
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} />
                                <PlantaBaixaApt />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1)',
                                }} />
                                <PlantaBaixaApt />
                            </PlantaTerreoRow>
                            <PlantaTerreoRow>
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleX(-1) scaleY(-1)',
                                }} />
                                <PlantaBaixaApt style={{
                                    transform: 'scaleY(-1)',
                                }} />
                            </PlantaTerreoRow>
                        </PlantaTerreoRowContainer>
                    </PlantaTerreo>
                )
            }
        </ContentApartamentoContainer>
    );
}

export default LayoutPlanta;