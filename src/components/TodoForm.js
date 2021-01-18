import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

// Un poco de estilos
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// Formulario generico para registrar y actualizar tareas
const TodoForm = ({
  name,
  typeTime,
  minutes,
  seconds,
  setName,
  handleChange,
  setMinutes,
  setSeconds,
  onSubmit,
}) => {
  const classes = useStyles();
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="name"
            label="Descripción"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>Duración</InputLabel>
            <Select value={typeTime} onChange={handleChange}>
              <MenuItem value={1800}>30 min</MenuItem>
              <MenuItem value={2700}>45 min</MenuItem>
              <MenuItem value={3600}>1 hora</MenuItem>
              <MenuItem value={0}>Personalizada</MenuItem>
            </Select>
          </FormControl>
        </div>
        {typeTime === 0 && (
          <>
            <div>
              <TextField
                id="minutes"
                label="Minutos"
                type="number"
                variant="outlined"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="seconds"
                label="Segundos"
                type="number"
                variant="outlined"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
          </>
        )}
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default TodoForm;
