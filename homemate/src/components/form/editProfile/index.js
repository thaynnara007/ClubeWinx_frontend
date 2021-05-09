import { useState } from 'react';
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
    const validateConnection = () => {
      const validation = socialMedia === '' || socialMedia === null;
      setProblemSocialMedia(validation);
  
      return !validation;
    };
  
  
    const validateInfo = () =>
      validateDescription() &&
      validateConnection();
     
  
    const editRegister = () => {
      const validated = validateInfo();
  
      if (validated) {
        const body = {
          description,
          privateConnection: socialMedia,
        };
      };
    };

    /*api
        .put(`/profile/me`, body)
        .then(() => {
          toast('perfi editado com sucesso!');
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        } 
    
    );*/



    return (
        <div style={{ marginTop: '150px' }}>
        <BasicForm>
        <OneLineInput
          problem={problemDescription}
          name = "Description"
          value={name}
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
}

export default EditProfile;
  
