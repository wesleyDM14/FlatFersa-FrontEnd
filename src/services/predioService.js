import api from "./api";

// ==========================================================
// LISTAR PRÉDIOS
// ==========================================================
export const getPredios = async (setPredios) => {
    try {
        const response = await api.get('/predios');
        setPredios(response.data);
    } catch (err) {
        console.error("Erro ao buscar prédios:", err);
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
        const response = await api.get(`/predios/${predioId}/apartamentos`);
        setApartamentos(response.data);
    } catch (err) {
        console.error("Erro ao buscar apartamentos do prédio:", err);
        setApartamentos([]);
    }
};
