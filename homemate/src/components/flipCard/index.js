/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import FlipCardFront from './flipCardFront';
import FlipCardBack from './flipCardBack';
import './flipCard.css';

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <FlipCardFront changeSide={handleClick} />

      <FlipCardBack changeSide={handleClick} />
    </ReactCardFlip>
  );
}

export default FlipCard;
