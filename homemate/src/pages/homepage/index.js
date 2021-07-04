import React from 'react';
import ReactCardFlip from 'react-card-flip';

import Register from '../../components/register';
import TabBar from '../../components/tabBar';
import Login from '../../components/login';
import Flex from '../../components/flex';

import './homepage.css';

function Home({ showNavbar }) {
  showNavbar(false);

  return (
    <div className="homepage-background">
      <Flex styles={{ width: '50%', margin: '0 auto' }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/homemate-55271.appspot.com/o/homemate.png?alt=media&token=d17bf811-1be1-4aa3-8ddd-a366e0326d90"
          className="homepage-logo"
          alt="homemate's logo"
        />
        <TabBar choosed="CONECTE-SE" styles={{ top: '150px' }}>
          {['CONECTE-SE', 'INSCREVA-SE']}
        </TabBar>
        <Flex styles={{ width: '50%', marginTop: '80px' }}>
          <Login></Login>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
