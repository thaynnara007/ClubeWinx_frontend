import { toast } from 'react-toastify';

import { useState } from 'react';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { useHistory } from 'react-router';

function PasswordRecoveryChange() {
  const [newPassword, setNewPassword ] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [problemNewPassword, setProblemNewPassword] = useState(false);
  const history = useHistory();

  const validateNewPassword = () => {
    
    const validation = 
    (
      newPassword === '' || 
      newPassword === null ||
      !(newPassword === confirmPassword)
    );

    if (validation) toast.warn('As senhas não estão iguais!')

    setProblemNewPassword(validation);

    return !validation;
};

const recovery = () => {
  if (validateNewPassword()) {
    const body = {
      newPassword,
    };

    api
      .put('/user/change/password', body)
      .then(() => {
        toast('Senha alterada!');
        history.push('/');
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
          <OneLineInput
            type="password"
            name="Senha"
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
          />
          <OneLineInput
            type="password"
            name="Confirme a senha"
            value={confirmPassword}
            problem={problemNewPassword}
            onChange={(value) => setConfirmPassword(value)}
          />
          <BaseButton onClick={recovery}>ALTERAR SENHA</BaseButton>
      </BasicForm>
    </div>
  );
}

export default PasswordRecoveryChange;