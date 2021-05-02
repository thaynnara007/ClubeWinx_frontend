import { toast } from 'react-toastify';

import { useState } from 'react';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';

function Login() {
  const [email, setEmail] = useState('');
  const [problemEmail, setProblemEmail] = useState(false);
  const [problemPassword, setProblemPassword] = useState(false);
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    const validation = email === '' || email === null;
    setProblemEmail(validation);

    return !validation;
  };

  const validatePassword = () => {
    const validation = password === '' || password === null;
    setProblemPassword(validation);

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
        .then((response) => {
          const { token, user } = response.data;

          localStorage.setItem('homemate_access_token', token);
          toast(`Bem-vindo de volta ${user.name}!`);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
        <OneLineInput
          name="Email"
          value={email}
          problem={problemEmail}
          onChange={(value) => setEmail(value)}
        />
        <OneLineInput
          type="password"
          name="Senha"
          value={password}
          problem={problemPassword}
          onChange={(value) => setPassword(value)}
        />
        <BaseButton onClick={login}>ENTRAR</BaseButton>
      </BasicForm>
    </div>
  );
}

export default Login;
