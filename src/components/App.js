import React from "react";
import Pokemon from "./pokemon";
import Moreinfo from "./pokemonMore";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
          <Switch>
            <Route path="/" exact component={Pokemon} />
            <Route path="/:id" component={Moreinfo} />
          </Switch>
    </Router>
  );
}

export default App;
