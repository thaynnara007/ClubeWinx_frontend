import { toast } from 'react-toastify';

import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { API_BASE_URL } from '../../../utils/constants'

import './login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [problemEmail, setProblemEmail] = useState(false);
  const [problemPassword, setProblemPassword] = useState(false);
  const [password, setPassword] = useState('');
  const history = useHistory();

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
        .then( async (response) => {
          const { token, user } = response.data;

          await localStorage.setItem('homemate_access_token', token);
          toast(`Bem-vindo de volta ${user.name}!`);
          window.location.replace('/homepage')
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
    }
    
  };

  const passwordRecovery = () => {
    history.push('/passwordRecovery');
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
        <a className="components-form-login-forget-password" onClick={passwordRecovery}>Esqueceu a senha?</a>
        <BaseButton onClick={login}>ENTRAR</BaseButton>
      </BasicForm>
    </div>
  );
}

export default Login;
