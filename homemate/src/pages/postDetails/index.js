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
import FileUploader from '../../components/fileUploader';

import IconDoor from '../../components/icons/iconDoor';
import IconBed from '../../components/icons/iconBed';
import IconBath from '../../components/icons/iconBath';

import './postDetails.css';

import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading';
import InfoSpan from '../../components/infoSpan';
import { Link, useParams } from 'react-router-dom';

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
    height: 'fit-content',
  },
};

const commumDisplay = {
  width: 'fit-content',
  height: 'fit-content',
  marginBottom: '10px',
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
    marginLeft: '80px',
    marginRight: '20px',
    gridRow: '1',
    gridColumn: '1 / 5',
    alignSelf: 'end',
    maxWidth: '460px',
    maxHeight: '460px',
  },
};

const scrollBoxDescriptionStyles = {
  display: {
    marginLeft: '80px',
    marginRight: '20px',
    gridRow: '2',
    gridColumn: '1 / 5',
    alignSelf: 'center',
    width: '460px',
    height: '170px',
  },
  item: {
    width: '100%',
    height: '100%',
    color: 'grey',
  },
};

const textExample = `And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.`;

function PostDetails() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  const { id } = useParams();
  const { data: post, isLoading } = useFetch(`/user/poster/${id}`);
  const loadingStyle = { marginTop: '400px' };

  const styles = useStyles();
  //post-details

  const handleHeaderUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);

      setHeaderBackground({ backgroundImage: `url('${image}')` });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="post-header" style={{ ...headerBackground }}>
            <div style={{ position: 'absolute', right: '5%', top: '16%' }}>
              <FileUploader handleUpload={handleHeaderUpload}>EDITAR</FileUploader>
            </div>

            <div style={{ position: 'absolute', left: '50%', top: '13%', zIndex: 3 }}>
              <Avatar className={styles.avatar}>MD</Avatar>
              <div style={{ marginLeft: '60px' }}>
                <Tooltip title="mudar foto">
                  <button type="button" className="post-icon-button">
                    <IconEdit styles={{ zIndex: 4, color: '#6983AA' }} />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="post-box">
            <div className="post-edit-info-icon">
              <Tooltip title="editar informações">
                <button type="button" className="post-icon-button">
                  <IconProfileEdit size="2x" />
                </button>
              </Tooltip>
            </div>

            <div className="post-title">
              <Text
                styles={{
                  fontSize: '36px',
                  color: '#6983AA',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {console.log(post)}
              </Text>
              <div style={{ margin: '0 auto', width: 'fit-content', height: 'fit-content' }}>
                <Button
                  styles={{ paddingTop: '4px', paddingBottom: '4px', margin: 0 }}
                  onClick={() => history.push(`/profile/id`)}
                >
                  VER PERFIL DO ANUNCIANTE
                </Button>
              </div>
            </div>

            <div className="post-vl" />

            <div className="post-info-display">
              <ScrollBox styles={scrollBoxPriceStyles}>
                {[<span className="flip-card-back-font">{`R$ 100,00`}</span>]}
              </ScrollBox>
              <ScrollBox styles={scrollBoxIconsStyles}>
                {[
                  <InfoSpan description="pessoas" amountText={'4'}>
                    <IconPeople />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="quartos" amountText={'2'}>
                    <IconDoor />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="camas" amountText={'2'}>
                    <IconBed />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="banheiros" amountText={'1'}>
                    <IconBath />
                  </InfoSpan>,
                ]}
              </ScrollBox>
              <ScrollBox styles={scrollBoxDescriptionStyles}>{[textExample]}</ScrollBox>
            </div>
            <ScrollBox styles={descriptionBoxStyle}>
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
      )}
    </>
  );
}

export default PostDetails;
