import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/rootReducer';

import { sessionService } from "redux-react-session";

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});

sessionService.initSessionService(store);

export default store;