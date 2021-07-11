import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../ChangePassword/ChangePassword.css';
import api from '../../../api';
import Input from '../../input';
import BaseButton from '../../button';
import { PASSWORD_RECOVERY_CHANGE } from '../../../utils/constants';

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

function Code(props) {
  const { setState, email } = props;
  const [code, setCode] = useState('');
  const [labelCode, setLabelCode] = useState({});

  const validateCode = () => {
    const validation = code === '' || code === null;

    setLabelCode(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const recoveryCode = () => {
    if (validateCode()) {
      const body = {
        code,
        email,
      };
      api
        .post('/auth/verify/code', body)
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem('homemate_access_token', token);
          setState(PASSWORD_RECOVERY_CHANGE);
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Codigo invalido';
          toast.error(msg);
        });
    }
  };

  return (
    <>
      <Input name="CÓDIGO" value={code} onChange={setCode} styles={labelCode} />
      <BaseButton onClick={recoveryCode} styles={{ width: '100%', fontWeight: 'bold' }}>
        VERIFICAR
      </BaseButton>
    </>
  );
}

export default Code;
