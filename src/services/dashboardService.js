import api from "./api";

export const getDashboardAdmin = async (setLoading, setDashboardData) => {
    try {
        setLoading(true);
        const response = await api.get('/dashboard/admin');
        setDashboardData(response.data);
    } catch (err) {
        console.error("Erro ao buscar dashboard admin:", err);
        const message = err.response?.data?.message || "Erro ao carregar dados.";
        window.alert(message);
    } finally {
        setLoading(false);
    }
};

export const getDashboardClient = async (setLoading, setDashboardData) => {
    try {
        setLoading(true);
        const response = await api.get('/dashboard/client');
        setDashboardData(response.data);
    } catch (err) {
        console.error("Erro ao buscar dashboard cliente:", err);
        const message = err.response?.data?.message || "Erro ao carregar dados.";
        window.alert(message);
    } finally {
        setLoading(false);
    }
};
