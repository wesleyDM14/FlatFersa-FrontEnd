import axios from "axios";

import { sessionService } from "redux-react-session";

export const loginUser = async (credentials, navigate, setFieldError, setSubmitting) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', credentials, {
        "Content-Type": "application/json"
    }).then((response) => {
        const { data } = response;
        const userData = data;
        const token = userData.accessToken;

        sessionService.saveSession(token).then(() => {
            sessionService.saveUser(token).then(() => {
                setSubmitting(false);
                navigate('/dashboard');
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }).catch((err) => {
        const { data } = err.response;
        setFieldError('email', data.error);
        setFieldError('password', data.error);
        setSubmitting(false);
    });
}

export const getLoggedUserInfo = async (user, setUserInfo, setLoading, setStartDate) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/user-info', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then(async (response) => {
        const { data } = response;
        setUserInfo(data);
        if (!user.isAdmin) {
            setStartDate(new Date(data.dateBirth));
        }
        setLoading(false);
    }).catch(err => {
        console.error(err.message);
    });
}

export const updateUserLoggedIn = async (user, data, setSubmitting, setFieldError, setLoading) => {
    if (user.isAdmin) {
        await axios.put(process.env.REACT_APP_BACKEND_URL + '/api/users/update', data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then(async (response) => {
            const { data } = response;
            const newToken = data.accessToken;
            await sessionService.saveSession(newToken);
            await sessionService.saveUser(newToken);
            alert('Senha Alterada com Sucesso');
            setSubmitting(false);
            setLoading(true);
        }).catch(err => {
            console.error(err.message);
            setSubmitting(false);
            setFieldError('newPassword', err.message);
            alert('Erro ao mudar a senha');
        });
    } else {
        if (data.newPassword) {
            let newData = { currentPassword: data.currentPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword }
            await axios.put(process.env.REACT_APP_BACKEND_URL + '/api/users/update', newData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                }
            }).then(async (response) => {
                const { data } = response;
                const userData = data;
                const token = userData.newToken;
                await sessionService.saveSession(token);
                await sessionService.saveUser(token);
                alert('Senha Alterada com Sucesso');
            }).catch(err => {
                console.error(err.message);
                setSubmitting(false);
                setFieldError('newPassword', err.message);
                alert('Erro ao mudar a senha');
            });
        }
        await axios.put(process.env.REACT_APP_BACKEND_URL + `/api/clients/${data.id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            const { data } = response;
            setSubmitting(false);
            alert(data.message);
            setLoading(true);
        }).catch((err) => {
            console.log(err);
            setFieldError('newPassword', err.message);
            setSubmitting(false);
        });
    }
}

export const requestCreateClient = async (newClient, navigate, setFieldError, setSubmitting) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/signin', newClient, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        const { data } = response;
        console.log(data);
        setSubmitting(false);
        navigate('/');
    }).catch((err) => {
        console.log(err);
        setFieldError(err.message);
        setSubmitting(false);
    });
}

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate('/login');
}
