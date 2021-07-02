/* eslint-disable react/button-has-type */
import React from 'react';

import './flipCardBack.css';

function FlipCardBack({ changeSide }) {
  return (
    <div className="flip-card-back-card">
      This is the front of the card.
      <button onClick={changeSide}>Click to flip</button>
    </div>
  );
}

export default FlipCardBack;
