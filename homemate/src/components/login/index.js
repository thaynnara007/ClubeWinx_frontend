import React, { useState } from 'react';
import './login.css';

import Input from '../input';
import BaseButton from '../button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input name="EMAIL" value={email} onChange={setEmail} />
      <Input type="password" name="SENHA" value={password} onChange={setPassword} />
      <BaseButton styles={{ width: '100%', fontWeight: 'bold' }}>ENTRAR</BaseButton>
      <a className="login-forget-password">Esqueceu a senha?</a>
    </>
  );
}

export default Login;
