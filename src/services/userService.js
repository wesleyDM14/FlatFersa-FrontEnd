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

export const getUserInfo = async (user, setUserInfo, setLoading) => {
    if (user.isAdmin) {
        let userInfo = {};
        userInfo.name = 'Admin';
        setUserInfo(userInfo);
        setLoading(false);
    } else {
        
    }
}

export const requestCreateClient = async (newClient, navigate, setFieldError, setSubmitting) => {
    console.log(newClient);
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
