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

export const getPredioById = async (user, predioId, setPredio, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let predio = response.data;
        setPredio(predio);
        setLoading(false);
    }).catch((err) => {
        console.log(err.message);
        setLoading(false);
    });
}

export const deletePredioById = async (user, predioId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predioId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const updatePredio = async (user, predio, setSubmitting, setFieldError, setLoading) => {
    await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/predios/${predio.id}`, predio, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setSubmitting(false);
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
        setSubmitting(false);
        setFieldError('nome', err.message);
    });
}