import EnterPage from './pages/enter';
import Page404 from './pages/404';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import MyAnnouncemente from './pages/myAnnouncement';
import MyProfile from './pages/myProfile';
import Explore from './pages/explore';

toast.configure();
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={EnterPage}></Route>
          <Route path="/homepage" component={HomePage}></Route>
          <Route path="/myannouncement" component={MyAnnouncemente}></Route>
          <Route path="/myprofile" component={MyProfile}></Route>
          <Route path="/explore" component={Explore}></Route>
          <Route path="*" component={Page404}></Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
