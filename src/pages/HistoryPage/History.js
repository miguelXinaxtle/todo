import React, { useEffect } from "react";
import { getTodo } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { GridTodo } from "../../components";

// Pagina de historico, muestra las tareas que ya fueron realizadas
const History = () => {
  // Subscripción al estado para administrar respuestas
  const todos = useSelector((state) => state.todo);

  // hook para hacer dispatch a la función
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      try {
        // Carga inicial de las tareas para el historico
        dispatch(getTodo(false));
      } catch (error) {}
    }
    fetch();
  }, []);

  // Función sin uso, cuando el historico haga algo servira
  const onSelection = (newSelection) => {
    const todItem = todos.todoList.find(
      (item) => item.id === newSelection.rowIds[0]
    );
  };

  // Respuesta depende del estado
  return todos.loading ? (
    <h2>Cargando...</h2>
  ) : todos.error ? (
    <h2>Ocurrio un error.</h2>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h3>Historial de actividades finalizadas</h3>
      <GridTodo onSelectionChange={onSelection} />
    </div>
  );
};

export default History;
