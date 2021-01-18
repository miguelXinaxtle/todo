import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

// Agregamos estilos
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    justifyContent: "center",
    marginRight: 10,
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.link}>
            <HomeIcon />
          </Link>
          <Typography variant="h6" className={classes.title}></Typography>
          <Link className={classes.link} to="/history">
            HISTORIAL
          </Link>
          <Link className={classes.link} to="/indicator">
            REPORTE
          </Link>
          <Link className={classes.link} to="/new">
            NUEVO
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
