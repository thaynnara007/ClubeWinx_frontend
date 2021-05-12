import React from 'react';
import './base.css';

function BaseButton(props) {
  const { danger = false, tag = false, onClick, children } = props;

  let className = tag 
    ? 'component-button-base-tag'
    : 'component-button-base-button';

  className += danger
    ? ' component-button-base-button-danger'
    : ' component-button-base-button-color';

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default BaseButton;
