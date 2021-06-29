import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

toast.configure();
function App() {
  return (
    <>
      <h1>HOMEMATE NEW FRONT</h1>
      <ToastContainer />
    </>
  );
}

export default App;
