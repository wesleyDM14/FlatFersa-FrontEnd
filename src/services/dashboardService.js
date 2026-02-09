import axios from "axios";
import { sessionService } from "redux-react-session";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'
});

api.interceptors.request.use(async (config) => {
    try {
        const session = await sessionService.loadSession();
        if (session && session.token) {
            config.headers.Authorization = `Bearer ${session.token}`;
        }
    } catch (err) {
    }
    return config;
});

export const getDashboardAdmin = async (setLoading, setDashboardData) => {
    try {
        setLoading(true);
        const response = await api.get('/dashboard/admin');

        setDashboardData(response.data);
        setLoading(false);
    } catch (err) {
        console.error("Erro ao buscar dashboard admin:", err);
        setLoading(false);

        const message = err.response?.data?.message || "Erro ao carregar dados.";
        if (message !== "Unauthorized") {
            window.alert(message);
        }
    }
};

export const getDashboardClient = async (setLoading, setDashboardData) => {
    try {
        setLoading(true);
        const response = await api.get('/dashboard/client');

        setDashboardData(response.data);
        setLoading(false);
    } catch (err) {
        console.error("Erro ao buscar dashboard cliente:", err);
        setLoading(false);

        const message = err.response?.data?.message || "Erro ao carregar dados.";
        if (message !== "Unauthorized") {
            window.alert(message);
        }
    }
};