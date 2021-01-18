import { combineReducers } from "redux";
import todoReducer from "./todo/todoReducer";
import dayReducer from "./day/dayReducer";

// Registra los reducers
const rootReducer = combineReducers({
  todo: todoReducer,
  day: dayReducer,
});

export default rootReducer;
