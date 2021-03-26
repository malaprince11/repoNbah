import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import logonets from "../../img/netsLogo.png";

import apiTracker from "../../api/apiTracker";

import "./Scores.css";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Scores = () => {
  const classes = useStyles();

  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [score, setScore] = useState("");
  const [allScore, setAllScore] = useState([]);
  const [buttonUpdate, setButtonUpdate] = useState(null);
  const [scoreUpdated, setScoreUpdated] = useState("");
  const [sortScore, setSortScore] = useState([]);

  const scoreList = () => {
    try {
      apiTracker.get("/getScore").then((value) => {
        console.log("value : ", value);
        setAllScore(value.data.response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getScoreByDate = (date) => {
    try {
      apiTracker.get("/getScoreByDate").then((value) => {
        console.log("value : ", value.data.response);
        setSortScore(value.data.response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteScore = async (id) => {
    try {
      await apiTracker.post("/deleteScore/" + id).then((value) => {
        console.log("value : ", value);
        scoreList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateScore = async (id) => {
    try {
      await apiTracker
        .post("/updateScore/" + id, { point: scoreUpdated })
        .then((value) => {
          scoreList();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scoreList();
  }, []);

  return (
    <div className="Scores">
      <div className="App">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = localStorage.getItem("token");
              await apiTracker.post("/addScore", { token, score });
              scoreList();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <div className="control">
            <label htmlFor="score" className="label">
              Score :
              <input
                type="number"
                id="score"
                onChange={(e) => setScore(e.target.value)}
              ></input>
            </label>
            <Button variant="outlined" type="submit">
              Ajoutez
            </Button>
          </div>
          <img style={{ padding: 15 }} src={logonets} />
        </form>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allScore.map((score, index) => (
              <TableRow key={score._id}>
                <TableCell align="center">{score.userId.username}</TableCell>
                <TableCell align="center">
                  {score.point}
                  {buttonUpdate === index && (
                    <input
                      onChange={(e) => {
                        setScoreUpdated(e.target.value);
                      }}
                    ></input>
                  )}
                </TableCell>
                <TableCell>{score.date}</TableCell>

                <TableCell align="center">
                  {buttonUpdate === index ? (
                    <Button
                      onClick={() => {
                        setButtonUpdate(null);
                        updateScore(score._id);
                      }}
                    >
                      <IconButton aria-label="validate">
                        <CheckIcon />
                      </IconButton>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setButtonUpdate(index);
                      }}
                    >
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      deleteScore(score._id);
                    }}
                  >
                    <IconButton aria-label="delete">
                      <DeleteForeverIcon />
                    </IconButton>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="stats">
        <label htmlFor="score" className="label">
          Meilleur score
          <input
            type="date"
            id="date"
            onChange={(e) => getScoreByDate(e.target.value)}
          ></input>
        </label>
        <Button variant="outlined">Ajoutez</Button>
        <ul>
          {sortScore
            .sort(function (a, b) {
              return a.point - b.point;
            })
            .map((item, index) => (
              <li key={index}>{item.point}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Scores;
