import BasicForm from '../BasicForm'
import OneLineInput from '../../input/oneLineInput'


function Register (props) {
  
  return (
    <div style={{marginTop: '150px'}}>
      <BasicForm>
        <OneLineInput name="Nome"/>
        <OneLineInput name="Sobrenome"/>
        <OneLineInput name="Email"/>
        <OneLineInput name="Número de celular. ex: 83987565821"/>
        <OneLineInput name="Gênero"/>
        <OneLineInput name="Data de nascimento. ex: 06/03/1990"/>
        <OneLineInput name="Senha"/>
        <OneLineInput name="Rua"/>
        <OneLineInput name="Número"/>
        <OneLineInput name="Bairro"/>
        <OneLineInput name="Complemento"/>
        <OneLineInput name="CEP"/>
        <OneLineInput name="Cidade"/>
        <OneLineInput name="Estado"/>
      </BasicForm>
    </div>
  )
}

export default Register