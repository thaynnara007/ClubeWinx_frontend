import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconPeople from './components/icons/iconPeople'

toast.configure();
function App() {
  return (
    <>
      <IconPeople/>
      <ToastContainer />
    </>
  );
}

export default App;
