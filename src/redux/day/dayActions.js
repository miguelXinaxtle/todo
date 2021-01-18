import axios from "axios";
import {
  FETCH_DAY_FAILURE,
  FETCH_DAY_REQUEST,
  FETCH_DAY_SUCCESS,
} from "./dayTypes";
import API from "../../utils/api";

// Funciones que setean el estado
const fetchDayRequest = () => {
  return {
    type: FETCH_DAY_REQUEST,
  };
};

const fetchDaySuccess = (day) => {
  return {
    type: FETCH_DAY_SUCCESS,
    payload: day,
  };
};

const fetchDayFailure = (error) => {
  return {
    type: FETCH_DAY_FAILURE,
    payload: error,
  };
};

// Obtenemos las horas por dia de la semana
export const getDaysWeek = () => {
  return (dispatch) => {
    dispatch(fetchDayRequest);
    axios
      .get(`${API.BASE_API}/todo?where={"status":${false}}`, API.CONFIG)
      .then((response) => {
        // Como todas las tareas son del domingo o sabado, le agrego el dia random
        const todo = response.data.results.map((item) => {
          const day = Math.floor(Math.random() * 7);
          return { ...item, day };
        });
        // Validamos que solo sean tareas de la ultima semana
        var nowDate = new Date();
        nowDate.setDate(nowDate.getDate() - 7);
        const todoValid = todo.filter((t) => {
          const d = new Date(t.createdAt);
          return d.getTime() >= nowDate.getTime();
        });
        // Aplicamos la suma agrupada por dia
        var result = [];
        todoValid.reduce(function (res, value) {
          if (!res[value.day]) {
            res[value.day] = { day: value.day, time: 0 };
            result.push(res[value.day]);
          }
          res[value.day].time += value.time;
          return res;
        }, {});
        dispatch(fetchDaySuccess(result));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchDayFailure(errorMsg));
      });
  };
};
