import axios from "axios";

export const getApartamentos = async (user, setApartamentos, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setApartamentos(response.data);
        setLoading(false);
    }).catch((err) => {
        setLoading(false);
        console.log(err.message);
    });
}

export const createApartamento = async (apartamento, user, navigate, setSubmitting, setFieldError) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos', apartamento, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setSubmitting(false);
        navigate('/apartamentos');
    }).catch((err) => {
        setSubmitting(false);
        setFieldError('numeroContrato', err.message);
        console.log(err.message);
    });
}

export const getApartamentoById = async (user, apartamentoId, setApartamento) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${apartamentoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let apartamento = response.data;
        setApartamento(apartamento);
    }).catch((err) => {
        console.log(err);
    });
}

export const deleteApartamentoById = async (user, apartamentoId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${apartamentoId}`, {
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