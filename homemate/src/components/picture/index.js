/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import FlipCardButton from '../flipCard/flipCardButton';
import FileUploader from '../fileUploader';
import IconPlus from '../icons/iconPlus';
import './picture.css';

function Picture({ listPost, showAddPicture = false }) {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const size = listPost?.length;

  const handleHeaderUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);

      setHeaderBackground({ backgroundImage: `url('${image}')` });
    }
  };

  const getPosts = () => {
    const carrossel = [];

    if (listPost) {
      for (let index = 0; index <= size; index += 1) {
        if (index !== size) {
          const post = listPost[index];

          carrossel.push(
            <div key={index}>
              <img alt="" src={post.pictureUrl} />
            </div>
          );
        } else if (showAddPicture && size < 6) {
          carrossel.push(
            <div key={index} className="background-carrossel" style={{ ...headerBackground }}>
              <FlipCardButton
                buttonName={
                  <FileUploader icon handleUpload={handleHeaderUpload}>
                    <IconPlus size="3x" styles={{ color: '#F4F4F4' }} />
                  </FileUploader>
                }
              />
            </div>
          );
        }
      }
    }

    return carrossel;
  };

  return (
    <Carousel showArrows infiniteLoop showStatus={false} showThumbs={false}>
      {getPosts()}
    </Carousel>
  );
}
export default Picture;
