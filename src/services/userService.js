import api from "./api";
import { sessionService } from "redux-react-session";

export const loginUser = async (credentials, navigate, setFieldError, setSubmitting) => {
    try {
        const response = await api.post('/login', credentials);
        const { accessToken, role, userId, name } = response.data;

        if (!accessToken || !role) {
            throw new Error("Resposta do login incompleta (faltou token ou role)");
        }

        const user = {
            id: userId,
            name: name,
            email: credentials.email,
            role: role
        };

        await sessionService.saveSession({ token: accessToken });
        await sessionService.saveUser(user);

        setSubmitting(false);
        navigate('/dashboard');

    } catch (err) {
        console.error("Erro no login:", err);
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao conectar.";
        setFieldError('email', message);
    }
};

export const getLoggedUserInfo = async () => {
    const response = await api.get('/me');
    await sessionService.saveUser(response.data);
    return response.data;
};

export const updateMyProfile = async (data, setSubmitting, setFieldError) => {
    try {
        const response = await api.put('/me', {
            name: data.name,
            phone: data.phone,
            address: data.address
        });
        return response.data;
    } catch (err) {
        const message = err.response?.data?.message || "Erro ao atualizar perfil.";
        if (setFieldError) setFieldError('name', message);
        else alert(message);
        throw err;
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

export const updateMyPassword = async (data, setFieldError) => {
    try {
        const response = await api.put('/me/password', {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
        });
        return response.data;
    } catch (err) {
        const message = err.response?.data?.message || "Erro ao alterar senha.";
        if (setFieldError) setFieldError('newPassword', message);
        else alert(message);
        throw err;
    }
};

export const requestCreateClient = async (formData, navigate, setFieldError, setSubmitting) => {
    try {
        await api.post('/solicitar-acesso', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        setSubmitting(false);
        alert("Solicitação enviada com sucesso! Aguarde a aprovação do administrador.");
        navigate('/');

    } catch (err) {
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao enviar solicitação.";
        console.error(message);
        setFieldError('cpf', message);
        alert(message);
    }
};

export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const deleteUserById = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    if (navigate) navigate('/login');
};
