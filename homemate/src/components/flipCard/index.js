/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import FlipCardFront from './flipCardFront';
import FlipCardBack from './flipCardBack';
import './flipCard.css';

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <FlipCardFront
        mainText="paraíba, campina grande"
        subText="centro"
        buttonName="detalhes"
        flip={handleClick}
        imageUrl="https://images.unsplash.com/photo-1529408686214-b48b8532f72c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=986e2dee5c1b488d877ad7ba1afaf2ec&auto=format&fit=crop&w=1350&q=80"
      />

      <FlipCardBack flip={handleClick} />
    </ReactCardFlip>
  );
}

export default FlipCard;
