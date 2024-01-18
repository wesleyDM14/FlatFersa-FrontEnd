import axios from "axios"

import { sessionService } from "redux-react-session";

import { BaseUrl } from "../../components/BaseUrl"

export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    //Make checks and get some data
    axios.post(BaseUrl + 'session', credentials, {
        "Content-Type": "application/json"
    }
    ).then((response) => {
        const { data } = response;
        const userData = data;
        const token = userData.token;

        sessionService.saveSession(token).then(() => {
            sessionService.saveUser(userData).then(() => {
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

export const signupUser = (credentials, navigate, setFieldError, setSubmitting) => {

}

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    console.log('entrou aqui');
    navigate('/');
}