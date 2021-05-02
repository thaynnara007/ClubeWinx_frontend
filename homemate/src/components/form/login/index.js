import BasicForm from '../BasicForm'
import OneLineInput from '../../input/oneLineInput'

function Login (props) {
  
  return (
    <div style={{marginTop: '150px'}}>
      <BasicForm>
        <OneLineInput name="Email"/>
        <OneLineInput name="Senha"/>
      </BasicForm>
    </div>
  )
}

export default Login