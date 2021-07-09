import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Avatar, Tooltip } from '@material-ui/core';

import Text from '../../components/text';
import Button from '../../components/button';
import ScrollBox from '../../components/scrollBox'
import IconEdit from '../../components/icons/iconEdit';
import IconPeople from '../../components/icons/iconPeople'
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

const infoStyle = {
  display: {
    gridRow: '3 / 5',
    gridColumn: '1',
    width: '100%',
    height: '100%'
  }
}

function Profile() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  const styles = useStyles();

  return (
    <>
      <div className="profile-header" style={{ ...headerBackground }}>
        <div style={{ position: 'absolute', right: '5%', top: '16%'}}>
          <button type="button" className="profile-header-edit-button">EDITAR</button>
        </div>
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
        <div className="profile-vl" />
        <ScrollBox styles={infoStyle}>
          {[
            <li>
              <div>
                <IconPeople />
              </div>
            </li>
          ]}
        </ScrollBox>
      </div>
    </>
  );
}

export default Profile;
