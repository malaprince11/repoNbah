import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Scores from "./scopes/Scores/Scores";
import Typography from "@material-ui/core/Typography";
import logo from "../src/img/logo.png";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { token, setToken } = useAppContext();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    console.log("tokenStorage: ", tokenStorage);
    setToken(tokenStorage);

    fetch("http://localhost:4000")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="img">
          <h1>Scoring machine</h1>
          
          <img
            src={logo}
            style={{
              height: "250px",
              width: "400px",
              marginTop: 15,
            }}
          />
          <Typography component="h2" variant="h3">
         
            Connexion
          </Typography>
        </div>
      </header>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Link className="login" to="/login">
              Login
            </Link>
          </Route>
          <Route path="/login" component={Login}></Route>
          {token && (
            <>
              <Route path="/scores" component={Scores}></Route>
            </>
          )}
        </Switch>
        <Route path="*" component={TokenHandler}></Route>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
