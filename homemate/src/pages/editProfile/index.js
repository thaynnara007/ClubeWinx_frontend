import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import TabBar from '../../components/tabBar';
import Flex from '../../components/flex';
import IconArrowLeft from '../../components/icons/iconArrowLeft';

import './editProfile.css';
import { useHistory } from 'react-router';
import ProfileEdit from '../../components/profileEdit';
import EditRegister from '../../components/editRegister'

function EditProfile() {
  const [choosedTab, setChoosedTab] = useState('PERFIL');
  const [isFlipped, setIsFlipped] = useState(false);

  const history = useHistory();

  const handleClickEditAddress = () => {
    setIsFlipped(false);
    setChoosedTab('ENDEREÇO');
  };

  const handleClickEditProfile = () => {
    setIsFlipped(true);
    setChoosedTab('PERFIL');
  };

  const handleClickEditRegister = () => {
    setIsFlipped(true);
    setChoosedTab('CADASTRO');
  };

  const homepage = () => {
    window.location.replace('/posts');
  };

  const back = (
    <button
      type="button"
      className="profile-icon-button"
      onClick={() => history.push('/profile/me')}
    >
      <IconArrowLeft styles={{ zIndex: 4, color: '#FFFFFF' }} />
    </button>
  );

  return (
    <div className="editProfile-background">
      <Flex styles={{ width: '50%', margin: '0 auto' }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/homemate-55271.appspot.com/o/homemate.png?alt=media&token=d17bf811-1be1-4aa3-8ddd-a366e0326d90"
          className="homepage-logo"
          alt="homemate's logo"
          onClick={() => homepage()}
        />
        <TabBar
          choosed={choosedTab}
          styles={{ top: '160px' }}
          actions={[handleClickEditAddress, handleClickEditProfile, handleClickEditRegister]}
        >
          {[back, 'ENDEREÇO', 'PERFIL', 'CADASTRO']}
        </TabBar>
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ width: '50%', marginTop: '100px' }}
        >
          <Flex styles={{ width: '100%' }}>
            <ProfileEdit />
          </Flex>
          <Flex styles={{ width: '100%' }}>
            <EditRegister />
          </Flex>
        </ReactCardFlip>
      </Flex>
    </div>
  );
}

export default EditProfile;
