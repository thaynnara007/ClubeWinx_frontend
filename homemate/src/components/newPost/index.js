import React, { useState } from 'react';
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
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [moradores, setMoradores] = useState('');
  const [quartos, setQuartos] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [loading, setLoading] = useState(false);
  const [labelValorStyle, setLabelValorStyle] = useState({});
  const [labelDescricaoStyle, setLabelDescricaoStyle] = useState({});
  const [labelMoradoresStyle, setLabelMoradoresStyle] = useState({});
  const [labelQuartosStyle, setLabelQuartosStyle] = useState({});
  const [labelRuaStyle, setLabelRuaStyle] = useState({});
  const [labelNumeroStyle, setLabelNumeroStyle] = useState({});
  const [labelBairroStyle, setLabelBairroStyle] = useState({});

  const validateValor = () => {
    const validation = valor === '' || valor === null;

    setLabelValorStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateDescricao = () => {
    const validation = descricao === '' || descricao === null;

    setLabelDescricaoStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateMoradores = () => {
    const validation = moradores === '' || moradores === null;

    setLabelMoradoresStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateQuartos = () => {
    const validation = quartos === '' || quartos === null;

    setLabelQuartosStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateRua = () => {
    const validation = rua === '' || rua === null;

    setLabelRuaStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateNumero = () => {
    const validation = numero === '' || numero === null;

    setLabelNumeroStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateBairro = () => {
    const validation = bairro === '' || bairro === null;

    setLabelBairroStyle(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateInfo = () =>
    validateValor() &&
    validateDescricao() &&
    validateMoradores() &&
    validateQuartos() &&
    validateRua() &&
    validateNumero() &&
    validateBairro();

  const register = () => {
    if (validateInfo()) {
      setLoading(true);

      const body = {
        valor,
        descricao,
        moradores,
        quartos,
        rua,
        numero,
        bairro,
      };

      api
        .post('/user/poster', body)
        .then((response) => {
          if (response) {
            setLoading(false);
            setPassword('');

            toast('Anúncio criado com sucesso!');
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
          <Input name="VALOR" value={valor} onChange={setValor} styles={labelValorStyle} />
          <Input
            name="DESCRIÇÃO"
            value={descricao}
            onChange={setDescricao}
            styles={labelDescricaoStyle}
          />
          <Input
            name="QUANTIDADE DE MORADORES"
            value={moradores}
            onChange={setMoradores}
            styles={labelMoradoresStyle}
          />
          <Input
            name="QUANTIDADE DE QUARTOS"
            value={quartos}
            onChange={setQuartos}
            styles={labelQuartosStyle}
          />
          <Input name="RUA" value={rua} onChange={setRua} styles={labelRuaStyle} />
          <Input name="NÚMERO" value={numero} onChange={setNumero} styles={labelNumeroStyle} />
          <Input name="BAIRRO" value={bairro} onChange={setBairro} styles={labelBairroStyle} />
          <BaseButton onClick={register} styles={{ width: '100%', fontWeight: 'bold' }}>
            CRIAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default NewPost;
