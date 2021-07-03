/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import FlipCardFront from './flipCardFront';
import FlipCardBack from './flipCardBack';

const lor =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

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

      <FlipCardBack
        flip={handleClick}
        address="Rua Deputado Álvaro Gaudêncio, 434"
        price="800"
        people="5"
        rooms="6"
        beds="6"
        bathrooms="8"
        description={lor}
      />
    </ReactCardFlip>
  );
}

export default FlipCard;
