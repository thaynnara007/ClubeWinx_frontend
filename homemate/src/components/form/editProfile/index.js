import { useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import FileImage from '../../image'


function EditProfile ({ profileInfo }){
  const [description, setDescription] = useState(profileInfo.description);
  const [problemDescription, setProblemDescription] = useState(false);
  const [socialMedia, setSocialMedia] = useState(profileInfo.socialMedia);
  const [problemSocialMedia, setProblemSocialMedia] = useState(false);

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

  const validateInfo = () =>
    validateDescription() &&
    validateSocialMedia();

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
        toast('Informações atualizadas com sucesso')
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
    };
  }

  const upload = (file) => {
    if (file) {

      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }

      api
      .put('/profile/me/picture', formData, config)
      .then( () => {
        toast('Imagem atualizada com sucesso');
      })
      .catch( error => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      })
    }
  }

  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
        <FileImage fileUrl={profileInfo.pictureUrl} upload={upload}/>
        <OneLineInput
          problem={problemDescription}
          name = "Description"
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <OneLineInput
          problem={problemSocialMedia}
          name="Rede Social"
          value={socialMedia}
          onChange={(value) => setSocialMedia(value)}
        />
        <BaseButton onClick={editProfile}>SALVAR</BaseButton>
      </BasicForm>
    </div>
  )
};
  


export default EditProfile;
  
