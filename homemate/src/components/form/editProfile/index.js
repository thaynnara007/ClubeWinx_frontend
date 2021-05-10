import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';


function EditProfile (){
    const [description, setDescription] = useState('');
    const [problemDescription, setProblemDescription] = useState(false);
    const [socialMedia, setSocialMedia] = useState('');
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
     
  
    const editRegister = () => {
      const validated = validateInfo();
  
      if (validated) {
        const body = {
          description,
          socialMedia,
        };
        
        const[editProfile, setEditProfile] = useState(null);

      const putProfile = () => {
        api
        .put(`/profile/me`, body)
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem('homemate_access_token', token);
          setState(PASSWORD_RECOVERY_PAGE_CHANGE);
          console.log(response);
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
      }
      useEffect(() => {
        putProfile()
      }, [editProfile]);

      };
      return (
        <div style={{ marginTop: '150px' }}>
        <BasicForm>
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
        <BaseButton onClick={EditProfile}>SALVAR</BaseButton>
      </BasicForm>
    </div>
    )

    };
    
}

export default EditProfile;
  
