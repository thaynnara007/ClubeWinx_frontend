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
  const validateAddress = () => {
    if (
      address &&
      address.street &&
      address.number &&
      address.district &&
      address.city &&
      address.state
    )
      return true;

    return false;
  
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


  return (
    <>
      {isLoading || loading ? (
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
          <Input name="RUA" value={address?.street ?? UPDATE_YOUR_ADDRESS} onChange={() => {}} />
          <Input name="NÚMERO" value={address?.number ?? UPDATE_YOUR_ADDRESS} onChange={() => {}} />
          <Input
            name="BAIRRO"
            value={address?.district ?? UPDATE_YOUR_ADDRESS}
            onChange={() => {}}
          />
          <Input
            name="COMPLEMENTO"
            value={address?.complement ?? UPDATE_YOUR_ADDRESS}
            onChange={() => {}}
          />
          <Input name="CEP" value={address?.zipCode ?? UPDATE_YOUR_ADDRESS} onChange={() => {}} />
          <Input name="CIDADE" value={address?.city ?? UPDATE_YOUR_ADDRESS} onChange={() => {}} />
          <Input name="ESTADO" value={address?.state ?? UPDATE_YOUR_ADDRESS} onChange={() => {}} />
          {validateAddress() ? (
            <BaseButton onClick={register} styles={buttonStyle}>
              CRIAR
            </BaseButton>
          ) : (
            <HtmlTooltip title={tooltip} placement="right-end">
              <div style={{ width: '100%' }}>
                <BaseButton onClick={() => {}} styles={disabledButtonStyle}>
                  CRIAR
                </BaseButton>
              </div>
            </HtmlTooltip>
          )}
        </>
      )}
    </>
  );
}

export default NewPost;
