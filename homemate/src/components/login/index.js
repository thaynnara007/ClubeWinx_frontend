import React, { useState } from 'react';
import './login.css'

import Input from '../input';
import BaseButton from '../button';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input name="NOME" value={name} onChange={setName} />
      <Input name="SENHA" value={password} onChange={setPassword} />
      <BaseButton styles={{ width: '100%' }}>ENTRAR</BaseButton>
      <a className="login-forget-password">Esqueceu a senha?</a>
    </>
  );
}

export default Login;
