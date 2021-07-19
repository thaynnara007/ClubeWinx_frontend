import React, { useState } from 'react';

import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

import { useHistory } from 'react-router';

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

function EditRegister() {
  const [name, setName] = useState('');
  const [labelNameStyle, setLabelNameStyle] = useState({});
  const [lastname, setLastname] = useState('');
  const [labelLastnameStyle, setLabelLastnameStyle] = useState({});
  const [birthday, setBirthday] = useState('');
  const [labelBirthdayStyle, setLabelBirthdayStyle] = useState({});
  const [gender, setGender] = useState('');
  const [labelGenderStyle, setLabelGenderStyle] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [labelPhoneNumberStyle, setLabelPhoneNumberStyle] = useState({});
  const [email, setEmail] = useState('');
  const [labelEmailStyle, setLabelEmailStyle] = useState({});
  const [street, setStreet] = useState('');
  const [labelStreetStyle, setLabelStreetStyle] = useState({});
  const [number, setNumber] = useState('');
  const [labelNumberStyle, setLabelNumberStyle] = useState({});
  const [complement, setComplement] = useState('');
  const [labelComplementStyle, setLabelComplementStyle] = useState({});
  const [zipCode, setZipCode] = useState('');
  const [labelZipCodeStyle, setLabelZipCodeStyle] = useState({});
  const [state, setState] = useState('');
  const [labelStateStyle, setLabelStateStyle] = useState({});
  const [city, setCity] = useState('');
  const [labelCityStyle, setLabelCityStyle] = useState({});
  const [district, setDistrict] = useState('');
  const [labelDistrictStyle, setLabelDistrictStyle] = useState({});

  const history = useHistory();
  
  const [loading, setLoading] = useState(false);

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
    const validation = birthday === '' || birthday === null;
    setLabelBirthdayStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateGender = () => {
    const validation = gender === '' || gender === null;
    setLabelGenderStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validatePhoneNumber = () => {
    const validation = phoneNumber === '' || phoneNumber === null;
    setLabelPhoneNumberStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateEmail = () => {
    const validation = email === '' || email === null;
    setLabelEmailStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateStreet = () => {
    const validation = street === '' || street === null;
    setLabelStreetStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateNumber = () => {
    const validation = number === '' || number === null;
    setLabelNumberStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateComplement = () => {
    const validation = complement === '' || complement === null;
    setLabelComplementStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateZipCode = () => {
    const validation = zipCode === '' || zipCode === null;
    setLabelZipCodeStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateState = () => {
    const validation = state === '' || state === null;
    setLabelStateStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateCity = () => {
    const validation = city === '' || city === null;
    setLabelCityStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateDistrict = () => {
    const validation = district === '' || district === null;
    setLabelDistrictStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateInfo = () =>
  validateName() &&
  validateLastname() &&
  validateBirthday() &&
  validateGender() &&
  validatePhoneNumber() &&
  validateEmail() &&
  validateStreet() &&
  validateNumber() &&
  validateComplement() &&
  validateZipCode() &&
  validateState() &&
  validateCity() &&
  validateDistrict();

  const edit = () => {
    if (validateInfo()) {
      setLoading(true);

      const body = {
        name,
        lastname,
        birthday,
        gender,
        phoneNumber,
        email,
        street,
        number,
        complement,
        zipCode,
        state,
        city,
        district,
      };
      api
        .put(`/user`, body)
        .then(() => {
            setLoading(false);
            toast('Cadastro editado com sucesso!');
            history.push('/profile/me');
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
          <Input
            name="NOME"
            value={name}
            onChange={setName}
            styles={labelNameStyle}
          />
          <Input
            name="SOBRENOME"
            value={lastname}
            onChange={setLastname}
            styles={labelLastnameStyle}
          />
          <Input
            name="DATA DE NASCIMENTO"
            value={birthday}
            onChange={setBirthday}
            styles={labelBirthdayStyle}
          />
          <Input
            name="GÊNERO"
            value={gender}
            onChange={setGender}
            styles={labelGenderStyle}
          />
          <Input
            name="TELEFONE"
            value={phoneNumber}
            onChange={setPhoneNumber}
            styles={labelPhoneNumberStyle}
          />
          <Input
            name="E-MAIL"
            value={email}
            onChange={setEmail}
            styles={labelEmailStyle}
          />
          <Input
            name="RUA"
            value={street}
            onChange={setStreet}
            styles={labelStreetStyle}
          />
          <Input
            name="RUA"
            value={number}
            onChange={setNumber}
            styles={labelNumberStyle}
          />
          <Input
            name="COMPLEMENTO"
            value={complement}
            onChange={setComplement}
            styles={labelComplementStyle}
          />
          <Input
            name="CEP"
            value={zipCode}
            onChange={setZipCode} 
            styles={labelZipCodeStyle}
          />
           <Input
            name="BAIRRO"
            value={district}
            onChange={setDistrict} 
            styles={labelDistrictStyle}
          />
          <Input
            name="CIDADE"
            value={city}
            onChange={setCity} 
            styles={labelCityStyle}
          />
          <Input
            name="ESTADO"
            value={state}
            onChange={setState} 
            styles={labelStateStyle}
          />
         
          <BaseButton onClick={edit} styles={{ width: '100%', fontWeight: 'bold' }}>SALVAR</BaseButton>
        </>
      )}
    </>
  );
}

export default EditRegister;
