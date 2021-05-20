import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Navbar from '../components/navbar';
import Login from '../components/form/login';
import Register from '../components/form/register';
import { ENTER_PAGE_LOGIN, ENTER_PAGE_REGISTER } from '../utils/constants';

function EnterPage() {
  const options = [ENTER_PAGE_LOGIN, ENTER_PAGE_REGISTER];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_LOGIN);
  const history = useHistory();

  useEffect( () => {
    const token = localStorage.getItem('homemate_access_token')

    if (token) history.push('/homepage')
  }, [])

  const onChangeLogin = () => {
    setClickedOption(ENTER_PAGE_LOGIN);
  };

  const onChangeRegister = () => {
    setClickedOption(ENTER_PAGE_REGISTER);
  };

  const contentForm = clickedOption === ENTER_PAGE_LOGIN ? <Login /> : <Register changeToLogin={onChangeLogin} />;

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
