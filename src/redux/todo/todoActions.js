import axios from "axios";
import {
  FETCH_TODO_FAILURE,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from "./todoTypes";
import API from "../../utils/api";

// Funciones que setean el estado
const fetchTodoRequest = () => {
  return {
    type: FETCH_TODO_REQUEST,
  };
};

const fetchTodoSuccess = (todo) => {
  return {
    type: FETCH_TODO_SUCCESS,
    payload: todo,
  };
};

const fetchTodoFailure = (error) => {
  return {
    type: FETCH_TODO_FAILURE,
    payload: error,
  };
};

// Obtenemos las tareas por estaus
export const getTodo = (status) => {
  return (dispatch) => {
    dispatch(fetchTodoRequest);
    axios
      .get(`${API.BASE_API}/todo?where={"status":${status}}`, API.CONFIG)
      .then((response) => {
        // agregamos el id a cada tarea
        const todo = response.data.results.map((item) => ({
          ...item,
          id: item.objectId,
        }));
        // Ordenamos las tareas por ultima actualización
        todo.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        dispatch(fetchTodoSuccess(todo));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTodoFailure(errorMsg));
      });
  };
};

// Actualiza la tarea
export const putTodo = (objectId, todo) => {
  return (dispatch) => {
    dispatch(fetchTodoRequest);
    axios
      .put(`${API.BASE_API}/todo/${objectId}`, todo, API.CONFIG)
      .then((response) => {
        dispatch(getTodo(true));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTodoFailure(errorMsg));
      });
  };
};

// Registra una nueva tarea
export const postTodo = (todo) => {
  return (dispatch) => {
    dispatch(fetchTodoRequest);
    axios
      .post(`${API.BASE_API}/todo/`, todo, API.CONFIG)
      .then((response) => {
        dispatch(getTodo(true));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTodoFailure(errorMsg));
      });
  };
};

// Elimina una tarea
export const deleteTodo = (objectId) => {
  return (dispatch) => {
    dispatch(fetchTodoRequest);
    axios
      .delete(`${API.BASE_API}/todo/${objectId}`, API.CONFIG)
      .then((response) => {
        dispatch(getTodo(true));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTodoFailure(errorMsg));
      });
  };
};
