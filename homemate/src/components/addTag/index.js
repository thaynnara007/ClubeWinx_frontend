import React, { useState } from 'react';
import Input from '../input';
import Loading from '../loading';
import BaseButton from '../button';

function AddTag() {
  const [categoria, setCategoria] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const tag = () => {
    //corpo da requisição
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input name="CATEGORIA" value={categoria} />
          <Input name="NOME DA TAG" value={name} />
          <BaseButton onClick={tag} styles={{ width: '100%', fontWeight: 'bold' }}>
            ADICIONAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default AddTag;
