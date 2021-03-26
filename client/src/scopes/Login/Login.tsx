import React, { useState } from "react";

import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import apiTracker from "../../api/apiTracker";

import { useAppContext } from "../../contexts/AppContext";

import "./Login.css";
// import { isWhiteSpaceLike } from "typescript";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(1),
    backgroundColor: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    width: 200,
    height: 150,
    position: "absolute",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [passeword, setPasseword] = useState("");
  const { token, setToken } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiTracker.post("/login", {
        username,
        password: passeword,
      });
      console.log("respose : ", response.data.tokenLogin);
      let myJWTToken = response.data.tokenLogin;
      setToken(myJWTToken);
      localStorage.setItem("token", myJWTToken);
      console.log("token : ", token);
      history.push("/scores?token=" + myJWTToken);
    } catch (error) {
      console.log("error oh :", error.response);
    }
  };

  return (
    <div className="Login">
      <Container maxWidth="xl">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              label="email"
              name="username"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              onChange={(e) => setPasseword(e.target.value)}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              CONEXION
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default Login;
