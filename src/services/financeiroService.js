import axios from "axios";

export const getParcelas = async (user, setParcelas, setLoading) => {
    if (user.isAdmin) {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/aluguel', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            setParcelas(response.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    } else {
        console.log('entrou');
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/aluguel/cliente', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            setParcelas(response.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    }

}