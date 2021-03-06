import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

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

const buttonStyle = { width: '100%', fontWeight: 'bold' };
const disabledButtonStyle = { ...buttonStyle, backgroundColor: 'grey', cursor: 'not-allowed' };

const UPDATE_YOUR_ADDRESS = 'Pegaremos essa informação do seu perfil.';
const disabledButtonTip =
  'Para criar um anúncio, você precisa ter alguma informação relativa a endereço no seu';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#F4F4F4',
    color: '#6983AA',
    maxWidth: 250,
    fontSize: '18px',
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const tooltip = (
  <>
    <p>
      {disabledButtonTip}
      <b>{' perfil.'}</b>
    </p>
  </>
);

function NewPost({ post, isEdit }) {
  const history = useHistory();

  const [expense, setExpense] = useState(post?.expense ?? '');
  const [description, setDescription] = useState(post?.description ?? '');
  const [residents, setResidents] = useState(post?.residents ?? '');
  const [vacancies, setVacancies] = useState(post?.vacancies ?? '');
  const [bathrooms, setBathrooms] = useState(post?.bathrooms ?? '');
  const [beds, setBeds] = useState(post?.beds ?? '');
  const [address, setAddress] = useState(post.address ?? {});

  const [labelExpenseStyle, setLabelExpenseStyle] = useState({});
  const [labelDescriptionStyle, setLabelDescriptionStyle] = useState({});
  const [labelResidentsStyle, setLabelResidentsStyle] = useState({});
  const [labelVacanciesStyle, setLabelVacanciesStyle] = useState({});
  const [labelBathroomsStyle, setLabelBathroomsStyle] = useState({});
  const [labelBedsStyle, setLabelBedsStyle] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function updateState() {
      setExpense(post?.expense);
      setDescription(post?.description);
      setResidents(post?.residents);
      setVacancies(post?.vacancies);
      setBathrooms(post?.bathrooms);
      setBeds(post?.beds);
      setAddress(post?.address);
    }

    updateState();
  }, [post]);

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
            history.push('/posts/my');
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

  const edit = () => {
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
        .put('/user/poster/my', body)
        .then((response) => {
          if (response) {
            setLoading(false);
            history.push('/posts/my');
            toast('Anúncio editado com sucesso!');
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
            isEdit ? (
              <BaseButton onClick={edit} styles={buttonStyle}>
                EDITAR
              </BaseButton>
            ) : (
              <BaseButton onClick={register} styles={buttonStyle}>
                CRIAR
              </BaseButton>
            )
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
