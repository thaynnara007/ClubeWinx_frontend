import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Text from '../../components/text'
import Button from '../../components/button'
import IconEdit from '../../components/icons/iconEdit';

import './profile.css';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: '#8566AA',
    fontSize: 40,
    zIndex: 3,
    position: 'relative',
    left: '-50%',
  },
}));

function Profile() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  const styles = useStyles();

  return (
    <>
      <div className="profile-header" style={{ ...headerBackground }}>
        <div style={{ position: 'absolute', left: '50%', top: '13%' }}>
          <Avatar className={styles.avatar}>MD</Avatar>
        </div>
        <div style={{ backgroundColor: 'white'}}>
          <IconEdit styles={{ zIndex: 4, color: 'black'}} />
        </div>
        <div className="profile-box">

        </div>
      </div>
    </>
  );
}

export default Profile;
