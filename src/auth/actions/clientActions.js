import axios from "axios";
import { BaseUrl } from "./../../components/BaseUrl";

export const registerClient = async (client, user, { closeRegisterModal, setFieldError, setSubmitting }) => {
    await axios.post(BaseUrl + 'clients', client, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }
    ).then((response) => {
        const { data } = response;
        //closeRegisterModal();
    }).catch((err) => {
        const { response } = err;
        const { data } = response;
        if (data.error.includes("existe")) {
            setFieldError('cpf', data.error);
        }
    });

    setSubmitting(false);
}

export const getAllClients = () => {

}