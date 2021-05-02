import React, { useState, Fragment } from 'react';
import './basicForm.css'

function BasicForm (props) {
  const { children } = props
  return (
    <form className="component-form-register-form">
      { children }
    </form>
  )
}

export default BasicForm