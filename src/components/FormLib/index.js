import React, { useEffect, useState } from "react";
import { useField } from "formik";
import Select from 'react-select';

import {
    StyledTextInput,
    StyledLabel,
    StyledIcon,
    ErrorMsg,
    StyledSelectArea,
    StyledSelectLabel,
} from './styles';
import { FiEye, FiEyeOff } from "react-icons/fi";

export const TextInput = ({ icon, ...props }) => {
    const [field, meta] = useField(props);
    const [show, setShow] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
            {props.type !== 'password' && (
                <StyledTextInput
                    $invalid={meta.touched && meta.error}
                    {...field}
                    {...props}
                />
            )}
            {props.type === 'password' && (
                <StyledTextInput
                    $invalid={meta.touched && meta.error}
                    {...field}
                    {...props}
                    type={show ? "text" : "password"}
                />
            )}
            <StyledIcon>
                {icon}
            </StyledIcon>

            {
                props.type === 'password' && (
                    <StyledIcon onClick={() => setShow(!show)} $right>
                        {show && <FiEye />}
                        {!show && <FiEyeOff />}
                    </StyledIcon>
                )
            }
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
                )
            }
        </div>
    )
}

export const PredioSelect = ({ predios, setSelectedPredio }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        function generateOptions() {
            let optionsTmp = [];
            for (let index = 0; index < predios.length; index++) {
                const element = predios[index];
                let temp = { label: element.nome, value: element.id };
                optionsTmp.push(temp);
            }
            setOptions(optionsTmp);
        }
        generateOptions();
    }, [predios]);

    return (
        <StyledSelectArea>
            <StyledSelectLabel>Prédio</StyledSelectLabel>
            <Select
                options={options}
                placeholder={'Selecione o Prédio do Apartamento'}
                onChange={(value) => {
                    setSelectedPredio(value);
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                noOptionsMessage={() => "Sem Prédios Cadastrados"}
                styles={{
                    control: (baseStyles, state) => ({
                        maxWidth: '100%',
                        width: '90%',
                        backgroundColor: '#fff',
                        borderColor: '#dbdbdb',
                        borderRadius: '4px',
                        color: '#363636',
                        alignItems: 'center',
                        border: '2px solid #0a0a0a0d',
                        display: 'inline-flex',
                        fontSize: '1rem',
                        height: '2.5em',
                        justifyContent: 'flex-start',
                        paddingBottom: 'calc(.5em - 1px)',
                        paddingLeft: 'calc(.75em - 1px)',
                        paddingRight: 'calc(.75em - 1px)',
                        paddingTop: 'calc(.5em - 1px)',
                        lineHeight: '1.5',
                        "&:hover": {
                            border: '2px solid #000',
                        }
                    })
                }}
            />
        </StyledSelectArea>

    )

}