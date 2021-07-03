/* eslint-disable react/button-has-type */
import React from 'react';

import ScrollBox from '../../scrollBox';
import './flipCardFront.css';

const item = {
  maxWidth: '500px',
  maxHeight: '80px',
};

const display = {
  height: 'fit-content',
  justifySelf: 'center',
  width: 'fit-content',
  gridRow: '2',
  gridColumn: '1 / 4',
};

const scrollBox1Style = {
  display: {
    ...display,
    ...item,
  },
  item,
};

const scrollBox2Style = {
  display: {
    ...display,
    alignSelf: 'end',
    ...item,
  },
  item,
};

function FlipCardFront({ flip, imageUrl, mainText, subText, buttonName = 'datalhes' }) {
  const imageStyles = {
    backgroundImage: `linear-gradient(40deg, rgba(105, 131, 170, 0.7),rgba(244, 244, 244, 0.7)), url('${imageUrl}')`,
  };

  return (
    <div className="flip-card-front-card">
      <div className="flip-card-front-content">
        <div className="flip-card-front-backgroud" style={imageStyles}>
          <div className="flip-card-front-info">
            <ScrollBox styles={scrollBox1Style}>
              {[<p className="flip-card-front-main-text">{mainText}</p>]}
            </ScrollBox>
            <ScrollBox styles={scrollBox2Style}>
              {[<p className="flip-card-front-sub-text">{subText}</p>]}
            </ScrollBox>
            <button onClick={flip} className="flip-card-front-button">
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCardFront;
