// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import About from './pages/About';
import Logout from './pages/Logout';
import Navbar from './components/navbar/Navbar';

// toast.configure();
function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
