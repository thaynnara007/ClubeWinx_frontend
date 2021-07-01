import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function App() {
  return (
    <>
      <h1>Hello</h1>
      <ToastContainer />
    </>
  );
}

export default App;
