import React from 'react'
import ReactCardFlip from 'react-card-flip';


import Register from '../../components/register';
import Login from '../../components/login';
import BasicForm from '../../components/basicForm'

import './homepage.css'

function Home({ showNavbar }) {
  showNavbar(false)

  return (
    <div className="homepage-background">
      <BasicForm>
        <Login></Login>
      </BasicForm>
    </div>
  )
}

export default Home;
