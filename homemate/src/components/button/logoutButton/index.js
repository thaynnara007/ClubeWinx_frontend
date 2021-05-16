import React from 'react';
import './logout.css';
import { useHistory } from 'react-router';

import { LOGOUT } from '../../../utils/constants'

function LogoutButton() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('homemate_access_token')
    history.push('/')
  }

  return (
    <button type="button" className='component-button-logout-button' onClick={logout}>
      {LOGOUT}
    </button>
  );
}

export default LogoutButton;
