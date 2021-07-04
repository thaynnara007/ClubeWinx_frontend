import React from 'react'
import ReactCardFlip from 'react-card-flip';

import Register from '../../components/register';
import Login from '../../components/login';
import Flex from '../../components/flex'

import './homepage.css'

function Home({ showNavbar }) {
  showNavbar(false)

  return (
    <div className="homepage-background">
      <Flex styles={{width: '50%', margin: '0 auto'}}>
        <image></image>
        <Flex styles={{ width: '50%'}}>
          <Login></Login>
        </Flex>
      </Flex>
    </div>
  )
}

export default Home;
