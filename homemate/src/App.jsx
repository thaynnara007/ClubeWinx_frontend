import { useState } from 'react';
import Navbar from './components/navbar';
import Register from './components/form/register'
import Login from './components/form/login'

function App() {
  const [ choosed, setChoosed ] = useState('LOGIN')

  const action1 = () => {
    setChoosed('LOGIN')
  }

  const action2 = () => {
    setChoosed('CADASTRO')
  }

  const actions = [action1, action2]
  
  return (
    <div>
      <Navbar choosed={choosed} actions={actions}>{['LOGIN', 'CADASTRO']}</Navbar>
      <Register/>
    </div>
  )

}

export default App;
