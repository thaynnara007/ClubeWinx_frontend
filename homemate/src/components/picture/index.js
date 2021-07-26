/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import FlipCardButton from '../flipCard/flipCardButton';
import FileUploader from '../fileUploader';
import IconPlus from '../icons/iconPlus';
import './picture.css';

function Picture({ listPost }) {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });

  const handleHeaderUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);

      setHeaderBackground({ backgroundImage: `url('${image}')` });
    }
  };

  return (
    <Carousel showArrows infiniteLoop showStatus={false} showThumbs={false}>
      {listPost &&
        listPost.length > 0 &&
        listPost.map((post, index) =>
          post.id !== -1 ? (
            <div key={index}>
              <img alt="" src={post.pictureUrl} />
            </div>
          ) : (
            <div key={index} className="background-carrossel" style={{ ...headerBackground }}>
              <FlipCardButton
                buttonName={
                  <FileUploader icon handleUpload={handleHeaderUpload}>
                    <IconPlus size="3x" styles={{ color: '#F4F4F4' }} />
                  </FileUploader>
                }
              />
            </div>
          )
        )}
    </Carousel>
  );
}
export default Picture;
