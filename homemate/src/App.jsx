import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconBed from './components/icons/iconBed'
import IconPeople from './components/icons/iconPeople'
import IconDoor from './components/icons/iconDoor'
import IconBath from './components/icons/iconBath'

toast.configure();
function App() {
  return (
    <>
      <IconPeople/>
      <IconBath/>
      <IconDoor/>
      <IconBed/>
      <ToastContainer />
    </>
  );
}

export default App;
