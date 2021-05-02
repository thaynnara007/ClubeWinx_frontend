import React from 'react';
import './base.css';

function BaseButton(props) {
  const { onClick, children } = props;

  return (
    <button type="button" className="component-button-base-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default BaseButton;
