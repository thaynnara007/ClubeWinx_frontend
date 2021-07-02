/* eslint-disable react/button-has-type */
import React from 'react';

import './flipCardFront.css';

function FlipCardFront({ changeSide }) {
  return (
    <div className="flip-card-front-card">
      This is the front of the card.
      <button onClick={changeSide}>Click to flip</button>
    </div>
  );
}

export default FlipCardFront;
