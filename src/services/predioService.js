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
        setLoading(false);
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

export const deletePredioById = async (user, predioId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predioId}`, {
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