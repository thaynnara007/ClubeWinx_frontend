import React from 'react';
import './tagButton.css';

function TagButton(props) {
  const { danger = false, tag = false, onClick, children } = props;

  let className = tag 
    ? 'component-button-TagButton-tag'
    : 'component-button-TagButton-category';

  className += danger
    ? ' component-button-TagButton-button-danger'
    : ' component-button-TagButton-button-color';

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default TagButton;
