import axios from "axios";

import { sessionService } from "redux-react-session";

export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', credentials, {
        "Content-Type": "application/json"
    }).then((response) => {
        const { data } = response;
        const userData = data;
        const token = userData.accessToken;

        sessionService.saveSession(token).then(() => {
            sessionService.saveUser(token).then(() => {
                navigate('/dashboard');
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));

        setSubmitting(false);
    }).catch((err) => {
        const { data } = err.response;
        setFieldError('email', data.error);
        setFieldError('password', data.error);
        setSubmitting(false);
    });
}

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate('/login');
}