import axios from "axios";
import { BaseUrl } from "../../components/BaseUrl";

export const registerApartment = async (apartment, user, { closeRegisterModal, setLoading, setFieldError, setSubmitting }) => {
    await axios.post(BaseUrl + 'apartments', apartment, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }).then((response) => {
        closeRegisterModal();
        setLoading(true);
    }).catch(err => {
        const { response } = err;
        const { data } = response;
        setFieldError('number', data.error);
    });
}

export const getAllApartment = async (user, { setLoading }) => {
    let apartments = [];
    await axios.get(BaseUrl + 'apartments', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${user.token}`
        }
    }).then((response) => {
        const { data } = response;
        apartments = data.apartments;
    }).catch(err => console.error(err));
    setLoading(false);
    return apartments;
}

export const deleteApartment = async (user, selectedApartment, { setLoading, closeDeleteModal }) => {
    await axios.post(BaseUrl + 'deleteApartment', { apartment_id: selectedApartment.id }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
        }
    }).then((response) => {
        const {data} = response;
        console.log(data.message);
        closeDeleteModal();
        setLoading(true);
    }).catch(err => console.error(err));
}