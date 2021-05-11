import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './filter.css';
import api from '../../api';

function Filter() {
  const [tags, setTags] = useState(null);

  const getProfile = () => {
    api
      .get('/category/')
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        toast.error(msg);
      });
  };

  useEffect(() => {
      getProfile();
    }, []);

  return (
    <>
      <div style={{ marginTop: '150px' }}>
        {tags && tags.map((tag) => <span>{`<${tag.name}>`}</span>)}
      </div>
    </>
  );
}

export default Filter;
