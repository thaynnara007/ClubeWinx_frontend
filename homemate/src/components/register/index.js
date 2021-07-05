import React, { useState } from 'react';

import Input from '../input';
import BaseButton from '../button';

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input name="NOME" value={name} onChange={setName} />
      <Input name="SOBRENOME" value={lastname} onChange={setLastName} />
      <Input name="GENÊRO" value={gender} onChange={setGender} />
      <Input name="EMAIL" value={email} onChange={setEmail} />
      <Input name="SENHA" type="password" value={password} onChange={setPassword} />
      <BaseButton styles={{ width: '100%', fontWeight: 'bold' }}>CADASTRAR</BaseButton>
    </>
  );
}

export default Register;
