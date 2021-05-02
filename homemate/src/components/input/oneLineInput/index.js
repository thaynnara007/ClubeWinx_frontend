import React from 'react';
import './oneLineInput.css';

function OneLineInput(props) {
  const { type = 'text', problem = false, name, value, onChange } = props;

  let inputClass = 'component-input-onLineImput-input';

  inputClass += problem
    ? ' component-input-onLineImput-input-color-wrong'
    : ' component-input-onLineImput-input-color-right';

  return (
    <div className="component-input-oneLineInput-form-input-material">
      <input
        type={type}
        placeholder={name}
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default OneLineInput;
