/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
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

function Picture({ listPost, isOwner = false, upload }) {
  const [pictures, setPictures] = useState(listPost);
  const [open, setOpen] = useState(false);
  const [clickedPostId, setClickPostId] = useState(undefined);

  useEffect(() => {
    setPictures(listPost);
  }, [listPost]);

  const size = pictures?.length;

  const clickX = (pictureId) => {
    setClickPostId(pictureId);
    setOpen(true);
  };

  const handlePostPictureUpload = (file) => {
    if (file) {
      upload(file, 'post', '/user/poster/me/picture', 'Imagem adicionada com sucesso.', (data) => {
        setPictures((previos) => [{ pictureUrl: data.picture }, ...previos]);
      });
    }
  };

  const deletePicture = () => {
    if (clickedPostId) {
      api
        .delete(`/user/poster/me/picture/${clickedPostId}`)
        .then(() => {
          setPictures((previos) => previos.filter((picture) => picture.id !== clickedPostId));
          toast('Foto deletada com sucesso.');
          setOpen(false);
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
    } else toast.error('Foto selecionada já foi apagada');
  };

  const getPosts = () => {
    const carrossel = [];

    if (pictures) {
      for (let index = 0; index <= size; index += 1) {
        if (index !== size) {
          const picture = pictures[index];

          carrossel.push(
            <div key={index} style={{ maxWidth: '100%', height: '400px' }}>
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
                  <FileUploader icon handleUpload={handlePostPictureUpload}>
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
