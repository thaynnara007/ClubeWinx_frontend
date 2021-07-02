/* eslint-disable react/button-has-type */
import React from 'react';

import './flipCardBack.css';

function FlipCardBack({ flip }) {
  return (
    <div className="flip-card-back-card">
      <div className="">
        <p>This is the front of the card.</p>
        <button onClick={flip}>Click to flip</button>
      </div>
    </div>
  );
}

export default FlipCardBack;
