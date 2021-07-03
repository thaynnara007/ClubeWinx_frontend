/* eslint-disable react/button-has-type */
import React from 'react';

import ScrollBox from '../../scrollBox';
import IconPeople from '../../icons/iconPeople';
import IconDoor from '../../icons/iconDoor';
import IconBed from '../../icons/iconBed';
import IconBath from '../../icons/iconBath';
import InfoSpan from '../../infoSpan';

import './flipCardBack.css';

const commumDisplay = {
  width: 'fit-content',
  height: 'fit-content',
  marginBottom: '10px',
};

const scrollBoxAddressStyles = {
  display: {
    ...commumDisplay,
    marginTop: '20px',
    marginLeft: '20px',
    justifySelf: 'start',
    gridRow: '1',
    gridColumn: '1 / 4',
  },
  item: {
    maxWidth: '320px',
    maxHeight: '50px',
  },
};

const scrollBoxPriceStyles = {
  display: {
    ...commumDisplay,
    marginTop: '20px',
    marginRight: '20px',
    justifySelf: 'end',
    gridRow: '1',
    gridColumn: '4',
  },
  item: {
    maxWidth: '140px',
    maxHeight: '50px',
  },
};

const scrollBoxIconsStyles = {
  display: {
    ...commumDisplay,
    marginLeft: '20px',
    marginRight: '20px',
    gridRow: '1',
    gridColumn: '1 / 5',
    alignSelf: 'end',
    maxWidth: '460px',
    maxHeight: '60px',
  },
};

const scrollBoxDescriptionStyles = {
  display: {
    marginLeft: '20px',
    marginRight: '20px',
    gridRow: '2',
    gridColumn: '1 / 5',
    alignSelf: 'center',
    width: '460px',
    height: '130px',
  },
  item: {
    width: '100%',
    height: '100%',
    color: 'grey',
  },
};

function FlipCardBack({
  flip,
  address,
  price,
  people,
  rooms,
  beds,
  bathrooms,
  description,
  backButton = 'voltar',
  seePageButton = 'ver página',
}) {
  return (
    <div className="flip-card-back-card">
      <div className="flip-card-back-content">
        <ScrollBox styles={scrollBoxAddressStyles}>
          {[
            <p className="flip-card-back-font" style={{ marginBottom: '10px' }}>
              {address}
            </p>,
          ]}
        </ScrollBox>
        <ScrollBox styles={scrollBoxPriceStyles}>
          {[<span className="flip-card-back-font">{`${price ?? ''}R$`}</span>]}
        </ScrollBox>
        <ScrollBox styles={scrollBoxIconsStyles}>
          {[
            <InfoSpan description="pessoas" amountText={people}>
              <IconPeople />
            </InfoSpan>,
            <div className="flip-card-back-vl" />,
            <InfoSpan description="quartos" amountText={rooms}>
              <IconDoor />
            </InfoSpan>,
            <div className="flip-card-back-vl" />,
            <InfoSpan description="camas" amountText={beds}>
              <IconBed />
            </InfoSpan>,
            <div className="flip-card-back-vl" />,
            <InfoSpan description="banheiros" amountText={bathrooms}>
              <IconBath />
            </InfoSpan>,
          ]}
        </ScrollBox>
        <ScrollBox styles={scrollBoxDescriptionStyles}>{[description]}</ScrollBox>
        <div className="flip-card-back-buttons">
          <button className="flip-card-back-button flip-card-back-button-back" onClick={flip}>
            {backButton}
          </button>
          <button className="flip-card-back-button flip-card-back-button-see-page">
            {seePageButton}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlipCardBack;
