import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/homepage';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import About from './pages/About';
import Logout from './pages/Logout';
import Navbar from './components/navbar/Navbar';
import NotFound from './pages/NotFound';

const isLoginPage = () => window.location.pathname !== '/';

toast.configure();
function App() {
  const [showNavbar, setShowNavbar] = useState(isLoginPage());

  return (
    <>
      <Router>
        {showNavbar && <Navbar />}
        <main>
          <Switch>
            <Route exact path="/">
              <Home showNavbar={setShowNavbar} />
            </Route>
            <Route exact path="/posts">
              <Posts />
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
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
