import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Avatar, Tooltip } from '@material-ui/core';

import Text from '../../components/text';
import Button from '../../components/button';
import InputTag from '../../components/inputTag';
import ScrollBox from '../../components/scrollBox';
import IconEdit from '../../components/icons/iconEdit';
import IconPhone from '../../components/icons/iconPhone';
import IconEmail from '../../components/icons/iconEmail';
import IconPeople from '../../components/icons/iconPeople';
import IconAddress from '../../components/icons/iconAddress';
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

const iconStyle = {
  gridColumn: '1',
  justifySelf: 'end',
  width: 'fit-content',
  height: 'fit-content',
};

const infoTextStyle = {
  fontSize: '22px',
  color: '#6983AA',
  marginBottom: '0',
  marginLeft: '30px',
  gridColumn: '2',
  justifySelf: 'start',
  width: 'fit-content',
  height: 'fit-content',
};

const descriptionBoxStyle = {
  display: {
    gridRow: '3 / 5',
    gridColumn: '2',
    justifySelf: 'center',
    width: '80%',
    height: '100%',
    //    border: '2px solid #cbdae5',
    //    borderRadius: '8px',
  },
};

const tagsBoxStyle = {
  display: {
    gridColumn: '1 / 3',
    gridRow: '5 / 7',
    width: '80%',
    height: '80%',
    border: '2px solid #cbdae5',
    borderRadius: '8px',
    justifySelf: 'center',
    marginTop: '40px',
  },
  item: {
    height: 'fit-content'
  }
};

const textExample = `And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.`;

function Profile() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  const styles = useStyles();

  return (
    <>
      <div className="profile-header" style={{ ...headerBackground }}>
        <div style={{ position: 'absolute', right: '5%', top: '16%' }}>
          <button type="button" className="profile-header-edit-button">
            EDITAR
          </button>
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

        <div className="profile-info-display">
          <div style={iconStyle}>
            <IconPeople size="2x" />
          </div>
          <Text styles={infoTextStyle}>22 ano, Masculino</Text>

          <div style={iconStyle}>
            <IconEmail size="2x" />
          </div>
          <Text styles={infoTextStyle}>someEmail987@gmail.com</Text>

          <div style={iconStyle}>
            <IconPhone size="2x" />
          </div>
          <Text styles={infoTextStyle}>(83) 998745-5632</Text>

          <div style={iconStyle}>
            <IconAddress size="2x" />
          </div>
          <Text styles={infoTextStyle}>Paraíba, Campina Grande</Text>
        </div>

        <ScrollBox styles={descriptionBoxStyle}>
          {[<p className="profile-description-text">{textExample}</p>]}
        </ScrollBox>

        <ScrollBox styles={tagsBoxStyle}>
          {[
            <InputTag styles={{ backgroundColor: 'red' }}>cachorro</InputTag>,
            <InputTag styles={{ backgroundColor: 'blue' }}>fumanete</InputTag>,
            <InputTag styles={{ backgroundColor: 'black' }}>UFCG</InputTag>,
            <InputTag styles={{ backgroundColor: 'orange' }}>mecânica</InputTag>,
            <InputTag styles={{ backgroundColor: 'green' }}>planta</InputTag>,
            <InputTag styles={{ backgroundColor: 'grey' }}>música</InputTag>,
            <InputTag styles={{ backgroundColor: 'pink' }}>LGBTQ+</InputTag>,
            <InputTag styles={{ backgroundColor: 'blue' }}>fumanete</InputTag>,
            <InputTag styles={{ backgroundColor: 'blue' }}>fumanete</InputTag>,
            <InputTag styles={{ backgroundColor: 'blue' }}>fumanete</InputTag>,
          ]}
        </ScrollBox>
      </div>
    </>
  );
}

export default Profile;
