import { toast } from 'react-toastify';

import { useState } from 'react';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { PASSWORD_RECOVERY_PAGE_CHANGE } from '../../../utils/constants';

function passwordRecoveryCode(props) {
  const { email, setState } = props;
  const [code, setCode] = useState('');
  const [problemCode, setProblemCode] = useState(false);

  const validateCode = () => {
    const validation = code === '' || code === null;
    setProblemCode(validation);
    return !validation;
  };

  const passwordRecoveryCode = () => {
    if (validateCode()) {
      const body = {
        code,
        email,
      };

      api
        .post('/auth/verify/code', body)
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem('homemate_access_token', token);
          setState(PASSWORD_RECOVERY_PAGE_CHANGE);
          console.log(response);
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Codigo invalido';
          toast.error(msg);
        });
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
        <OneLineInput
          name="Code"
          value={code}
          problem={problemCode}
          onChange={(value) => setCode(value)}
        />
        <BaseButton onClick={passwordRecoveryCode}>verificar</BaseButton>
      </BasicForm>
    </div>
  );
}

export default passwordRecoveryCode;
