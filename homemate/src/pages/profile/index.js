import React, { useState } from 'react';
import { Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Text from '../../components/text';
import Button from '../../components/button';
import IconEdit from '../../components/icons/iconEdit';
import IconProfileEdit from '../../components/icons/iconEditProfile';

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
              <button type="button" className="profile-icon-button">
                <IconEdit styles={{ zIndex: 4, color: '#6983AA' }} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="profile-box">
        <div className="profile-edit-info-icon">
          <Tooltip title="editar informações">
            <button type="button" className="profile-icon-button">
              <IconProfileEdit size="2x" />
            </button>
          </Tooltip>
        </div>
        <div className="profile-title">
          <Text
            styles={{
              fontSize: '36px',
              color: '#6983AA',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            mylena dantas
          </Text>
          <div style={{ margin: '0 auto', width: 'fit-content', height: 'fit-content' }}>
            <Button styles={{ paddingTop: '4px', paddingBottom: '4px', margin: 0 }}>
              VER ANÚNCIO
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
