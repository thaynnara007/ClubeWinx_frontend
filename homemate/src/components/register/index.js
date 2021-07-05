import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import api from '../../api';
import Input from '../input';
import Loading from '../loading';
import BaseButton from '../button';
import { DATE_FORMAT } from '../../utils/constants';

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

function Register({ toLogin }) {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [labelNameStyle, setLabelNameStyle] = useState({});
  const [labelLastnameStyle, setLabelLastnameStyle] = useState({});
  const [labelBirthdayStyle, setLabelBirthdayStyle] = useState({});
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [labelPasswordStyle, setLabelPasswordStyle] = useState({});

  const validateName = () => {
    const validation = name === '' || name === null;

    setLabelNameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateLastname = () => {
    const validation = lastname === '' || lastname === null;

    setLabelLastnameStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateBirthday = () => {
    const validation =
      birthday === '' ||
      birthday === null ||
      !(moment(birthday, DATE_FORMAT).format(DATE_FORMAT) === birthday);

    setLabelBirthdayStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

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

  const validateInfo = () =>
    validateName() &&
    validateLastname() &&
    validateBirthday() &&
    validateEmail() &&
    validatePassword();

  const register = () => {
    if (validateInfo()) {
      setLoading(true);

      const body = {
        name,
        lastname,
        gender,
        birthday,
        email,
        password,
      };

      api
        .post('/user', body)
        .then((response) => {
          if (response) {
            setLoading(false);
            setPassword('');

            toast('Cadastro realizado com sucesso!');
            toLogin();
          }
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          setLoading(false);
          toast.error(msg);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input name="NOME" value={name} onChange={setName} styles={labelNameStyle} />
          <Input
            name="SOBRENOME"
            value={lastname}
            onChange={setLastName}
            styles={labelLastnameStyle}
          />
          <Input name="GENÊRO" value={gender} onChange={setGender} />
          <Input
            name="DATA DE NASCIMENTO. ex: 06/03/1990"
            value={birthday}
            onChange={setBirthday}
            styles={labelBirthdayStyle}
          />
          <Input name="EMAIL" value={email} onChange={setEmail} styles={labelEmailStyle} />
          <Input
            name="SENHA"
            type="password"
            value={password}
            onChange={setPassword}
            styles={labelPasswordStyle}
          />
          <BaseButton onClick={register} styles={{ width: '100%', fontWeight: 'bold' }}>
            CADASTRAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default Register;
