import axios from "axios";

export const getClientes = async (user, setClients, setLoading, setClientesSolicitacao, setClientesAtivos) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/clients', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let clientes = response.data;
        let ativos = [];
        let solicitacoes = [];

        for (let index = 0; index < clientes.length; index++) {
            const client = clientes[index];
            if (client.statusClient === 'ATIVO') {
                ativos.push(client);
            } else if (client.statusClient === 'AGUARDANDO') {
                solicitacoes.push(client);
            }
        }

        if (setClientesSolicitacao) {
            setClientesSolicitacao(solicitacoes);
        }

        if (setClientesAtivos) {
            setClientesAtivos(ativos);
        }

        setClients(clientes);
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

export const getClienteById = async (user, clientId, setClient, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/clients/${clientId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let client = response.data;
        setClient(client);
        setLoading(false);
    }).catch((err) => {
        console.log(err.message);
        setLoading(false);
    });
}

export const deleteClientById = async (user, clientId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/clients/${clientId}`, {
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

export const aproveClient = async (user, clientId, setLoading) => {
    let client = { clientId: clientId };
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/requestAccess/aprove', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
    }).catch((err) => {
        console.log(err);
    });
}

export const reproveClient = async (user, clientId, message, setLoading) => {
    let client = { clientId: clientId, message: message };
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/requestAccess/reprove', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
    }).catch((err) => {
        console.log(err);
    });
}