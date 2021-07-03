import './input.css';

function Input(props) {
  const { type = 'text', name, value, onChange, styles } = props;

  return (
    <div>
      <label>{name}</label>
      <input className='input-box-style'
        type={type}
        className='field'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}


export default Input;
