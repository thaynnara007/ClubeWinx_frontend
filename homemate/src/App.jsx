import EnterPage from './pages/enter';
import Page404 from './pages/404';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import EditProfilePage from './pages/editProfile';


toast.configure();
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={EnterPage}></Route>
          <Route path="/homepage" component={HomePage}></Route>
          <Route path="/profile/edit" component={EditProfilePage}></Route>
          <Route path="*" component={Page404}></Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
