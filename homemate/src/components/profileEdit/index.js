import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

const stylesInvalid = {
  label: {
    color: 'red',
  },
};

const stylesValid = {
  label: {
    color: '#F4F4F4',
  },
};

function ProfileEdit() {
  const [description, setDescription] = useState('');
  const [problemDescription, setProblemDescription] = useState(false);
  const [socialMedia, setSocialMedia] = useState('');
  const [problemSocialMedia, setProblemSocialMedia] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateDescription = () => {
    const validation = description === '' || description === null;
    setProblemDescription(validation);
    return !validation;
  };
  const validateSocialMedia = () => {
    const validation = socialMedia === '' || socialMedia === null;
    setProblemSocialMedia(validation);

    return !validation;
  };


  const validateInfo = () => validateDescription() && validateSocialMedia();

  const editProfile = () => {
    const validated = validateInfo();

    if (validated) {
      const body = {
        description,
        socialMedia,
      };
      api
        .put(`/profile/me`, body)
        .then(() => {
          toast('Informações atualizadas com sucesso');
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input
            name="DESCRIÇÃO"
            value={description}
            onChange={setDescription}
            styles={problemDescription}
          />
          <Input
            name="LINK DE REDE SOCIAL"
            value={socialMedia}
            onChange={setSocialMedia}
            styles={problemSocialMedia}
          />
          <BaseButton onClick={editProfile} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
