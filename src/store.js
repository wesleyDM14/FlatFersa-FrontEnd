import { configureStore } from "@reduxjs/toolkit";
import { sessionService } from "redux-react-session";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const validateSession = (session) => {
    return true;
};

const options = {
    refreshOnCheckAuth: true,
    redirectPath: '/login',
    driver: 'COOKIES',
    validateSession
};

sessionService.initSessionService(store, options);

export default store;