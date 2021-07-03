import './input.css';

function Input(props) {
  const { type = 'text', name, value, onChange, styles } = props;

  return (
    <div>
      <label className="input-label">{name}
      <input className='input-box-style'
        type={type}
       style={styles}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      </label>
    </div>
  );
}


export default Input;
