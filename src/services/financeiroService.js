import api from "./api";
import { getMeusContratos } from "./contratoService";

// --- LISTAGEM ---
// Admin vê todas as faturas do sistema. Cliente vê as faturas dos seus próprios contratos
// (o backend não expõe uma listagem de faturas para o cliente, elas já vêm dentro de /me/contratos).
export const getFaturas = async (isAdmin) => {
    if (isAdmin) {
        const response = await api.get('/faturas');
        return response.data;
    }

    const contratos = await getMeusContratos();
    const faturas = [];
    contratos.forEach(contrato => {
        (contrato.faturas || []).forEach(fatura => {
            faturas.push({ ...fatura, contrato });
        });
    });
    return faturas;
};

// --- DETALHES ---
export const getFaturaById = async (faturaId) => {
    const response = await api.get(`/faturas/${faturaId}`);
    return response.data;
};

// --- PIX ---
export const gerarCodigoPix = async (faturaId) => {
    try {
        const response = await api.get(`/faturas/${faturaId}/pix`);
        return response.data; // { payload, base64 }
    } catch (err) {
        console.error(err);
        return null;
    }
};

// --- LEITURA DE ENERGIA (ADMIN) ---
export const registrarLeitura = async (faturaId, leituraAtual, arquivo) => {
    const formData = new FormData();
    formData.append('leituraAtual', leituraAtual);
    if (arquivo) formData.append('file', arquivo);

    const response = await api.put(`/faturas/${faturaId}/leitura`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

// --- EDIÇÃO MANUAL DE VALORES (ADMIN) ---
export const editarValoresFatura = async (faturaId, { multa, acrescimo, desconto, observacao }) => {
    const response = await api.put(`/faturas/${faturaId}/valores`, { multa, acrescimo, desconto, observacao });
    return response.data;
};

// --- COMPROVANTE (CLIENTE) ---
export const enviarComprovante = async (faturaId, arquivo) => {
    const formData = new FormData();
    formData.append('file', arquivo);

    const response = await api.post(`/faturas/${faturaId}/comprovante`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

// --- APROVAÇÃO DE PAGAMENTO (ADMIN) ---
export const aprovarPagamento = async (faturaId) => {
    const response = await api.put(`/faturas/${faturaId}/aprovar`);
    return response.data;
};

export const reprovarPagamento = async (faturaId, motivo) => {
    const response = await api.put(`/faturas/${faturaId}/reprovar`, { motivo });
    return response.data;
};
