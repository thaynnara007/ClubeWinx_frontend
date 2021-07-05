import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';

import './login.css';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [labelPasswordStyle, setLabelPasswordStyle] = useState({});

  const validateEmail = () => {
    const validation = email === '' || email === null;

    setLabelEmailStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validatePassword = () => {
    const validation = password === '' || password === null;

    setLabelPasswordStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateInfo = () => validateEmail() && validatePassword();

  const login = () => {
    if (validateInfo()) {
      const body = {
        email,
        password,
      };

      api
        .post('/auth/login', body)
        .then(async (response) => {
          const { token, user } = response.data;

          await localStorage.setItem('homemate_access_token', token);
          toast(`Bem-vindo de volta ${user.name}!`);
          window.location.replace('/posts');
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
      <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
      <Input
        type="password"
        name="SENHA"
        value={password}
        onChange={setPassword}
        styles={labelPasswordStyle}
      />
      <BaseButton onClick={login} styles={{ width: '100%', fontWeight: 'bold' }}>
        ENTRAR
      </BaseButton>
      <a className="login-forget-password">Esqueceu a senha?</a>
    </>
  );
}

export default Login;
