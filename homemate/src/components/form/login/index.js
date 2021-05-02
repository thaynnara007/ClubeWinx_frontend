import BasicForm from '../BasicForm';
import OneLineInput from '../../input/oneLineInput';
import BaseButton from '../../button/baseButton';

function Login() {
  return (
    <div style={{ marginTop: '150px' }}>
      <BasicForm>
        <OneLineInput name="Email" />
        <OneLineInput type="password" name="Senha" />
        <BaseButton>ENTRAR</BaseButton>
      </BasicForm>
    </div>
  );
}

export default Login;
