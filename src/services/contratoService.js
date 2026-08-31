import api from "./api";
import { saveAs } from "file-saver";

// Listagem paginada (admin) - backend agora retorna { items, total, page, totalPages }
export const getContratos = async ({ page = 1, limit = 10, search = '', status = '' } = {}) => {
    const response = await api.get('/contratos', { params: { page, limit, search, status } });
    return response.data;
};

// Contagens globais (Ativos/Solicitações/Total) para os cards, sem carregar a lista inteira
export const getContratosCounts = async () => {
    const response = await api.get('/contratos/counts');
    return response.data;
};

// Lista pequena por natureza (contratos do próprio cliente) - continua sem paginação real
export const getMeusContratos = async () => {
    const response = await api.get('/me/contratos');
    return response.data;
};

export const getContratoById = async (contratoId) => {
    const response = await api.get(`/contratos/${contratoId}`);
    return response.data;
};

export const solicitarContrato = async (data) => {
    const response = await api.post('/contratos/solicitar', data);
    return response.data;
};

export const criarContratoDireto = async (data) => {
    const response = await api.post('/contratos', data);
    return response.data;
};

export const configurarContrato = async (data) => {
    const response = await api.put('/contratos/configurar', data);
    return response.data;
};

export const reprovarContrato = async (contratoId, motivo) => {
    const response = await api.put(`/contratos/${contratoId}/reprovar`, { motivo });
    return response.data;
};

export const cancelarContrato = async (contratoId, motivo) => {
    const response = await api.put('/contratos/cancelar', { contratoId, motivo });
    return response.data;
};

export const editarContrato = async (contratoId, data) => {
    const response = await api.put(`/contratos/${contratoId}/editar`, data);
    return response.data;
};

export const renovarContrato = async (contratoId, data) => {
    const response = await api.post(`/contratos/${contratoId}/renovar`, data);
    return response.data;
};

export const transferirApartamento = async (contratoId, data) => {
    const response = await api.post(`/contratos/${contratoId}/transferir`, data);
    return response.data;
};

export const assinarContrato = async (contratoId, arquivo) => {
    const formData = new FormData();
    formData.append('file', arquivo);
    const response = await api.post(`/contratos/${contratoId}/assinar`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

export const downloadContratoPDF = async (contratoId) => {
    const response = await api.get(`/contratos/${contratoId}/pdf`, {
        responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    saveAs(blob, `contrato_${contratoId}.pdf`);
};
