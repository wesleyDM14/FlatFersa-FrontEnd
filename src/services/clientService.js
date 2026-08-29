import api from "./api";

// --- LISTAGEM GERAL (Para a tela de Clientes) ---
export const getClientes = async (setClients, setSolicitacoes, setAtivos, setLoading) => {
    try {
        const response = await api.get('/clients');
        const clientes = response.data;

        const ativos = clientes.filter(c => c.statusCadastro === 'APROVADO');
        const solicitacoes = clientes.filter(c => c.statusCadastro === 'PENDENTE_APROVACAO');

        if (setSolicitacoes) setSolicitacoes(solicitacoes);
        if (setAtivos) setAtivos(ativos);
        setClients(clientes);
    } catch (err) {
        console.error(err.response?.data?.message || err.message);
    } finally {
        if (setLoading) setLoading(false);
    }
};

// --- LISTAGEM PARA CONTRATO (Apenas cadastros aprovados) ---
export const getClientesForContract = async (setClients, setLoading) => {
    try {
        const response = await api.get('/clients');
        const clientesAprovados = response.data.filter(c => c.statusCadastro === 'APROVADO');
        setClients(clientesAprovados);
    } catch (err) {
        console.error("Erro ao buscar clientes para contrato", err);
        alert("Erro ao carregar lista de clientes.");
    } finally {
        if (setLoading) setLoading(false);
    }
};

// --- CRIAÇÃO ---
export const createCliente = async (clienteData, navigate, setSubmitting, setFieldError) => {
    try {
        const formData = new FormData();
        Object.keys(clienteData).forEach(key => {
            if (clienteData[key] !== null && clienteData[key] !== undefined) {
                if (key === 'dateBirth' && clienteData[key] instanceof Date) {
                    formData.append(key, clienteData[key].toISOString());
                } else {
                    formData.append(key, clienteData[key]);
                }
            }
        });

        await api.post('/clients', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert("Cliente criado com sucesso!");
        navigate('/clientes');
    } catch (err) {
        const msg = err.response?.data?.message || "Erro ao criar cliente";
        if (setFieldError) setFieldError('name', msg);
        else alert(msg);
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

// --- BUSCAR POR ID ---
export const getClienteById = async (clientId, setClient, setLoading) => {
    try {
        const response = await api.get(`/clients/${clientId}`);
        setClient(response.data);
    } catch (err) {
        console.error(err);
    } finally {
        if (setLoading) setLoading(false);
    }
};

// --- ATUALIZAR ---
// clientData deve usar os mesmos nomes de campo do createCliente (name, cpf, rg, dateBirth, phone, address)
export const updateClientById = async (clientData, setSubmitting, setFieldError, closeEditModal) => {
    try {
        const formData = new FormData();
        Object.keys(clientData).forEach(key => {
            if (clientData[key] !== null && clientData[key] !== undefined) {
                if (key === 'dateBirth' && clientData[key] instanceof Date) {
                    formData.append(key, clientData[key].toISOString());
                } else {
                    formData.append(key, clientData[key]);
                }
            }
        });

        const response = await api.put(`/clients/${clientData.id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        alert(response.data.message || "Cliente atualizado!");
        if (closeEditModal) closeEditModal();

    } catch (err) {
        const msg = err.response?.data?.message || "Erro ao atualizar";
        if (setFieldError) setFieldError('name', msg);
        else alert(msg);
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

// --- DELETAR ---
export const deleteClientById = async (clientId, setDeletting) => {
    try {
        await api.delete(`/clients/${clientId}`);
        alert("Cliente removido com sucesso.");
    } catch (err) {
        alert(err.response?.data?.message || "Erro ao remover cliente.");
    } finally {
        if (setDeletting) setDeletting(false);
    }
};

// --- APROVAÇÃO ---
export const aproveClient = async (clientId, setLoading, closeModal) => {
    try {
        await api.post('/users/approve', { clientId });
        alert("Cliente Aprovado!");
        if (closeModal) closeModal();
    } catch (err) {
        alert(err.response?.data?.message || "Erro ao aprovar.");
    } finally {
        if (setLoading) setLoading(false);
    }
};

export const reproveClient = async (clientId, motivo, setLoading, closeModal) => {
    try {
        await api.post('/users/reprove', { clientId, motivo });
        alert("Cliente Reprovado.");
        if (closeModal) closeModal();
    } catch (err) {
        alert(err.response?.data?.message || "Erro ao reprovar.");
    } finally {
        if (setLoading) setLoading(false);
    }
};

// --- IMAGENS ---
export const getDocumentoImagem = async (clientId, tipo) => {
    try {
        const endpoint = tipo === 'Frente' ? 'doc-frente' : 'doc-verso';
        const response = await api.get(`/clients/${clientId}/${endpoint}`, {
            responseType: "blob"
        });
        return URL.createObjectURL(response.data);
    } catch (err) {
        console.error(`Erro ao buscar documento ${tipo}`, err);
        return null;
    }
};
