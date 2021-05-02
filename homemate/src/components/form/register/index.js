import { useState } from 'react';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';

function Register() {
  const { name, setName } = useState('');
  const { lastname, setLastname } = useState('');
  const { email, setEmail } = useState('');
  const { phoneNumber, setPhoneNumber } = useState('');
  const { gender, setGender } = useState('');
  const { birthday, setBirthday } = useState('');
  const { password, setPassword } = useState('');
  const { street, setStreet } = useState('');
  const { number, setNumber } = useState('');
  const { district, setDistrict } = useState('');
  const { complement, setComplement } = useState('');
  const { zipCode, setZipCode } = useState('');
  const { city, setCity } = useState('');
  const { state, setState } = useState('');

  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
        <OneLineInput name="Nome" value={name} onChange={(value) => setName(value)} />
        <OneLineInput name="Sobrenome" value={lastname} onChange={(value) => setLastname(value)} />
        <OneLineInput name="Email" value={email} onChange={(value) => setEmail(value)} />
        <OneLineInput
          name="Número de celular. ex: 83987565821"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
        />
        <OneLineInput name="Gênero" value={gender} onChange={(value) => setGender(value)} />
        <OneLineInput
          name="Data de nascimento. ex: 06/03/1990"
          value={birthday}
          onChange={(value) => setBirthday(value)}
        />
        <OneLineInput name="Senha" value={password} onChange={(value) => setPassword(value)} />
        <OneLineInput name="Rua" value={street} onChange={(value) => setStreet(value)} />
        <OneLineInput name="Número" value={number} onChange={(value) => setNumber(value)} />
        <OneLineInput name="Bairro" value={district} onChange={(value) => setDistrict(value)} />
        <OneLineInput
          name="Complemento"
          value={complement}
          onChange={(value) => setComplement(value)}
        />
        <OneLineInput name="CEP" value={zipCode} onChange={(value) => setZipCode(value)} />
        <OneLineInput name="Cidade" value={city} onChange={(value) => setCity(value)} />
        <OneLineInput name="Estado" value={state} onChange={(value) => setState(value)} />
        <BaseButton>CADASTRAR</BaseButton>
      </BasicForm>
    </div>
  );
}

export default Register;
