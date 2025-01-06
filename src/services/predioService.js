import axios from "axios";

export const getPredios = async (user, setPredios, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/predios', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setPredios(response.data);
        setLoading(false);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const createPredio = async (predio, user, navigate, setSubmitting, setFieldError) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/predios', predio, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setSubmitting(false);
        navigate('/predios');
    }).catch((err) => {
        setSubmitting(false);
        setFieldError('name', err.message);
        console.log(err.message);
    });
}

export const getPredioById = async (user, predioId, setPredio) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let predio = response.data;
        setPredio(predio);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const deletePredioById = async (user, predioId) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predioId}`, {
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

export const updatePredio = async (user, predio, setSubmitting, setFieldError) => {
    await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predio.id}`, predio, {
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
        setFieldError('nome', err.message);
    });
}