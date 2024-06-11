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

export const getApartamentosWithInfos = async (user, setApartamentosInfo, setLoading2) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/apartamentos-infos', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setApartamentosInfo(response.data);
        setLoading2(false);
    }).catch((err) => {
        setLoading2(false);
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
        console.log(response.data);
        setSubmitting(false);
        navigate('/apartamentos');
    }).catch((err) => {
        setSubmitting(false);
        setFieldError('numero', err.message);
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

export const updateApartamento = async (user, values, setLoading, setLoading2, setSubmitting, setFieldError) => {
    await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${values.id}`, values, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setSubmitting(false);
        setLoading(true);
        setLoading2(true);
    }).catch((err) => {
        console.log(err.message);
        setSubmitting(false);
        setFieldError('numero', err.message);
    });
}

export const deleteApartamentoById = async (user, apartamentoId, setLoading, setLoading2) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/apartamentos/${apartamentoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
        setLoading2(true);
    }).catch((err) => {
        console.log(err.message);
    });
}