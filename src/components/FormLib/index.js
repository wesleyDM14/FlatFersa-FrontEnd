import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { useField } from "formik";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    StyledTextInput,
    StyledLabel,
    StyledIcon,
    ErrorMsg,
    StyledSelectArea,
    StyledSelectLabel,
    FormTextInput,
    StyledInputMask,
} from './styles';
import { FiEye, FiEyeOff } from "react-icons/fi";

export const MaskedInput = forwardRef(({ mask, ...props }, ref) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <StyledInputMask
                {...field}
                {...props}
                mask={mask}
                ref={ref}
                onChange={(event) => {
                    const rawValue = event.target.value.replace(/\D/g, '');
                    helpers.setValue(rawValue);
                }}
                value={props.value}
            />
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: 'hidden' }}>.</ErrorMsg>
                )
            }
        </>
    )
});

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

export const FormInput = ({ ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <FormTextInput
                {...field}
                {...props}
            />
            {
                meta.touched && meta.error ? (
                    <ErrorMsg>{meta.error}</ErrorMsg>
                ) : (
                    <ErrorMsg style={{ visibility: "hidden" }}>.</ErrorMsg>
                )
            }
        </>

    )
}

export const PredioSelect = ({ predios, setSelectedPredio, setLoading }) => {
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
                    setLoading && setLoading(true);
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
    );

}

export const ClientSelect = ({ clientes, setSelectedClient }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        function generateOptions() {
            let optionsTmp = [];
            for (let index = 0; index < clientes.length; index++) {
                const element = clientes[index];
                if (element.statusClient === 'ATIVO') {
                    let temp = { label: element.name, value: element.id };
                    optionsTmp.push(temp);
                }
            }
            setOptions(optionsTmp);
        }
        generateOptions();
    }, [clientes]);

    return (
        <StyledSelectArea>
            <StyledSelectLabel>Cliente</StyledSelectLabel>
            <Select
                options={options}
                placeholder={'Selecione o Cliente'}
                onChange={(value) => {
                    setSelectedClient(value);
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                noOptionsMessage={() => "Sem Clientes Cadastrados"}
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
    );
}

export const ApartamentoSelect = ({ apartamentos, setSelectedApartamento }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        function generateOptions() {
            let optionsTmp = [];
            for (let index = 0; index < apartamentos.length; index++) {
                const element = apartamentos[index];
                if (element.status === 'VAGO') {
                    let temp = { label: element.numero, value: element.id };
                    optionsTmp.push(temp);
                }
            }
            setOptions(optionsTmp);
        }
        generateOptions();
    }, [apartamentos]);

    return (
        <StyledSelectArea>
            <StyledSelectLabel>Apartamento</StyledSelectLabel>
            <Select
                options={options}
                placeholder={'Selecione o Número do Apartamento'}
                onChange={(value) => {
                    setSelectedApartamento(value);
                }}
                menuPlacement="auto"
                menuPosition="fixed"
                noOptionsMessage={() => "Sem Apartamentos Cadastrados"}
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
    );
}

export const StyledSelect = ({ options, setSelectedOption, label, selectedOption }) => {

    return (
        <StyledSelectArea>
            <StyledSelectLabel>{label}</StyledSelectLabel>
            <Select
                options={options}
                placeholder={'Selecionar opção desejada'}
                onChange={(value) => {
                    setSelectedOption(value);
                }}
                value={selectedOption}
                menuPlacement="auto"
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
    );
}

export const FinalidadeSelected = ({ handleChange, initialValue, ...props }) => {
    const [selectedFinalidade, setSelectedFinalidade] = useState(null);

    const options = useMemo(() => [
        { label: 'Comercial', value: 'COMERCIAL' },
        { label: 'Residencial', value: 'RESIDENCIAL' },
        { label: 'Rural', value: 'RURAL' },
    ], []);

    useEffect(() => {
        if (initialValue) {
            setSelectedFinalidade(options.find(option => option.value === initialValue));
        }
    }, [initialValue, options]);

    const handleChangeSelected = (selectedOption) => {
        setSelectedFinalidade(selectedOption);
        handleChange(selectedOption ? selectedOption.value : null);
    }

    return (
        <StyledSelectArea>
            <StyledSelectLabel>Finalidade do Imóvel</StyledSelectLabel>
            <Select
                options={options}
                placeholder={'Selecionar opção desejada'}
                onChange={handleChangeSelected}
                value={selectedFinalidade}
                menuPlacement="auto"
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
                isClearable
            />
        </StyledSelectArea>
    );
}

export const StyledDatePicker = ({ selectedDate, setSelectedDate }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat='dd/MM/yyyy'
        />
    );
}