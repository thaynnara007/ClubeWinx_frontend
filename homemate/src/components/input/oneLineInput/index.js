import React from 'react';
import './oneLineInput.css';

function OneLineInput(props) {
  const { name, value, onChange } = props;

  return (
    <div className="component-input-oneLineInput-form-input-material">
      <input
        type="text"
        placeholder={name}
        className="component-input-onLineImput-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default OneLineInput;
