import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../api';
import Input from '../../input';
import BaseButton from '../../button';
import './ChangePassword.css';

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

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [labelNewPassowrd, setNewPassowrd] = useState({});
  const [labelConfirmPassword, setConfirmPassword] = useState({});

  const validatePassword = () => {
    const validation = newPassword === '' || newPassword === null;

    setNewPassowrd(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validatePassword2 = () => {
    const validation = newPassword2 === '' || newPassword2 === null;

    setConfirmPassword(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validate = () => {
    if (validatePassword() && validatePassword2()) {
      const valid = newPassword === newPassword2;

      setConfirmPassword(!valid ? stylesInvalid : stylesValid);

      return valid;
    }
    return false;
  };

  const changePassword = () => {
    if (validate()) {
      const body = {
        newPassword,
      };

      api
        .put('/user/change/password', body)
        .then(() => {
          toast('Senha alterada!');
          window.location.replace('/');
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
      <Input
        type="password"
        name="NOVA SENHA"
        value={newPassword}
        onChange={setNewPassword}
        styles={labelNewPassowrd}
      />
      <Input
        type="password"
        name="REPITA A NOVA SENHA"
        value={newPassword2}
        onChange={setNewPassword2}
        styles={labelConfirmPassword}
      />
      <BaseButton onClick={changePassword} styles={{ width: '100%', fontWeight: 'bold' }}>
        VERIFICAR
      </BaseButton>
    </>
  );
}

export default ChangePassword;
