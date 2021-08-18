import React from 'react';

function Bar({ value, id }) {

  const barStyle = {
    display: 'inline-block',
    backgroundColor: 'blue',
    border: '1px solid white',
    width: '10px',
    height: `${value * 10}px`
  }

  return (
    <div style={ barStyle } id={id} className="bar">
    </div>
  );
}

export default Bar;
