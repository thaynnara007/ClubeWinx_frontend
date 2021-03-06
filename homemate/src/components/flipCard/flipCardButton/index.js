import React from 'react';
import './flipCardButton.css';

function FlipCardButton({ button }) {
  const imageStyles = {
    backgroundImage: `linear-gradient(40deg, rgba(133, 102, 170, 0.7),rgba(244, 244, 244, 0.7))`,
  };

  return (
    <div className="flip-card-plus-card" style={imageStyles}>
      {button}
    </div>
  );
}

export default FlipCardButton;
