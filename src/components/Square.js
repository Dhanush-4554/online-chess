import React from 'react';
import '../index.css';

const Square = (props) => {
    return (
      <button className={"cell " + props.shade}
      onClick={props.onClick}
      style={props.style}>
      </button>
    );
  
}

export default Square;