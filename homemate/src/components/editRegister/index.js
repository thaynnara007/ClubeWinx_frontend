import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import moment from 'moment';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';
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

function EditRegister({ data: registerData }) {
  const [name, setName] = useState(registerData?.name ?? '');
  const [labelNameStyle, setLabelNameStyle] = useState({});

  const [lastname, setLastname] = useState(registerData?.lastname ?? '');
  const [labelLastnameStyle, setLabelLastnameStyle] = useState({});

  const [birthday, setBirthday] = useState(registerData?.birthday ?? '');
  const [labelBirthdayStyle, setLabelBirthdayStyle] = useState({});

  const [gender, setGender] = useState(registerData?.gender ?? '');
  const [labelGenderStyle, setLabelGenderStyle] = useState({});

  const [phoneNumber, setPhoneNumber] = useState(registerData?.phoneNumber ?? '');
  const [labelPhoneNumberStyle, setLabelPhoneNumberStyle] = useState({});

  const [street, setStreet] = useState(registerData?.address?.street ?? '');
  const [labelStreetStyle, setLabelStreetStyle] = useState({});

  const [number, setNumber] = useState(registerData?.address?.number ?? '');
  const [labelNumberStyle, setLabelNumberStyle] = useState({});

  const [complement, setComplement] = useState(registerData?.address?.complement ?? '');
  const [labelComplementStyle, setLabelComplementStyle] = useState({});

  const [zipCode, setZipCode] = useState(registerData?.address?.zipCode ?? '');
  const [labelZipCodeStyle, setLabelZipCodeStyle] = useState({});

  const [state, setState] = useState(registerData?.address?.state ?? '');
  const [labelStateStyle, setLabelStateStyle] = useState({});

  const [city, setCity] = useState(registerData?.address?.city ?? '');
  const [labelCityStyle, setLabelCityStyle] = useState({});

  const [district, setDistrict] = useState(registerData?.address?.district ?? '');
  const [labelDistrictStyle, setLabelDistrictStyle] = useState({});

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function updateState() {
      setName(registerData?.name);
      setLastname(registerData?.lastname);
      setBirthday(registerData?.birthday);
      setGender(registerData?.gender);
      setPhoneNumber(registerData?.phoneNumber);
      setStreet(registerData?.address?.street);
      setNumber(registerData?.address?.number);
      setComplement(registerData?.address?.complement);
      setZipCode(registerData?.address?.zipCode);
      setDistrict(registerData?.address?.district);
      setCity(registerData?.address?.city);
      setState(registerData?.address?.state);
    }

    updateState();
  }, [registerData]);

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
    (validateGender() ||
      validatePhoneNumber() ||
      validateStreet() ||
      validateNumber() ||
      validateComplement() ||
      validateZipCode() ||
      validateState() ||
      validateCity() ||
      validateDistrict());

  const edit = () => {
    if (validateInfo()) {
      setLoading(true);

      const body = {
        name,
        lastname,
        birthday,
        gender,
        phoneNumber,
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
          <Input name="NOME" value={name} onChange={setName} styles={labelNameStyle} />
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
          <Input name="GÊNERO" value={gender} onChange={setGender} styles={labelGenderStyle} />
          <Input
            name="TELEFONE"
            value={phoneNumber}
            onChange={setPhoneNumber}
            styles={labelPhoneNumberStyle}
          />
          <Input name="RUA" value={street} onChange={setStreet} styles={labelStreetStyle} />
          <Input name="NÚMERO" value={number} onChange={setNumber} styles={labelNumberStyle} />
          <Input
            name="COMPLEMENTO"
            value={complement}
            onChange={setComplement}
            styles={labelComplementStyle}
          />
          <Input name="CEP" value={zipCode} onChange={setZipCode} styles={labelZipCodeStyle} />
          <Input
            name="BAIRRO"
            value={district}
            onChange={setDistrict}
            styles={labelDistrictStyle}
          />
          <Input name="CIDADE" value={city} onChange={setCity} styles={labelCityStyle} />
          <Input name="ESTADO" value={state} onChange={setState} styles={labelStateStyle} />

          <BaseButton onClick={edit} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default EditRegister;
