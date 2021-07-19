import React, { useState } from 'react';

import Input from '../input';
import BaseButton from '../button';
import Loading from '../loading';

import './editRegister.css';

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
  const [description, setDescription] = useState('');
  const [labelDescriptionStyle, setLabelDescriptionStyle] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input
            name="DESCRIÇÃO"
            value={description}
            onChange={setDescription}
            styles={labelDescriptionStyle}
          />
          <BaseButton styles={{ width: '100%', fontWeight: 'bold' }}>EDITAR</BaseButton>
        </>
      )}
    </>
  );
}

export default EditRegister;
