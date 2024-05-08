import axios from "axios";
import { saveAs } from "file-saver";

export const getContratos = async (user, setContratos, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/contratos', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setContratos(response.data);
        setLoading(false);
    }).catch((err) => {
        setLoading(false);
        console.log(err.message);
    });
}

export const createContrato = async (contrato, user, navigate, setSubmitting, setFieldError) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/contratos', contrato, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setSubmitting(false);
        navigate('/contratos');
    }).catch((err) => {
        setSubmitting(false);
        setFieldError('valorAluguel', err.message);
        console.log(err.message);
    });
}

export const getContratoById = async (user, contratoId, setContrato) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/contratos/${contratoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let contrato = response.data;
        setContrato(contrato);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const downloadContract = async (user, contratoId) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/testePDF/${contratoId}`, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
    }
    ).then((response) => {
        const { data } = response;
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'contrato.pdf');
    }).catch((err) => {
        console.log(err.message);
    });
}

export const deleteContratoById = async (user, contratoId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/contratos/${contratoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
    });
}