import api from "./api";

export const getApartamentos = async (setApartamentos) => {
    try {
        const response = await api.get('/apartamentos');
        setApartamentos(response.data);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
    }
};

export const getApartamentosByPredioId = async (predioId, setApartamentos) => {
    try {
        const response = await api.get(`/predios/${predioId}/apartamentos`);
        setApartamentos(response.data);
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        setApartamentos([]);
    }
};

// Utilitário para telas que precisam escolher um apartamento vago (ex: transferência de contrato)
export const getApartamentosVagos = async () => {
    const response = await api.get('/apartamentos');
    return response.data.filter(a => a.status === 'VAGO');
};

export const createApartamento = async (apartamentoData, navigate, setSubmitting, setFieldError) => {
    try {
        const response = await api.post('/apartamentos', apartamentoData);
        alert(response.data.message || "Apartamento criado com sucesso!");
        navigate('/apartamentos');
    } catch (error) {
        console.error(error.response?.data?.message);
        if (setFieldError) {
            setFieldError('numero', error.response?.data?.message || "Erro ao criar");
        } else {
            alert(error.response?.data?.message);
        }
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

export const getApartamentoById = async (apartamentoId, setApartamento) => {
    try {
        const response = await api.get(`/apartamentos/${apartamentoId}`);
        setApartamento(response.data);
    } catch (error) {
        console.error(error.response?.data?.message);
    }
};

export const getHistoricoApartamento = async (apartamentoId) => {
    const response = await api.get(`/apartamentos/${apartamentoId}/historico`);
    return response.data;
};

export const updateApartamento = async (values, setSubmitting, setFieldError) => {
    try {
        const response = await api.put(`/apartamentos/${values.id}`, values);
        alert(response.data.message || "Atualizado com sucesso");
    } catch (error) {
        console.error(error.response?.data?.message);
        if (setFieldError) {
            setFieldError('numero', error.response?.data?.message);
        } else {
            alert(error.response?.data?.message);
        }
    } finally {
        if (setSubmitting) setSubmitting(false);
    }
};

export const deleteApartamentoById = async (apartamentoId, setDeletting) => {
    try {
        const response = await api.delete(`/apartamentos/${apartamentoId}`);
        alert(response.data.message || "Excluído com sucesso");
    } catch (error) {
        console.error(error.response?.data?.message);
        alert(error.response?.data?.message || "Erro ao excluir");
    } finally {
        if (setDeletting) setDeletting(false);
    }
};
