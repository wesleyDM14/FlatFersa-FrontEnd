//import axios from "axios";

import { sessionService } from "redux-react-session";

export const loginUser = () => {

}

export const logoutUser = (navigate) => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate('/login');
}