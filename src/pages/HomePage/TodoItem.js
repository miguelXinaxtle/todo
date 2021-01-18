import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import StopIcon from "@material-ui/icons/Stop";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// Componente que muestra la información de la tarea seleccionada
const TodoItem = ({
  name,
  hours,
  minutes,
  seconds,
  isRunning,
  onPause,
  onResume,
  onRestart,
  onDelete,
  onUpdate,
  onDone,
}) => {
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center" }}>
      <p>{name}</p>
      <div style={{ fontSize: "30px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Trabajando en esta tarea" : "En espera..."}</p>
      <IconButton onClick={onResume} color="secondary">
        <PlayIcon />
      </IconButton>
      <IconButton onClick={onPause} color="secondary">
        <PauseIcon />
      </IconButton>
      <IconButton onClick={onRestart} color="secondary">
        <StopIcon />
      </IconButton>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onDelete}
          startIcon={<DeleteIcon />}
        >
          Eliminar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onUpdate}
          startIcon={<EditIcon />}
        >
          Modificar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onDone}
          startIcon={<DoneIcon />}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
