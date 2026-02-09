import axios from "axios";
import { sessionService } from "redux-react-session";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'
});

export const loginUser = async (credentials, navigate, setFieldError, setSubmitting) => {
    try {
        console.log("--- DEBUG LOGIN: INICIANDO ---");

        const response = await api.post('/login', credentials);
        console.log("1. Resposta do Backend:", response.data);

        // CORREÇÃO AQUI: Extraímos os dados direto da raiz
        const { accessToken, role, userId, name } = response.data;

        // Montamos o objeto user manualmente para salvar na sessão
        const user = {
            id: userId,
            name: name,
            email: credentials.email, // O backend não mandou email, pegamos do form
            role: role
        };

        if (!accessToken || !role) {
            throw new Error("Resposta do login incompleta (faltou token ou role)");
        }

        console.log("2. Token identificado:", accessToken);
        console.log("3. User montado:", user);

        // SALVANDO NA SESSÃO
        await sessionService.saveSession({ token: accessToken });
        await sessionService.saveUser(user);

        console.log("4. Dados salvos no Redux-Session com sucesso");

        setSubmitting(false);

        // REDIRECIONAMENTO
        if (role === 'ADMIN') {
            navigate('/dashboard');
        } else {
            navigate('/dashboard');
        }

    } catch (err) {
        console.error("ERRO LOGIN:", err);
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao conectar.";
        setFieldError('email', message);
    }
};

export const getLoggedUserInfo = async (navigate) => {
    try {
        const token = await sessionService.loadSession();

        const response = await api.get('/me', {
            headers: { "Authorization": `Bearer ${token}` }
        });

        await sessionService.saveUser(response.data);
        return response.data;

    } catch (err) {
        console.error("Erro ao buscar dados do usuário", err);
        if (err.response?.status === 401) {
            logoutUser(navigate);
        }
    }
}

export const updateUserLoggedIn = async (userData, setSubmitting, setFieldError) => {
    try {
        const token = await sessionService.loadSession();
        const response = await api.put('/users/update', userData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        alert("Dados atualizados com sucesso!");
        setSubmitting(false);

    } catch (err) {
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao atualizar.";
        setFieldError('newPassword', message);
        alert(message);
    }
}

export const requestCreateClient = async (formData, navigate, setFieldError, setSubmitting) => {
    try {
        await api.post('/solicitacoes', formData, {
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
}

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    if (navigate) navigate('/login');
}