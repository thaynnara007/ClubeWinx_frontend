import React from 'react';
import './base.css';

function BaseButton(props) {
  const { danger = false, onClick, children, styles } = props;

  let className = 'component-button-base-button';

  className += danger ? ' component-button-base-button' : ' component-button-base-button-color';

  return (
    <button type="button" className={className} onClick={onClick} style={styles}>
      {children}
    </button>
  );
}

export default BaseButton;
