import axios from "axios";

export const getApartamentos = async (user, setApartamentos) => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        });
        setApartamentos(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getApartamentosByPredioId = async (user, predioId, setApartamentos) => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/predio/${predioId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        });
        setApartamentos(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

export const getApartamentosWithInfos = async (user, setApartamentosInfo) => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos-infos', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        });
        setApartamentosInfo(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

export const createApartamento = async (apartamento, user, navigate, setSubmitting, setFieldError) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos', apartamento, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        });
        console.log(response.data);
        navigate('/apartamentos');
    } catch (error) {
        setFieldError('numero', error.message);
        console.log(error.message);
    } finally {
        setSubmitting(false);
    }
}

export const getApartamentoById = async (user, apartamentoId, setApartamento) => {
    try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${apartamentoId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        });
        let apartamento = response.data;
        setApartamento(apartamento);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateApartamento = async (user, values, setSubmitting, setFieldError) => {
    await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${values.id}`, values, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setSubmitting(false);
    }).catch((err) => {
        console.log(err.message);
        setSubmitting(false);
        setFieldError('numero', err.message);
    });
}

export const deleteApartamentoById = async (user, apartamentoId) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${apartamentoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
    }).catch((err) => {
        console.log(err.message);
    });
}