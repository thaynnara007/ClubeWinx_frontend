import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

import './newPost.css';

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

function NewPost() {
  const { data: address, isLoading } = useFetch('/address/me');
  
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [residents, setResidents] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [beds, setBeds] = useState('');

  const [labelExpenseStyle, setLabelExpenseStyle] = useState({});
  const [labelDescriptionStyle, setLabelDescriptionStyle] = useState({});
  const [labelResidentsStyle, setLabelResidentsStyle] = useState({});
  const [labelVacanciesStyle, setLabelVacanciesStyle] = useState({});
  const [labelBathroomsStyle, setLabelBathroomsStyle] = useState({});
  const [labelBedsStyle, setLabelBedsStyle] = useState({});

  const [loading, setLoading] = useState(false);

  const validateExpense = () => {
    const validation = expense === '' || expense === null;
    setLabelExpenseStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateDescription = () => {
    const validation = description === '' || description === null;
    setLabelDescriptionStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateResidents = () => {
    const validation = residents === '' || residents === null;
    setLabelResidentsStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateVacancies = () => {
    const validation = vacancies === '' || vacancies === null;
    setLabelVacanciesStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateBathrooms = () => {
    const validation = bathrooms === '' || bathrooms === null;
    setLabelBathroomsStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateBeds = () => {
    const validation = beds === '' || beds === null;
    setLabelBedsStyle(validation ? stylesInvalid : stylesValid);
    return !validation;
  };

  const validateInfo = () =>
    validateExpense() &&
    validateDescription() &&
    validateResidents() &&
    validateVacancies() &&
    validateBathrooms() &&
    validateBeds();

  const register = () => {
    if (validateInfo()) {
      setLoading(true);

      const body = {
        expense,
        description,
        residents,
        vacancies,
        bathrooms,
        beds,
      };

      api
        .post('/user/poster', body)
        .then((response) => {
          if (response) {
            setLoading(false);

            toast('Anúncio criado com sucesso!');
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

  const getAddress = () => {
    api.get('/address/me').then((response) => {
      setStreet(response.data.street);
      setNumber(response.data.number);
      setDistrict(response.data.district);
      setZipCode(response.data.zipCode);
      setCity(response.data.city);
      setState(response.data.state);
    });
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input name="VALOR" value={expense} onChange={setExpense} styles={labelExpenseStyle} />
          <Input
            name="DESCRIÇÃO"
            value={description}
            onChange={setDescription}
            styles={labelDescriptionStyle}
          />
          <Input
            name="QUANTIDADE DE MORADORES"
            value={residents}
            onChange={setResidents}
            styles={labelResidentsStyle}
          />
          <Input
            name="QUANTIDADE DE QUARTOS"
            value={vacancies}
            onChange={setVacancies}
            styles={labelVacanciesStyle}
          />
          <Input
            name="QUANTIDADE DE BANHEIROS"
            value={bathrooms}
            onChange={setBathrooms}
            styles={labelBathroomsStyle}
          />
          <Input
            name="QUANTIDADE DE CAMAS"
            value={beds}
            onChange={setBeds}
            styles={labelBedsStyle}
          />
          <Input name="RUA" value={street} onChange={() => {}} />
          <Input name="NÚMERO" value={number} onChange={() => {}} />
          <Input name="BAIRRO" value={district} onChange={() => {}} />
          <Input name="COMPLEMENTO" value={complement} onChange={() => {}} />
          <Input name="CEP" value={zipCode} onChange={() => {}} />
          <Input name="CIDADE" value={city} onChange={() => {}} />
          <Input name="ESTADO" value={state} onChange={() => {}} />
          <BaseButton onClick={register} styles={{ width: '100%', fontWeight: 'bold' }}>
            CRIAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default NewPost;
