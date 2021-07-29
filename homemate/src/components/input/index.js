/* eslint-disable react/button-has-type */
import './input.css';

import IconButton from '../button/iconButton';

const iconButtonStyle = {
  position: 'absolute',
  right: '0%',
  marginTop: '8px',
  padding: '0 15px',
  borderLeftStyle: 'solid',
  borderColor: '#6983AA',
  borderWidth: '2px',
};

function Input(props) {
  const { type = 'text', name, value, onChange, styles, onClick, children } = props;

  return (
    <div style={{ marginTop: '15px', width: '100%' }}>
      <span className="input-label" style={styles?.label ?? {}}>
        {name}
      </span>
      <div style={{ width: '100%' }}>
        <input
          className="input-box-style"
          type={type}
          style={styles?.input ?? {}}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {children && (
          <IconButton styles={iconButtonStyle} onClick={onClick}>
            {children}
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Input;
