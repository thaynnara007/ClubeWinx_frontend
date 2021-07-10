/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import FlipCardFront from './flipCardFront';
import FlipCardBack from './flipCardBack';

function FlipCard({
  id,
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
        id={id}
        flip={handleClick}
        address={`${street ?? ''}, ${number ?? ''}`}
        price={price}
        people={people}
        rooms={rooms}
        beds={beds}
        bathrooms={bathrooms}
        description={description}
      />
    </ReactCardFlip>
  );
}

export default FlipCard;
