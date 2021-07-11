import React, { useState } from 'react';

import Email from '../../components/passwordRecovery/Email';
import Code from '../../components/passwordRecovery/Code';
import ChangePassword from '../../components/passwordRecovery/ChangePassword';
import SelectedBar from '../../components/selectedBar';
import Flex from '../../components/flex';

import {
  PASSWORD_RECOVERY_EMAIL,
  PASSWORD_RECOVERY_CODE,
  PASSWORD_RECOVERY_CHANGE,
} from '../../utils/constants';

import '../homepage/homepage.css';

let contentForm = null;

function PasswordRecovery() {
  // showNavbar(false);

  const [recoveryPage, setRecoveryPage] = useState(PASSWORD_RECOVERY_EMAIL);
  const [email, setEmail] = useState('');

  const validatePage = () => {
    switch (recoveryPage) {
      case PASSWORD_RECOVERY_EMAIL:
        contentForm = <Email setState={setRecoveryPage} email={email} setEmail={setEmail} />;
        break;
      case PASSWORD_RECOVERY_CODE:
        contentForm = <Code setState={setRecoveryPage} email={email} />;
        break;
      case PASSWORD_RECOVERY_CHANGE:
        contentForm = <ChangePassword />;
        break;
      default:
        break;
    }
  };

  return (
    <div className="homepage-background">
      <Flex styles={{ width: '50%', margin: '0 auto' }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/homemate-55271.appspot.com/o/homemate.png?alt=media&token=d17bf811-1be1-4aa3-8ddd-a366e0326d90"
          className="passwordRecovery-logo"
          alt="homemate's logo"
        />
        <SelectedBar styles={{ top: '160px' }}>{recoveryPage}</SelectedBar>

        <Flex styles={{ width: '50%', marginTop: '100px' }}>{(validatePage(), contentForm)}</Flex>
      </Flex>
    </div>
  );
}

export default PasswordRecovery;
