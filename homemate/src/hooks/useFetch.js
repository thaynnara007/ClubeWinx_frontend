import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api';

function useFetch(url, callAgain) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setIsLoading(false);
        toast.error(msg);
      });
  }, [callAgain]);

  return { data, isLoading };
}

export default useFetch;
