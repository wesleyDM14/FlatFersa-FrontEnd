import axios from "axios";

export const getDashboardAdmin = async (user, setDashbaordData, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/dashboard/admin', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setDashbaordData(response.data);
        setLoading(false);
    }).catch((err) => {
        console.error(err.response.data.message);
        window.alert(err.response.data.message);
    });
}

export const getDashboardClient = async (user, setDashbaordData, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/dashboard/client', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setDashbaordData(response.data);
        setLoading(false);
    }).catch((err) => {
        console.error(err.response.data.message);
        window.alert(err.response.data.message);
    });
}