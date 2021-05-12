import { useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { DATE_FORMAT } from '../../../utils/constants';

function EditRegister ({ userInfo, addressInfo }){

    const [name, setName] = useState(userInfo.name);
    const [problemName, setProblemName] = useState(false);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [problemLastname, setProblemLastname] = useState(false);
    const [ email ] = useState(userInfo.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
    const [gender, setGender] = useState(userInfo.gender);
    const [birthday, setBirthday] = useState(userInfo.birthday);
    const [problemBirthday, setProblemBirthday] = useState(false);
    const [street, setStreet] = useState(addressInfo.street);
    const [problemStreet, setProblemStreet] = useState(false);
    const [number, setNumber] = useState(addressInfo.number);
    const [problemNumber, setProblemNumber] = useState(false);
    const [district, setDistrict] = useState(addressInfo.district);
    const [problemDistrict, setProblemDistrict] = useState(false);
    const [complement, setComplement] = useState(userInfo.complement);
    const [zipCode, setZipCode] = useState(addressInfo.zipCode);
    const [problemZipCode, setProblemZipCode] = useState(false);
    const [city, setCity] = useState(addressInfo.city);
    const [problemCity, setProblemCity] = useState(false);
    const [state, setState] = useState(addressInfo.state);
    const [problemState, setProblemState] = useState(false);
  
    const validateName = () => {
      const validation = name === '' || name === null;
      setProblemName(validation);
      return !validation;
    };
    const validateLastname = () => {
      const validation = lastname === '' || lastname === null;
      setProblemLastname(validation);
  
      return !validation;
    };
  
    const validateBirthday = () => {
      const validation =
        birthday === '' ||
        birthday === null ||
        !(moment(birthday, DATE_FORMAT).format(DATE_FORMAT) === birthday);
  
      setProblemBirthday(validation);
  
      return !validation;
    };
  
    const validateStreet = () => {
      const validation = street === '' || street === null;
      setProblemStreet(validation);
  
      return !validation;
    };
  
    const validateNumber = () => {
      const validation = number === '' || number === null;
      setProblemNumber(validation);
  
      return !validation;
    };
  
    const validateDistrict = () => {
      const validation = district === '' || district === null;
      setProblemDistrict(validation);
  
      return !validation;
    };
  
    const validateZipCode = () => {
      const validation = zipCode === '' || street === null;
      setProblemZipCode(validation);
  
      return !validation;
    };
  
    const validateCity = () => {
      const validation = city === '' || city === null;
      setProblemCity(validation);
  
      return !validation;
    };
  
    const validateState = () => {
      const validation = state === '' || state === null;
      setProblemState(validation);
  
      return !validation;
    };
  
    const validateInfo = () =>
      validateName() &&
      validateLastname() &&
      validateBirthday() &&
      validateStreet() &&
      validateNumber() &&
      validateDistrict() &&
      validateZipCode() &&
      validateCity() &&
      validateState();
  
    const editRegister = () => {
      const validated = validateInfo();
  
      if (validated) {
        const body = {
          name,
          lastname,
          phoneNumber,
          birthday,
          gender,
          street,
          number,
          district,
          complement,
          zipCode,
          city,
          state,
        };

        api
        .put(`/user/${userInfo.userId}`, body)
        .then(() => {
          toast('cadastro editado com sucesso!');

          
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
      };
    };

    return (
        <div style={{ marginTop: '150px' }}>
        <BasicForm>
        <OneLineInput
          problem={problemName}
          name="Nome"
          value={name}
          onChange={(value) => setName(value)}
        />
        <OneLineInput
          problem={problemLastname}
          name="Sobrenome"
          value={lastname}
          onChange={(value) => setLastname(value)}
        />
        <OneLineInput
          name="Email"
          value={email}
          onChange={() => {}}
        />
        <OneLineInput
          name="Número de celular. ex: 83987565821"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
        />
        <OneLineInput name="Gênero" value={gender} onChange={(value) => setGender(value)} />
        <OneLineInput
          problem={problemBirthday}
          name="Data de nascimento. ex: 06/03/1990"
          value={birthday}
          onChange={(value) => setBirthday(value)}
        />
        <OneLineInput
          problem={problemStreet}
          name="Rua"
          value={street}
          onChange={(value) => setStreet(value)}
        />
        <OneLineInput
          problem={problemNumber}
          name="Número"
          value={number}
          onChange={(value) => setNumber(value)}
        />
        <OneLineInput
          problem={problemDistrict}
          name="Bairro"
          value={district}
          onChange={(value) => setDistrict(value)}
        />
        <OneLineInput
          name="Complemento"
          value={complement}
          onChange={(value) => setComplement(value)}
        />
        <OneLineInput
          problem={problemZipCode}
          name="CEP"
          value={zipCode}
          onChange={(value) => setZipCode(value)}
        />
        <OneLineInput
          problem={problemCity}
          name="Cidade"
          value={city}
          onChange={(value) => setCity(value)}
        />
        <OneLineInput
          problem={problemState}
          name="Estado"
          value={state}
          onChange={(value) => setState(value)}
        />
        <BaseButton onClick={editRegister}>SALVAR</BaseButton>
      </BasicForm>
    </div>
    )
}

export default EditRegister;
  
