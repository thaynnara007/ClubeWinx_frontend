import React from 'react';
import './basicForm.css';

function BasicForm({ children }) {
  return <form className="component-form-register-form">{children}</form>;
}

export default BasicForm;