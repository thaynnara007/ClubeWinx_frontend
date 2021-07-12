import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../input';
import BaseButton from '../../button';
import { PASSWORD_RECOVERY_CODE } from '../../../utils/constants';
import '../ChangePassword/ChangePassword.css';
import api from '../../../api';

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


function Email(props) {
  const { setState, email, setEmail, setIsLoading } = props;
  const [labelEmailStyle, setLabelEmailStyle] = useState({});

  const validateEmail = () => {
    const validation = email === '' || email === null;
    setLabelEmailStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const recovery = () => {
    if (validateEmail()) {
      setIsLoading(true);
      const body = {
        email,
      };

      api
        .post('/user/forget/password', body)
        .then(() => {
          toast('Código enviado');
          setIsLoading(false);
          setState(PASSWORD_RECOVERY_CODE);
          
        })
        .catch((error) => {
          setIsLoading(false);
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';
          toast.error(msg);
        });
    }
  };

  return (
    <>
      <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
      <BaseButton onClick={recovery} styles={{ width: '100%', fontWeight: 'bold' }}>
        ENVIAR CODIGO
      </BaseButton>
    </>
  );

}

export default Email;
