import axios from "axios";
import { sessionService } from "redux-react-session";

// Criação da instância base do Axios (Mesma configuração do userService e dashboardService)
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'
});

// Interceptor: Injeta o Token automaticamente
api.interceptors.request.use(async (config) => {
    try {
        const session = await sessionService.loadSession();
        if (session && session.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }
    } catch (err) {
        // Se der erro ao carregar sessão, segue sem token
    }
    return config;
});

// ==========================================================
// LISTAR PRÉDIOS
// ==========================================================
export const getPredios = async (setPredios) => {
    try {
        const response = await api.get('/predios');
        setPredios(response.data);
    } catch (err) {
        console.error("Erro ao buscar prédios:", err);
        const message = err.response?.data?.message || "Erro ao listar prédios.";
        // alert(message); // Opcional: pode comentar para não ficar pipocando alerta na tela
    }
};

// ==========================================================
// CRIAR PRÉDIO
// ==========================================================
export const createPredio = async (predioData, navigate, setSubmitting, setFieldError) => {
    try {
        await api.post('/predios', predioData);

        setSubmitting(false);
        alert("Prédio criado com sucesso!");
        navigate('/predios');

    } catch (err) {
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao criar prédio.";
        console.error(message);

        // Tenta jogar o erro para o campo 'nome', senão joga um alert geral
        if (setFieldError) {
            setFieldError('nome', message);
        } else {
            alert(message);
        }
    }
};

// ==========================================================
// BUSCAR POR ID (Detalhes)
// ==========================================================
export const getPredioById = async (predioId, setPredio) => {
    try {
        const response = await api.get(`/predios/${predioId}`);
        setPredio(response.data);
    } catch (err) {
        console.error(err);
        const message = err.response?.data?.message || "Erro ao buscar detalhes do prédio.";
        alert(message);
    }
};

// ==========================================================
// DELETAR PRÉDIO
// ==========================================================
export const deletePredioById = async (predioId, setDeleting, refreshData) => {
    try {
        await api.delete(`/predios/${predioId}`);

        alert("Prédio removido com sucesso.");
        if (setDeleting) setDeleting(false);

        // Chama a função de recarregar a lista se for passada
        if (refreshData) refreshData();

    } catch (err) {
        console.error(err);
        const message = err.response?.data?.message || "Erro ao deletar prédio.";
        alert(message);
        if (setDeleting) setDeleting(false);
    }
};

// ==========================================================
// ATUALIZAR PRÉDIO
// ==========================================================
export const updatePredio = async (predio, setSubmitting, setFieldError) => {
    try {
        await api.put(`/predios/${predio.id}`, predio);

        alert("Prédio atualizado com sucesso!");
        setSubmitting(false);

    } catch (err) {
        console.error(err);
        setSubmitting(false);
        const message = err.response?.data?.message || "Erro ao atualizar.";

        if (setFieldError) {
            setFieldError('nome', message);
        } else {
            alert(message);
        }
    }
};

export const getApartamentosByPredio = async (predioId, setApartamentos) => {
    try {
        const response = await api.get(`/apartamentos/predio/${predioId}`);
        setApartamentos(response.data);
    } catch (err) {
        console.error("Erro ao buscar apartamentos do prédio:", err);
        // Não precisa alertar sempre, as vezes só não tem nenhum mesmo
        setApartamentos([]);
    }
};