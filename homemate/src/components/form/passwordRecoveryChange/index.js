import { toast } from 'react-toastify';

import { useState } from 'react';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { useHistory } from 'react-router';

function PasswordRecoveryChange() {
    const [newPassword, setNewPassword ] = useState('');
    const [problemNewPassword, setProblemNewPassword] = useState(false);
    const history = useHistory();
    const validateNewPassword = () => {
        const validation = newPassword === '' || newPassword === null;
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
                .then((response) => {
                    toast('Senha alterada!');
                    history.push('/');
                    console.log(response);
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
                    name="newPassword"
                    value={newPassword}
                    problem={problemNewPassword}
                    onChange={(value) => setNewPassword(value)}
                />
                <BaseButton onClick={recovery}>ALTERAR SENHA</BaseButton>
            </BasicForm>
        </div>
    );
}

export default PasswordRecoveryChange;