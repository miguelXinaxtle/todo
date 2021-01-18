import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Indicator from "./pages/IndicatorPage/Indicator";
import History from "./pages/HistoryPage/History";
import New from "./pages/NewPage/New";
import { NavBar } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";

// Aplicación maestra
// Utilizamos el react-router para la navegación
function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/indicator" exact component={Indicator} />
          <Route path="/history" exact component={History} />
          <Route path="/new" exact component={New} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
