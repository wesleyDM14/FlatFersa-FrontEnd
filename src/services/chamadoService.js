import api from "./api";

// Admin: { items, total, page, totalPages }
export const getChamados = async ({ page = 1, limit = 10, search = '' } = {}) => {
    const response = await api.get('/chamados', { params: { page, limit, search } });
    return response.data;
};

// Cliente vendo os próprios chamados: { items, total, page, totalPages }
export const getMeusChamados = async ({ page = 1, limit = 10 } = {}) => {
    const response = await api.get('/me/chamados', { params: { page, limit } });
    return response.data;
};

export const getChamadoById = async (chamadoId) => {
    const response = await api.get(`/chamados/${chamadoId}`);
    return response.data;
};

export const criarChamado = async (formData) => {
    const response = await api.post('/chamados', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

export const atualizarStatusChamado = async (chamadoId, status, respostaAdmin) => {
    const response = await api.put(`/chamados/${chamadoId}/status`, { status, respostaAdmin });
    return response.data;
};
