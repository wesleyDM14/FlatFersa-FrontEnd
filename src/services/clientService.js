import axios from "axios";

export const getClientesForContract = async (user, setClients, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/clients', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let clientes = response.data;
        setClients(clientes);
        setLoading(false);
    }).catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
    });
}

export const getClientes = async (user, setClients, setClientesSolicitacao, setClientesAtivos, setLoading) => {
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
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
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
        setFieldError('name', err.response.data.message);
        console.log(err.response.data.message);
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
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
    });
}

export const updateClientById = async (user, client, setSubmitting, setFieldError, closeEditModal) => {
    await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/clients/${client.id}`, client, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then(async (response) => {
        if (client.newPassword) {
            let newData = { newPassword: client.newPassword, confirmPassword: client.confirmPassword }
            await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/users/client/${client.id}`, newData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                }
            }).then(async (res) => {
                alert(res.data.message);
            }).catch(err => {
                console.error(err.message);
                setSubmitting(false);
                setFieldError('newPassword', err.message);
                alert('Erro ao mudar a senha');
            });
        }
        setSubmitting(false);
        alert(response.data.message);
        closeEditModal();
    }).catch((err) => {
        console.log(err.response.data.message);
        setFieldError('name', err.response.data.message);
        setSubmitting(false);
    });
}

export const deleteClientById = async (user, clientId, setDeletting) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/clients/${clientId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        window.alert(response.data.message);
        setDeletting(false);
    }).catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
    });
}

export const aproveClient = async (user, clientId, setLoading, closeSolicitacaoModal) => {
    let client = { clientId: clientId };
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/requestAccess/aprove', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        closeSolicitacaoModal();
        setLoading(true);
    }).catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
    });
}

export const reproveClient = async (user, clientId, message, setLoading, closeSolicitacaoModal) => {
    let client = { clientId: clientId, message: message };
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/requestAccess/reprove', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        closeSolicitacaoModal();
        setLoading(true);
    }).catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data.message);
    });
}

export const getDocumentoFrente = async (user, clientId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/cliente/documentoFrente/${clientId}`,
            {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
        );

        const blobUrl = URL.createObjectURL(response.data);
        return blobUrl;
    } catch (err) {
        const message = err?.response?.data?.message || "Erro ao buscar documento.";
        window.alert(message);
        console.error(message);
        return null;
    }
}

export const getDocumentoVerso = async (user, clientId) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/cliente/documentoVerso/${clientId}`,
            {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            }
        );

        const blobUrl = URL.createObjectURL(response.data);
        return blobUrl;
    } catch (err) {
        const message = err?.response?.data?.message || "Erro ao buscar documento.";
        window.alert(message);
        console.error(message);
        return null;
    }
}