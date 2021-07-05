import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import Register from '../../components/register';
import TabBar from '../../components/tabBar';
import Login from '../../components/login';
import Flex from '../../components/flex';

import './homepage.css';

function Home({ showNavbar }) {
  showNavbar(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [choosedTab, setChoosedTab] = useState('CONECTE-SE');

  const handleClickLogin = () => {
    setIsFlipped(false);
    setChoosedTab('CONECTE-SE');
  };

  const handleClickRegister = () => {
    setIsFlipped(true);
    setChoosedTab('INSCREVA-SE');
  };

  return (
    <div className="homepage-background">
      <Flex styles={{ width: '50%', margin: '0 auto' }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/homemate-55271.appspot.com/o/homemate.png?alt=media&token=d17bf811-1be1-4aa3-8ddd-a366e0326d90"
          className="homepage-logo"
          alt="homemate's logo"
        />
        <TabBar
          choosed={choosedTab}
          styles={{ top: '160px' }}
          actions={[handleClickLogin, handleClickRegister]}
        >
          {['CONECTE-SE', 'INSCREVA-SE']}
        </TabBar>
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ width: '50%', marginTop: '100px' }}
        >
          <Flex styles={{ width: '100%' }}>
            <Login />
          </Flex>

          <Flex styles={{ width: '100%' }}>
            <Register />
          </Flex>
        </ReactCardFlip>
      </Flex>
    </div>
  );
}

export default Home;
