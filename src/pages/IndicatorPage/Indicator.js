import React, { useEffect } from "react";
import TodoChart from "./TodoChart";
import { getDaysWeek } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

// Pagina de grafica
const Indicator = () => {
  // Subscripción al estado que administra las horas de las tareas por dia
  const day = useSelector((state) => state.day);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      try {
        // Obenemos los dias con sus horas de la última semana
        dispatch(getDaysWeek());
      } catch (error) {}
    }
    fetch();
  }, []);

  return day.loading ? (
    <h2>Cargando...</h2>
  ) : day.error ? (
    <h2>Ocurrio un error.</h2>
  ) : (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        maxWidth: 500,
        height: 500,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>Horas productivas de la última semana</h3>
      <TodoChart />
    </div>
  );
};

export default Indicator;
