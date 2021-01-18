import {
  FETCH_TODO_FAILURE,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from "./todoTypes";

// Estado inicial de las tareas
const initialState = {
  loading: false,
  todoList: [],
  error: "",
};

// Determina los estados de las tareas
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TODO_SUCCESS:
      return {
        loading: false,
        todoList: action.payload,
        error: "",
      };
    case FETCH_TODO_FAILURE:
      return {
        loading: false,
        todoList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
