import api from "./api";

export const getChamados = async () => {
    const response = await api.get('/chamados');
    return response.data;
};

export const getMeusChamados = async () => {
    const response = await api.get('/me/chamados');
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
