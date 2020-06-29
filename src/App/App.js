import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "../App/App.scss";
import Main from "../Main/Main";
import Cars from "../Cars/Cars";
import Fuels from "../Fuels/Fuels";
import Map from "../Map/Map";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/fuels" component={Fuels} />
        <Route path="/cars" component={Cars} />
        <Route path="/map" component={Map} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
