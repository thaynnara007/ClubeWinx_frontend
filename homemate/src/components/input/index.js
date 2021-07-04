/* eslint-disable react/button-has-type */
import './input.css';

function Input(props) {
  const { type = 'text', name, value, onChange, styles } = props;

  return (
    <div style={{ marginTop: '15px' }}>
      <span className="input-label">{name} </span>
      <input
        className="input-box-style"
        type={type}
        style={styles}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
