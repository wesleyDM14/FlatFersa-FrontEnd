import { combineReducers } from "@reduxjs/toolkit";

//session
import { sessionReducer } from "redux-react-session";

const rootReducer = combineReducers({
    session: sessionReducer
});

export default rootReducer;