import React from 'react';
import Square from './Square';

const FallenSoldierBlock = (props) => {

  const renderSquare = (square, i, squareShade) => (
    <Square piece={square} style={square.style} />
  );

  return (
    <div>
      <div className="board-row">
        {props.whiteFallenSoldiers.map((ws, index) =>
          renderSquare(ws, index)
        )}
      </div>
      <div className="board-row">
        {props.blackFallenSoldiers.map((bs, index) =>
          renderSquare(bs, index)
        )}
      </div>
    </div>
  );
}


export default FallenSoldierBlock;