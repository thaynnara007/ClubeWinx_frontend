/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import ReactCardFlip from 'react-card-flip';

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div styles={{ width: '400px', height: '400px', borderStyle: 'dotted' }}>
        This is the front of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>

      <div styles={{ width: '400px', height: '400px', borderStyle: 'dotted' }}>
        This is the back of the card.
        <button onClick={handleClick}>Click to flip</button>
      </div>
    </ReactCardFlip>
  );
}

export default FlipCard;
