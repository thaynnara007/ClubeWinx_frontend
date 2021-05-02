import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Login from '../components/form/login';
import Register from '../components/form/register';
import { ENTER_PAGE_LOGIN, ENTRER_PAGE_REGISTER } from '../utils/constants';

function EnterPage() {
  const options = [ENTER_PAGE_LOGIN, ENTRER_PAGE_REGISTER];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_LOGIN);

  const onChangeLogin = () => {
    setClickedOption(ENTER_PAGE_LOGIN);
  };

  const onChangeRegister = () => {
    setClickedOption(ENTRER_PAGE_REGISTER);
  };

  const contentForm = clickedOption === ENTER_PAGE_LOGIN ? <Login /> : <Register />;

  return (
    <>
      <Navbar choosed={clickedOption} actions={[onChangeLogin, onChangeRegister]}>
        {options}
      </Navbar>
      {contentForm}
    </>
  );
}

export default EnterPage;
