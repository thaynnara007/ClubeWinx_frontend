import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

toast.configure();
function App() {
  return (
    <>
      <h1>HELLO</h1>
      <ToastContainer />
    </>
  );
}

export default App;
