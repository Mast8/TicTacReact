

// 0 1 2
// 3 4 5
// 6 7 8

import { useEffect, useState } from "react";
import "./style.css";

function Square({ value, onClick }) {

  const style = value === "X" ? "square X" : "square O";
  return (
    <button onClick={onClick} className={style} >
      {value}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");
  const [xScore, setXScore] =useState(0 );
  const [oScore, setOScore] =useState(0 );
  const [drawScore, setDrawScore] =useState(0 );
  const [turnIcon, setTurnIcon] = useState("");

  function getWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }

  
  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    
    cpySquares[getCurrentSquare] = isXTurn ? "X"   : "O";
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
   /*  hoverMark(); */
  }

 /*  function hoverMark(){
    cpySquares[getCurrentSquare] = isXTurn ? "X"   : "O";
    isXTurn ?  setBoard()  : "O";
  } */

  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));

  }

  function handleReset() {
    handleRestart();
    setDrawScore(0);
    setXScore(0);
    setOScore(0);
  }

  function countGame(winner) {

    console.log(winner+" winner ")
    if (winner === "O") {   
      setOScore( oScore+1 );   
    } else
      if(winner === "X")  {
        setXScore( xScore+1 );

    } 
  }
  

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setDrawScore( drawScore +1 );
      setStatus(`This is a draw ! Please restart the game`);
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}. Please restart the game`);
      setTurnIcon("");
      countGame(getWinner(squares));
    } else {
      setStatus(`Next player is `);
      setTurnIcon(`${isXTurn ?  "X" : "O"}`);
      //console.log(turnIcon)
    }
    
  }, [squares, isXTurn]);
  
  
  return (
    
    <div className="tic-tac-toe-container">
      <h1>{status} <span className={turnIcon}>{turnIcon} </span></h1>
      <div className="score">
        <h2 className="Owins">O won {oScore}</h2>
        <h2 className="Draw">Draw {drawScore}</h2>
        <h2 className="Xwins">X won {xScore}</h2>
        
      </div>
     <div className="board" >
     
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
     </div>
      
      <button className="btn-reset" onClick={handleRestart}>Restart</button>
      <button className="btn-reset" onClick={handleReset}>Reset scores</button>
    </div>
  );
}

   