import React, { useEffect, useState } from "react";
import { getTodo, putTodo, deleteTodo, postTodo } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { GridTodo, Snack, TodoForm } from "../../components";
import { useTimer } from "react-timer-hook";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";

// Pagina home, es la principal del sistema
// Muestra la lista de tareas y permite su administración
const Home = () => {
  // Subscripción al estado de las tareas
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  // openModal abre o cierra la modal para actualizar la tarea
  const [openModal, setOpenModal] = useState(false);
  // open abre o cierra el snackbar
  const [open, setOpen] = useState(false);
  // mensaje dentro del snackbar
  const [message, setMessage] = useState("Error");
  // tarea seleccionada del grid
  const [todo, setTodo] = useState(null);
  // nombre de la tarea a modificar
  const [todoName, setTodoName] = useState("");
  // minutos de la tarea a modificar
  const [todoMinutes, setTodoMinutes] = useState(0);
  // segundos de la tarea a modificar
  const [todoSeconds, setTodoSeconds] = useState(0);
  // tipo de tarea a modificar
  const [todoTypeTime, setTodoTypeTime] = useState(1800);

  // tiempo inicial para el hook useTimer
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1);
  // Hook useTimer, administra el tiempo de cada tarea
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    // Callback cuando la tarea termina
    onExpire: () => {
      if (todo) {
        // Nuevo objeto de tarea que persiste la información en base de datos
        const newTodo = {
          name: todo.name,
          status: false,
          time: todo.time,
          useTime: 0,
          type: todo.type,
        };
        // Ejecuta la función de actualización de la tarea
        dispatch(putTodo(todo.objectId, newTodo));
        // Como la tarea es diferente eliminamos la elegida
        setTodo(null);
        // Indica que la tarea ha finalizado con un snakbar
        setMessage("Tarea terminada");
        setOpen(true);
      }
    },
  });

  useEffect(() => {
    async function fetch() {
      try {
        // Funcion para obtener las tareas para el grid
        dispatch(getTodo(true));
      } catch (error) {}
    }
    fetch();
  }, []);

  // Manejador para el cierre del snackbar
  const handleClose = () => setOpen(false);

  // Manejador para la seleccion de tarea en el grid
  const onSelection = (newSelection) => {
    // Con el id obtenemos la tarea de la subscrición
    const todItem = todos.todoList.find(
      (item) => item.id === newSelection.rowIds[0]
    );
    // Establece la tarea elegida
    setTodo(todItem);
    const time = new Date();
    time.setSeconds(time.getSeconds() + todItem.useTime);
    // Reinicia el hook useTimer con el tiempo de la tarea
    restart(time);
    setTimeout(() => {
      pause();
    }, 300);
  };

  // Manejador para detener el timer y persistir su ejecución
  const onPause = () => {
    pause();
    // Calculamos los segundo restantes
    const missing = hours * 3600 + minutes * 60 + seconds;
    const newTodo = {
      name: todo.name,
      status: todo.status,
      time: todo.time,
      useTime: missing,
      type: todo.type,
    };
    // Actualiza la tarea con los nuevos segundos
    dispatch(putTodo(todo.objectId, newTodo));
  };

  // Manejador para reinicia el contador a el valor total de la tarea
  const onRestart = () => {
    const newTodo = {
      name: todo.name,
      status: todo.status,
      time: todo.time,
      useTime: todo.time,
      type: todo.type,
    };
    // Actualiza la tarea con los segundos totales
    dispatch(putTodo(todo.objectId, newTodo));
    const time = new Date();
    time.setSeconds(time.getSeconds() + todo.time);
    restart(time);
  };

  // Manejador para eliminar las tareas
  const onDelete = () => {
    // Elimina la tarea
    dispatch(deleteTodo(todo.objectId));
    setTodo(null);
    setMessage("Tarea eliminada");
    setOpen(true);
  };

  // Manejador para actualizar las tareas
  const onUpdate = () => {
    setTodoName(todo.name);
    setTodoTypeTime(
      todo.time == 1800 || todo.time == 2700 || todo.time == 3600
        ? todo.time
        : 0
    );
    setTodoMinutes(Math.floor(todo.time / 60));
    setTodoSeconds(todo.time % 60);
    // Abre el modal con los valores cargados
    setOpenModal(true);
  };

  // Manejador para cerrar la modal de actualización de la tarea
  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Manejador para finalizar la tarea
  const onDone = () => {
    const newTodo = {
      name: todo.name,
      status: false,
      time: todo.time,
      useTime: todo.useTime,
      type: todo.type,
    };
    // Actualiza la tarea con el estatos de finalizada
    dispatch(putTodo(todo.objectId, newTodo));
    setTodo(null);
    // Mensaje en el snakbar
    setMessage("Tarea terminada");
    setOpen(true);
  };

  // Manejador para el evento change del select
  const handleChange = (event) => {
    setTodoTypeTime(event.target.value);
  };

  // Manejador para la actualizacion de la descripción y tiempo de la tarea
  const onSubmit = (event) => {
    event.preventDefault();
    let time = 0;
    // Valida que el tiempo sea valido
    if (todoTypeTime === 0) {
      if (
        (todoMinutes > 0 || todoSeconds > 0) &&
        todoMinutes * 60 + 1 * todoSeconds < 7200
      ) {
        time = todoMinutes * 60 + 1 * todoSeconds;
      } else {
        setMessage("Duración no valida");
        setOpen(true);
        return;
      }
    } else {
      time = todoTypeTime;
    }
    const newTodo = {
      name: todoName,
      status: true,
      time: time,
      useTime: time,
      type:
        time <= 1800
          ? "corto"
          : time > 1800 && time <= 3600
          ? "medio"
          : "largo",
    };
    dispatch(putTodo(todo.objectId, newTodo));
    setTodo(null);
    setMessage("Tarea acutalizada");
    setOpen(true);
    handleModalClose();
  };

  return todos.loading ? (
    <h2>Cargando...</h2>
  ) : todos.error ? (
    <h2>Ocurrio un error.</h2>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h3>Lista de actividades pendientes</h3>
      {todo ? (
        <TodoItem
          onResume={resume}
          name={todo.name}
          {...{
            hours,
            minutes,
            seconds,
            isRunning,
            onPause,
            onRestart,
            onDelete,
            onUpdate,
            onDone,
          }}
        />
      ) : (
        <div style={{ minHeight: 240 }}></div>
      )}
      <GridTodo onSelectionChange={onSelection} />
      {todo && (
        <TodoModal {...{ openModal, handleModalClose }}>
          <TodoForm
            name={todoName}
            typeTime={todoTypeTime}
            minutes={todoMinutes}
            seconds={todoSeconds}
            setName={setTodoName}
            handleChange={handleChange}
            setMinutes={setTodoMinutes}
            setSeconds={setTodoSeconds}
            onSubmit={onSubmit}
          />
        </TodoModal>
      )}
      <Snack message={message} open={open} handleClose={handleClose} />
    </div>
  );
};

export default Home;
