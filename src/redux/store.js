import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// Crea el store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
