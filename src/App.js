import React, { useState } from 'react';
import './App.css';
import Board from './components/ChessBoard';
import FallenSoldierBlock from './components/DeadBlock';
import initialiseChessBoard from './components/InitialiseChessBoard';

const Game = () => {
  const [squares, setSquares] = useState(initialiseChessBoard());
  const [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState([]);
  const [blackFallenSoldiers, setBlackFallenSoldiers] = useState([]);
  const [player, setPlayer] = useState(1);
  const [sourceSelection, setSourceSelection] = useState(-1);
  const [status, setStatus] = useState('');
  const [turn, setTurn] = useState('white');

  const handleClick = (i) => {
    const updatedSquares = squares.slice();

    if (sourceSelection === -1) {
      if (!updatedSquares[i] || updatedSquares[i].player !== player) {
        setStatus("Wrong selection. Choose player " + player + " pieces.");
      }
      else {
        updatedSquares[i].style = {
          ...updatedSquares[i].style,
          backgroundColor: "RGB(111,143,114)",
        };
        setStatus("Choose destination for the selected piece");
        setSourceSelection(i);
      }
    }
    else if (sourceSelection > -1) {
      if (updatedSquares[i] && updatedSquares[i].player === player) {
        setStatus("Wrong selection. Choose valid source and destination again.");
        setSourceSelection(-1);
      }
      else {
        const updatedSquares = squares.slice();
        const updatedWhiteFallenSoldiers = whiteFallenSoldiers.slice();
        const updatedBlackFallenSoldiers = blackFallenSoldiers.slice();
        const isDestEnemyOccupied = updatedSquares[i] ? true : false;
        const isMovePossible = updatedSquares[sourceSelection].isMovePossible(
          sourceSelection,
          i,
          isDestEnemyOccupied
        );
        const srcToDestPath = updatedSquares[
          sourceSelection
        ].getSrcToDestPath(sourceSelection, i);
        const isMoveLegal = checkMoveLegality(srcToDestPath);

        if (isMovePossible && isMoveLegal) {
          if (updatedSquares[i] !== null) {
            if (updatedSquares[i].player === 1) {
              updatedWhiteFallenSoldiers.push(updatedSquares[i]);
            }
            else {
              updatedBlackFallenSoldiers.push(updatedSquares[i]);
            }
          }

          updatedSquares[i] = updatedSquares[sourceSelection];
          updatedSquares[sourceSelection] = null;
          const updatedPlayer = player === 1 ? 2 : 1;
          const updatedTurn = turn === 'white' ? 'black' : 'white';

          setSourceSelection(-1);
          setSquares(updatedSquares);
          setWhiteFallenSoldiers(updatedWhiteFallenSoldiers);
          setBlackFallenSoldiers(updatedBlackFallenSoldiers);
          setPlayer(updatedPlayer);
          setStatus('');
          setTurn(updatedTurn);
        }
        else {
          setStatus("Wrong selection. Choose valid source and destination again.");
          setSourceSelection(-1);
        }
      }
    }
  };

  const checkMoveLegality = (srcToDestPath) => {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  };

  return (
    <div>
      <div className="game">
        <div className="chessBoard">
          <Board squares={squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className="PlayerInformation">
          <h3>Turn</h3>
          <div id="playerSelectionBox" style={{ backgroundColor: turn }}></div>
          <div className="statusOfGame">{status}</div>

          <div className="deadBlock">
            <FallenSoldierBlock
              whiteFallenSoldiers={whiteFallenSoldiers}
              blackFallenSoldiers={blackFallenSoldiers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
