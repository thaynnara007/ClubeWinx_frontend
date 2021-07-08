import React, { useState } from 'react';
import { Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Text from '../../components/text';
import Button from '../../components/button';
import IconEdit from '../../components/icons/iconEdit';

import './profile.css';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: '#8566AA',
    fontSize: 40,
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
        <div style={{ position: 'absolute', left: '50%', top: '13%', zIndex: 3 }}>
          <Avatar className={styles.avatar}>MD</Avatar>
          <div style={{ marginLeft: '60px' }}>
            <Tooltip title="mudar foto">
              <button style={{ border: 'none' }}>
                <IconEdit styles={{ zIndex: 4, color: '#6983AA' }} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="profile-box">
      </div>
    </>
  );
}

export default Profile;
