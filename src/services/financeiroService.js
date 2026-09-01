import api from "./api";
import { getMeusContratos } from "./contratoService";
import { formatDateBR } from "../utils/dateUtils";

// --- LISTAGEM ---
// Admin: backend pagina de verdade (/faturas?page&limit&search&status -> {items,total,page,totalPages}).
// Cliente: o backend não expõe uma listagem de faturas para o cliente (elas já vêm dentro de /me/contratos),
// então paginamos/filtramos aqui mesmo, do lado do cliente, mas devolvendo o MESMO formato {items,total,page,totalPages}
// para a página não precisar tratar admin/cliente de formas diferentes.
export const getFaturas = async (isAdmin, { page = 1, limit = 10, search = '', status = '' } = {}) => {
    if (isAdmin) {
        const response = await api.get('/faturas', { params: { page, limit, search, status } });
        return response.data;
    }

    const contratos = await getMeusContratos();
    let faturas = [];
    contratos.forEach(contrato => {
        (contrato.faturas || []).forEach(fatura => {
            faturas.push({ ...fatura, contrato });
        });
    });

    if (status) {
        faturas = faturas.filter(f => f.status === status);
    }

    if (search) {
        const term = search.toLowerCase();
        faturas = faturas.filter(f =>
            f.contrato?.cliente?.nome?.toLowerCase().includes(term) ||
            formatDateBR(f.dataVencimento).includes(term) ||
            f.status?.toLowerCase().includes(term)
        );
    }

    const total = faturas.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const items = faturas.slice(start, start + limit);

    return { items, total, page, totalPages };
};

// --- CONTAGENS PARA OS CARDS (Pago/Pendente/Atrasado/Em Análise/Total) ---
export const getFaturasCounts = async (isAdmin) => {
    if (isAdmin) {
        const response = await api.get('/faturas/counts');
        return response.data;
    }

    // Não existe rota de counts para cliente; como a lista dele já é pequena
    // (faturas dos próprios contratos), calculamos localmente.
    const contratos = await getMeusContratos();
    const faturas = [];
    contratos.forEach(contrato => (contrato.faturas || []).forEach(f => faturas.push(f)));

    return {
        pago: faturas.filter(f => f.status === 'PAGO').length,
        pendente: faturas.filter(f => f.status === 'PENDENTE').length,
        atrasado: faturas.filter(f => f.status === 'ATRASADO').length,
        emAnalise: faturas.filter(f => f.status === 'EM_ANALISE').length,
        total: faturas.length,
    };
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
export const registrarLeitura = async (faturaId, leituraAtual, arquivo, leituraAnterior) => {
    const formData = new FormData();
    formData.append('leituraAtual', leituraAtual);
    if (leituraAnterior !== undefined && leituraAnterior !== '') formData.append('leituraAnterior', leituraAnterior);
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
