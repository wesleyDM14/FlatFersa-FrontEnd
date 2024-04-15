import { configureStore } from "@reduxjs/toolkit";
import { sessionService } from "redux-react-session";

import rootReducer from "./reducers/rootReducer";

const store = configureStore({ reducer: rootReducer });

sessionService.initSessionService(store);

export default store;