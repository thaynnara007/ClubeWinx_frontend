import React, { useState } from 'react';
import Navbar from '../components/navbar';
import PasswordRecoveryCode from '../components/form/passwordRecoveryCode';
import PasswordRecoveryEmail from '../components/form/passwordRecoveryEmail';
import Register from '../components/form/register';
import {
  PASSWORD_RECOVERY_PAGE_CODE,
  PASSWORD_RECOVERY_PAGE_EMAIL,
  PASSWORD_RECOVERY_PAGE_CHANGE,
} from '../utils/constants';

function PasswordRecovery() {
  const [state, setState] = useState(PASSWORD_RECOVERY_PAGE_EMAIL);
  const [email, setEmail] = useState('');
  const options = [state];

  let contentForm = state;

  switch (state) {
    case PASSWORD_RECOVERY_PAGE_CODE:
      contentForm = <PasswordRecoveryCode setState={setState} email={email} />;
      break;
    case PASSWORD_RECOVERY_PAGE_EMAIL:
      contentForm = <PasswordRecoveryEmail setState={setState} setEmail={setEmail} email={email} />;
      break;
    case PASSWORD_RECOVERY_PAGE_CHANGE:
      contentForm = <Register />;
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar choosed={state} actions={[]}>
        {options}
      </Navbar>
      {contentForm}
    </>
  );
}

export default PasswordRecovery;
