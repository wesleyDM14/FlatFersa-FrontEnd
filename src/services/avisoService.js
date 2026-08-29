import api from "./api";

export const getMeusAvisos = async () => {
    const response = await api.get('/me/avisos');
    return response.data;
};

export const marcarAvisoComoLido = async (avisoId) => {
    const response = await api.put(`/avisos/${avisoId}/lido`);
    return response.data;
};

export const deleteAviso = async (avisoId) => {
    const response = await api.delete(`/avisos/${avisoId}`);
    return response.data;
};

export const enviarAvisoGeral = async (titulo, conteudo, tipo) => {
    const response = await api.post('/avisos/geral', { titulo, conteudo, tipo });
    return response.data;
};

export const enviarAvisoIndividual = async (userId, titulo, conteudo, tipo) => {
    const response = await api.post('/avisos/individual', { userId, titulo, conteudo, tipo });
    return response.data;
};
