import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api';

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        toast.error(msg);
      });
  }, []);

  return { data };
}

export default useFetch;
