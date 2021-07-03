/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import FlipCardFront from './flipCardFront';
import FlipCardBack from './flipCardBack';

function FlipCard({
  state,
  city,
  district,
  street,
  number,
  pictureUrl,
  price,
  people,
  rooms,
  beds,
  bathrooms,
  description,
  seePage = () => '',
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <FlipCardFront
        mainText={`${state ?? ''}, ${city ?? ''}`}
        subText={`${district ?? ''}`}
        flip={handleClick}
        imageUrl={pictureUrl}
      />

      <FlipCardBack
        flip={handleClick}
        address={`${street ?? ''}, ${number ?? ''}`}
        price={price}
        people={people}
        rooms={rooms}
        beds={beds}
        bathrooms={bathrooms}
        description={description}
        seePage={seePage}
      />
    </ReactCardFlip>
  );
}

export default FlipCard;
