import axios from "axios";

export const getClientes = async (user, setClients, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/clients', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setClients(response.data);
        setLoading(false);
    }).catch((err) => {
        setLoading(false);
        console.log(err.message);
    });
}

export const createCliente = async (cliente, user, navigate, setSubmitting, setFieldError) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/clients', cliente, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setSubmitting(false);
        navigate('/clientes');
    }).catch((err) => {
        setSubmitting(false);
        setFieldError('name', err.message);
        console.log(err.message);
    });
}

export const getClienteById = async (user, clientId, setClient) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/clients/${clientId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let client = response.data;
        setClient(client);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const deleteClientById = async (user, clientId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/clients/${clientId}`, {
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