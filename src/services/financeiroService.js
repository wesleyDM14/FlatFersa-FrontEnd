import axios from "axios";
import { sessionService } from "redux-react-session";

// Importe suas imagens de assets aqui se precisar usar no frontend, 
// mas geralmente imagens estáticas ficam no componente.
// Vou retornar strings de status para o componente decidir qual imagem mostrar.

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'
});

// Interceptor
api.interceptors.request.use(async (config) => {
    try {
        const session = await sessionService.loadSession();
        if (session && session.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }
    } catch (err) {
        console.error("Erro sessão", err);
    }
    return config;
});

// --- LISTAGEM ---
export const getParcelas = async (isAdmin) => {
    try {
        const endpoint = isAdmin ? '/aluguel' : '/aluguel-cliente';
        const response = await api.get(endpoint);

        // Retorna os dados puros (array de parcelas).
        // Se for cliente, a API antiga retornava array dentro de array? 
        // Vou tratar para garantir que retorne sempre um array plano.
        const data = response.data;
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
            return data[0]; // Correção para estrutura aninhada antiga
        }
        return data;

    } catch (err) {
        console.error(err);
        throw err; // Lança erro para o componente tratar
    }
};

// --- DETALHES ---
export const getParcelaById = async (prestacaoId) => {
    try {
        // Busca dados da parcela
        const resParcela = await api.get(`/aluguel/${prestacaoId}`);
        // Busca infos extras (contrato, etc)
        const resInfos = await api.get(`/aluguel/infos/${prestacaoId}`);

        return {
            parcela: resParcela.data,
            infos: resInfos.data
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// --- PIX ---
export const gerarCodigoPix = async (prestacaoId) => {
    try {
        const response = await api.post('/aluguel/generateQrCode', { prestacaoId });
        return response.data; // { status, base64, payload }
    } catch (err) {
        console.error(err);
        return null;
    }
};

// --- AÇÕES ---
export const registrarLeitura = async (data, closeModal) => {
    try {
        await api.put(`/aluguel/${data.prestacaoId}`, data);
        alert("Leitura registrada com sucesso!");
        if (closeModal) closeModal();
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Erro ao registrar leitura");
    }
};

export const registrarPagamento = async (data, closeModal) => {
    try {
        const formData = new FormData();
        formData.append('comprovante', data.comprovante);

        await api.put(`/aluguel/pagamento/${data.prestacaoId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Comprovante enviado com sucesso! Aguarde aprovação.");
        if (closeModal) closeModal();
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Erro ao enviar comprovante");
    }
};

export const aprovarPagamento = async (prestacaoId) => {
    try {
        await api.put(`/aluguel/aprovar/${prestacaoId}`, { prestacaoId });
        alert("Pagamento Aprovado!");
    } catch (err) {
        console.error(err);
        alert("Erro ao aprovar.");
    }
};

export const reprovarPagamento = async (prestacaoId) => {
    try {
        await api.put(`/aluguel/reprovar/${prestacaoId}`, { prestacaoId });
        alert("Pagamento Reprovado.");
    } catch (err) {
        console.error(err);
        alert("Erro ao reprovar.");
    }
};

export const marcarPago = async (prestacaoId) => {
    try {
        await api.put(`/aluguel/marcarPago/${prestacaoId}`, { prestacaoId });
        alert("Marcado como PAGO manualmente.");
    } catch (err) {
        console.error(err);
        alert("Erro ao marcar como pago.");
    }
};

export const marcarPendente = async (prestacaoId) => {
    try {
        await api.put(`/aluguel/marcarPendente/${prestacaoId}`, { prestacaoId });
        alert("Retornado para PENDENTE.");
    } catch (err) {
        console.error(err);
        alert("Erro ao alterar status.");
    }
};

// --- COMPROVANTE ---
export const getComprovante = async (parcelaId) => {
    try {
        const response = await api.get(`/linkAluguel/${parcelaId}`, {
            responseType: "blob"
        });
        return URL.createObjectURL(response.data);
    } catch (err) {
        console.error(err);
        return null;
    }
};