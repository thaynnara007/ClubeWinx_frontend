/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { toast } from 'react-toastify';

import FlipCardButton from '../flipCard/flipCardButton';
import FileUploader from '../fileUploader';
import IconPlus from '../icons/iconPlus';
import IconClose from '../icons/iconClose';
import ConfirmationModal from '../confirmationModal';
import api from '../../api';

import './picture.css';

function Picture({ listPost, isOwner = false, handleUpload }) {
  const [open, setOpen] = useState(false);
  const [clickedPostId, setClickPostId] = useState(undefined);

  const size = listPost?.length;

  const clickX = (pictureId) => {
    setClickPostId(pictureId);
    setOpen(true);
  };

  const deletePicture = () => {
    api
      .delete(`/user/poster/me/picture/${clickedPostId}`)
      .then(() => {
        toast('Foto deletada com sucesso.');
        setOpen(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
  };

  const getPosts = () => {
    const carrossel = [];

    if (listPost) {
      for (let index = 0; index <= size; index += 1) {
        if (index !== size) {
          const picture = listPost[index];

          carrossel.push(
            <div key={index}>
              <img alt="" src={picture.pictureUrl} />
              {isOwner && (
                <button
                  type="button"
                  className="picture-close-button"
                  onClick={() => clickX(picture.id)}
                >
                  <IconClose size="2x" styles={{ color: '#F4F4F4' }} />
                </button>
              )}
            </div>
          );
        } else if (isOwner && size < 5) {
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
    <>
      <Carousel showArrows infiniteLoop showStatus={false} showThumbs={false}>
        {getPosts()}
      </Carousel>
      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={deletePicture}
        title="Deletar foto"
        description="Você tem certeza que quer deletar essa foto?"
      />
    </>
  );
}
export default Picture;
