/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import FlipCardButton from '../flipCard/flipCardButton';
import FileUploader from '../fileUploader';
import IconPlus from '../icons/iconPlus';
import './picture.css';

function Picture({ listPost, showAddPicture = false, handleUpload }) {
  const size = listPost?.length;

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
        } else if (showAddPicture && size < 5) {
          carrossel.push(
            <div key={index} className="background-carrossel">
              <FlipCardButton
                button={
                  <FileUploader icon handleUpload={handleUpload}>
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
