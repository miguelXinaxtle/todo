import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Modal para la edición de las tareas, dentro del children va el formulario
const TodoModal = ({ openModal, handleModalClose, children }) => {
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <h2 id="simple-modal-title">Actualiza</h2>
        {children}
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal
        open={openModal}
        className={classes.modal}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default TodoModal;
