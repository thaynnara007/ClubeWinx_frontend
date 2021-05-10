import { toast } from 'react-toastify';

import { useState } from 'react';
import api from '../../../api';
import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';
import { PASSWORD_RECOVERY_PAGE_CODE } from '../../../utils/constants';

function passwordRecoveryEmail(props) {
    const { setState, setEmail , email } = props;
    const [problemEmail, setProblemEmail] = useState(false);

    const validateEmail = () => {
        const validation = email === '' || email === null;
        setProblemEmail(validation);

        return !validation;
    };

    const recovery = () => {
        if (validateEmail()) {
            const body = {
                email,
            };

            api
                .post('/user/forget/password', body)
                .then(setState(PASSWORD_RECOVERY_PAGE_CODE))
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
                    name="Email"
                    value={email}
                    problem={problemEmail}
                    onChange={(value) => setEmail(value)}
                />
                <BaseButton onClick={recovery}>ENVIAR CODIGO</BaseButton>
            </BasicForm>
        </div>
    );
}

export default passwordRecoveryEmail;
