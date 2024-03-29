import axios from "axios";
import { BaseUrl } from "./../../components/BaseUrl";

export const registerClient = async (client, user, { closeRegisterModal, setLoading, setFieldError, setSubmitting }) => {
    await axios.post(BaseUrl + 'clients', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }
    ).then((response) => {
        closeRegisterModal();
        setLoading(true);
    }).catch((err) => {
        const { response } = err;
        const { data } = response;
        if (data.error.includes("existe")) {
            setFieldError('cpf', data.error);
        }
    });

    setSubmitting(false);
}

export const getAllClients = async (user, { setLoading }) => {
    let clients = [];
    await axios.get(BaseUrl + 'clients', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }).then((response) => {
        const { data } = response;
        clients = data.clients;
    }).catch(err => console.error(err));
    setLoading(false);
    return clients;
}

export const deleteClient = async (user, selectedClient, { setLoading, closeDeleteModal }) => {
    await axios.post(BaseUrl + 'deleteClient', { client_id: selectedClient.id }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }).then((response) => {
        const {data} = response;
        console.log(data.message);
        closeDeleteModal();
        setLoading(true);
    }).catch(err => console.error(err));
}