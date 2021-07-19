import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/homepage';
import Posts from './pages/posts';
import PostDetails from './pages/postDetails';
import Profile from './pages/profile';
import Explore from './pages/Explore';
import About from './pages/About';
import Logout from './pages/Logout';
import Navbar from './components/navbar/Navbar';
import NotFound from './pages/NotFound';
import PasswordRecovery from './pages/passwordRecovery';
import CreatePost from './pages/createPost';

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
              <Home />
            </Route>
            <Route exact path="/createPost">
              <CreatePost />
            </Route>
            <Route exact path="/posts">
              <Posts />
            </Route>
            <Route path="/posts/:id">
              <PostDetails />
            </Route>
            <Route path="/profile/:id">
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
            <Route path="/PasswordRecovery">
              <PasswordRecovery />
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
