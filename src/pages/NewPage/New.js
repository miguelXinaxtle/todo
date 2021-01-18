import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Snack, TodoForm } from "../../components";
import { postTodo } from "../../redux";
import { useDispatch } from "react-redux";

// Pagina para el alta de las tareas
const New = () => {
  const dispatch = useDispatch();
  // Constantes para la administración del snakbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Error");
  // Constantes para persistir la tarea
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [typeTime, setTypeTime] = useState(1800);

  // Manejador para el cambio en el select
  const handleChange = (event) => {
    setTypeTime(event.target.value);
  };

  // Manejador para cerrar el snakbar
  const handleClose = () => setOpen(false);

  // Manejador para persistir la tarea
  const onSubmit = (event) => {
    event.preventDefault();
    let time = 0;
    // Valida que el tiempo sea valido
    if (typeTime === 0) {
      if ((minutes > 0 || seconds > 0) && minutes * 60 + 1 * seconds < 7200) {
        time = minutes * 60 + 1 * seconds;
      } else {
        setMessage("Duración no valida");
        setOpen(true);
        return;
      }
    } else {
      time = typeTime;
    }
    const newTodo = {
      name: name,
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
    dispatch(postTodo(newTodo));
    setMessage("Tarea registrada");
    setOpen(true);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <h3>Registra tus nuevas tareas</h3>
      <TodoForm
        {...{
          name,
          typeTime,
          minutes,
          seconds,
          setName,
          handleChange,
          setMinutes,
          setSeconds,
          onSubmit,
        }}
      />
      <Snack message={message} open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default New;
