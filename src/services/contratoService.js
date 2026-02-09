import axios from "axios";
import { saveAs } from "file-saver";
import { sessionService } from "redux-react-session";

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
export const getContratos = async (setContratos, setContratoAtivo, setContratosAtivos, setContratosSolicitacao, setLoading, isAdmin) => {
    try {
        const endpoint = isAdmin ? '/contratos' : '/contratos-cliente';
        const response = await api.get(endpoint);
        const contratosData = response.data;

        setContratos(contratosData);

        if (isAdmin) {
            // Lógica Admin
            const ativos = contratosData.filter(c => c.statusContrato === 'ATIVO');
            const solicitacoes = contratosData.filter(c => c.statusContrato === 'AGUARDANDO');

            if (setContratosAtivos) setContratosAtivos(ativos);
            if (setContratosSolicitacao) setContratosSolicitacao(solicitacoes);
        } else {
            // Lógica Cliente
            const temAtivo = contratosData.some(c => c.statusContrato === 'ATIVO' || c.statusContrato === 'AGUARDANDO');
            if (setContratoAtivo) setContratoAtivo(temAtivo);
        }

    } catch (err) {
        console.error(err);
        // alert(err.response?.data?.message || "Erro ao buscar contratos");
    } finally {
        if (setLoading) setLoading(false);
    }
};

// --- CRIAÇÃO ---
export const createContrato = async (contratoData, isAdmin, navigate, setSubmitting, setFieldError) => {
    try {
        const endpoint = isAdmin ? '/contratos' : '/contratos/solicitar';

        await api.post(endpoint, contratoData);

        alert("Contrato/Solicitação criado com sucesso!");
        navigate('/contratos');

    } catch (err) {
        const msg = err.response?.data?.message || "Erro ao criar contrato";
        console.error(msg);

        if (setFieldError) {
            // Tenta jogar erro num campo genérico ou específico
            setFieldError('valorAluguel', msg);
        } else {
            alert(msg);
        }
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

// --- GET BY ID ---
export const getContratoById = async (contratoId, setContrato) => {
    try {
        const response = await api.get(`/contratos/${contratoId}`);
        setContrato(response.data);
    } catch (err) {
        console.error(err);
    }
};

// --- DOWNLOAD PDF ---
export const downloadContract = async (contratoId, setIsDownloading) => {
    try {
        const response = await api.get(`/contratos/download/${contratoId}`, {
            responseType: 'blob' // Importante para arquivos
        });

        // Cria o blob e dispara o download
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, `contrato_${contratoId}.pdf`);

    } catch (err) {
        console.error(err);
        alert("Erro ao baixar o contrato. Verifique se o arquivo existe.");
    } finally {
        if (setIsDownloading) setIsDownloading(false);
    }
};

// --- APROVAR ---
export const approveContract = async (contractData, setSubmitting, setFieldError, setLoading) => {
    try {
        await api.post('/contratos/aprovar', contractData);
        alert("Contrato Aprovado com Sucesso!");
        if (setLoading) setLoading(true); // Força refresh na lista
    } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || "Erro ao aprovar";
        if (setFieldError) setFieldError('limiteKwh', msg);
        else alert(msg);
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

// --- REPROVAR / CANCELAR ---
export const desapproveContract = async (contratoId, setLoading) => {
    try {
        await api.get(`/contratos/reprovar/${contratoId}`);
        alert("Contrato Reprovado.");
        if (setLoading) setLoading(true);
    } catch (err) {
        console.error(err);
        alert("Erro ao reprovar.");
    }
};

export const cancelContract = async (contratoId, message, setLoading) => {
    try {
        await api.post('/contratos/cancelar', { contratoId, message });
        alert("Contrato Cancelado.");
        if (setLoading) setLoading(true);
    } catch (err) {
        console.error(err);
        alert("Erro ao cancelar.");
    }
};

// --- DELETAR ---
export const deleteContratoById = async (contratoId, closeDeleteModal, setLoading) => {
    try {
        await api.delete(`/contratos/${contratoId}`);
        alert("Contrato excluído.");
        if (closeDeleteModal) closeDeleteModal();
        if (setLoading) setLoading(true);
    } catch (err) {
        console.error(err);
        alert("Erro ao excluir.");
    }
};

// --- ASSINAR (UPLOAD) ---
export const assinarContratoById = async (data, setSubmitting, setFieldError, closeModalAssinatura) => {
    try {
        const formData = new FormData();
        formData.append('contratoId', data.contratoId);
        formData.append('contrato', data.contrato); // O arquivo PDF

        await api.put(`/contratos/assinar/${data.contratoId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Contrato assinado enviado com sucesso!");
        if (closeModalAssinatura) closeModalAssinatura();

    } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || "Erro ao enviar assinatura";
        if (setFieldError) setFieldError('contrato', msg);
        else alert(msg);
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};