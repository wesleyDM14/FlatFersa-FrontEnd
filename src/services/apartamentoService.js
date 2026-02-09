import axios from "axios";
import { sessionService } from "redux-react-session";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'
});

// Interceptor para injetar o token
api.interceptors.request.use(async (config) => {
    try {
        const session = await sessionService.loadSession();
        if (session && session.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }
    } catch (err) {
        console.error("Erro ao carregar sessão", err);
    }
    return config;
});

export const getApartamentos = async (setApartamentos) => {
    try {
        const response = await api.get('/apartamentos');
        setApartamentos(response.data);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
    }
};

export const getApartamentosByPredioId = async (predioId, setApartamentos) => {
    try {
        const response = await api.get(`/apartamentos/predio/${predioId}`);
        setApartamentos(response.data);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        setApartamentos([]); // Garante array vazio em caso de erro
    }
};

export const createApartamento = async (apartamentoData, navigate, setSubmitting, setFieldError) => {
    try {
        const response = await api.post('/apartamentos', apartamentoData);
        alert(response.data.message || "Apartamento criado com sucesso!");
        navigate('/apartamentos');
    } catch (error) {
        console.error(error.response?.data?.message);
        if (setFieldError) {
            setFieldError('numero', error.response?.data?.message || "Erro ao criar");
        } else {
            alert(error.response?.data?.message);
        }
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

export const getApartamentoById = async (apartamentoId, setApartamento) => {
    try {
        const response = await api.get(`/apartamentos/${apartamentoId}`);
        setApartamento(response.data);
    } catch (error) {
        console.error(error.response?.data?.message);
    }
};

export const updateApartamento = async (values, setSubmitting, setFieldError) => {
    try {
        const response = await api.put(`/apartamentos/${values.id}`, values);
        alert(response.data.message || "Atualizado com sucesso");
    } catch (error) {
        console.error(error.response?.data?.message);
        if (setFieldError) {
            setFieldError('numero', error.response?.data?.message);
        } else {
            alert(error.response?.data?.message);
        }
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

export const deleteApartamentoById = async (apartamentoId, setDeletting) => {
    try {
        const response = await api.delete(`/apartamentos/${apartamentoId}`);
        alert(response.data.message || "Excluído com sucesso");
    } catch (error) {
        console.error(error.response?.data?.message);
        alert(error.response?.data?.message || "Erro ao excluir");
    } finally {
        if (setDeletting) setDeletting(false);
    }
};