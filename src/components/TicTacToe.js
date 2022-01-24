import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
  Typography,
} from "@mui/material";
import "../App.css";

function TicTacToe() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let playerX = event.target.playerX.value;
    let playerO = event.target.playerO.value;
    setPlayerX(playerX);
    setPlayerO(playerO);
  };
  //winning dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRestart = () => {
    setWinner(null);
    setTie(false);
    setCells(Array(9).fill(""));
  };

  //track turns, 1st player begins with x
  const [turn, setTurn] = useState("X");

  //track cells to know whick cell was clicked
  const [cells, setCells] = useState(Array(9).fill(""));

  let [winner, setWinner] = useState();
  let [tie, setTie] = useState(false);

  const checkForWinner = (squares) => {
    let chances = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let chance in chances) {
      chances[chance].forEach((elem) => {
        if (
          squares[elem[0]] === "" ||
          squares[elem[1]] === "" ||
          squares[elem[2]] === ""
        ) {
          // do nothing
        } else if (
          squares[elem[0]] === squares[elem[1]] &&
          squares[elem[1]] === squares[elem[2]]
        ) {
          setWinner(squares[elem[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (!playerX || !playerO) {
      alert("Please submit players name first.");
      return;
    }
    //avoid players to click more than once in each cell
    if (cells[num] !== "") {
      alert("Ups! Please choose an empty cell.");
      return;
    }

    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);

    //update the array with the clicked cells
    setCells(squares);

    //check ties
    let clicked = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].length !== 0) {
        clicked.push(squares[i]);
      }
    }
    //check if all cells were clicked and there is no winner
    if (!winner && clicked.length === 9) {
      setTie(true);
    }
  };

  const Cell = ({ num }) => {
    return (
      <td onClick={() => handleClick(num)} className={cells[num]}>
        {" "}
        {cells[num]}{" "}
      </td>
    );
  };

  if (winner === "X") {
    winner = playerX;
  } else if (winner === "O") {
    winner = playerO;
  }

  return (
    <div>
        <div>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label className="label">Player X</label>
              <div>
                <input
                  name="playerX"
                  className="input"
                  type="text"
                  placeholder="Insert player name"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Player O</label>
              <div>
                <input
                  name="playerO"
                  className="input"
                  type="text"
                  placeholder="Insert player name"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              size="small"
              className="btn"
            >
              Submit
            </Button>
          </form>
        </div>
      

      <div>
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
        <div className="turn">Turn: {turn === "X" ? playerX : playerO}</div>
        <Button onClick={handleRestart}>Restart</Button>
        <Button variant="outliner" onClick={handleClickOpen}>
          Help
        </Button>
        <Popover
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Typography>
            The first player who lines up 3 of their marks in a horizontal,
            vertical or diagonal row, wins the game.
          </Typography>
        </Popover>

        {winner && (
          <div>
            <Dialog
              open={handleClickOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Congrats "}
                {winner}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  YOU WON!🏆
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(handleClose, handleRestart)}>
                  Play Again
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        {!winner && tie && (
          <div>
            <Dialog
              open={handleClickOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"It's a tie!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Noone gets the trophy this time
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(handleClose, handleRestart)}>
                  Play Again
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
