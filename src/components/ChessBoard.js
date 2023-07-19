import React from 'react';
import '../index.css';
import Square from './Square';

const Board = (props) => {
  const renderSquare = (i, squareShade) => {
    return (
      <Square
        piece={props.squares[i]}
        style={props.squares[i] ? props.squares[i].style : null}
        shade={squareShade}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? 'lightShade'
            : 'darkShade';
        squareRows.push(renderSquare(i * 8 + j, squareShade));
      }
      board.push(<div className="board-row">{squareRows}</div>);
    }
    return board;
  };

  return <div>{renderBoard()}</div>;
};

function isEven(num) {
  return num % 2 === 0;
}

export default Board;
