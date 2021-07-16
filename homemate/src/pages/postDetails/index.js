/* eslint-disable react/no-array-index-key */

import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Tooltip } from '@material-ui/core';

import Text from '../../components/text';
import InputTag from '../../components/inputTag';
import ScrollBox from '../../components/scrollBox';
import IconPeople from '../../components/icons/iconPeople';
import FileUploader from '../../components/fileUploader';
import { getTagColor } from '../../utils/functions';
import IconDoor from '../../components/icons/iconDoor';
import IconBed from '../../components/icons/iconBed';
import IconBath from '../../components/icons/iconBath';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading';
import InfoSpan from '../../components/infoSpan';
import Picture from '../../components/picture';
import IconEdit from '../../components/icons/iconEdit';

import './postDetails.css';

const textStyle = {
  color: '#6983AA',
  fontWeight: 'bold',
};

const tagBoxStyle = {
  display: {
    gridRow: '4 / 7',
    gridColumn: '2',
    justifySelf: 'center',
    width: '80%',
    height: '80%',
    border: '2px solid #cbdae5',
    borderRadius: '8px',
  },
};

const commumDisplay = {
  width: '60%',
  height: '40%',
  marginBottom: '30px',
};

const scrollBoxPriceStyles = {
  display: {
    ...commumDisplay,
    marginTop: '20px',
    marginLeft: '20px',
    justifySelf: 'start',
    gridRow: '1',
    gridColumn: '1',
  },
  item: {
    maxWidth: '90%',
    maxHeight: '80%',
  },
};

const scrollBoxIconsStyles = {
  display: {
    width: 'fit-content',
    height: 'fit-content',
    margin: '40px auto',
    maxWidth: '90%',
    maxHeight: '30%',
  },
};

const scrollBoxDescriptionStyles = {
  display: {
    width: 'fit-content',
    height: 'fit-content',
    margin: '0px auto',
    maxWidth: '70%',
    maxHeight: '60%',
  },
  item: {
    width: '100%',
    height: '100%',
    color: '#6983AA',
    fontSize: '20px',
  },
};

function PostDetails() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });

  const { id } = useParams();

  const { data: post, isLoading } = useFetch(`/user/poster/${id}`);

  const history = useHistory();

  const goToProfile = () => {
    history.push(`/profile/${post?.owner.id}`);

    return true;
  };

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
          </div>

          <div style={{ position: 'absolute', left: '38%', top: '12%', zIndex: 3 }}>
            <div className="post-carousel">
              <Picture listPost={post?.posterPictures} />
            </div>
          </div>

          <div className="post-box">
            <ScrollBox styles={scrollBoxPriceStyles}>
              {[
                <span style={{ ...textStyle, fontSize: '34px' }}>{`R$ ${
                  post?.expense ?? ''
                }`}</span>,
              ]}
            </ScrollBox>

            <div className="post-edit-info-icon">
              <Tooltip title="editar informações">
                <button type="button" className="post-icon-button">
                  <IconEdit size="2x" />
                </button>
              </Tooltip>
            </div>

            <div className="post-title">
              <Text
                styles={{
                  ...textStyle,
                  fontSize: '34px',
                  textTransform: 'capitalize',
                }}
              >
                {`${post?.owner.address.street ?? ''},   
                ${post?.owner.address.number ?? ''}, 
                ${post?.owner.address.district ?? ''}, 
                ${post?.owner.address.city ?? ''}`}
              </Text>
              <div style={{ margin: '0 auto', width: 'fit-content', height: 'fit-content' }}>
                <Text styles={{ ...textStyle, fontSize: '28px' }}>
                  {`CEP: ${post?.owner.address.zipCode ?? ''}`}
                </Text>
              </div>
            </div>

            <div className="post-vl" />

            <div className="post-info-display">
              <ScrollBox styles={scrollBoxIconsStyles}>
                {[
                  <InfoSpan description="pessoas" amountText={post?.residents ?? ''}>
                    <IconPeople />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="quartos" amountText="2">
                    <IconDoor />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="camas" amountText="2">
                    <IconBed />
                  </InfoSpan>,
                  <div className="flip-card-back-vl" />,
                  <InfoSpan description="banheiros" amountText="1">
                    <IconBath />
                  </InfoSpan>,
                ]}
              </ScrollBox>

              <ScrollBox styles={scrollBoxDescriptionStyles}>{[post?.description ?? '']}</ScrollBox>
            </div>

            <div className="post-owner-profile-link">
              <a onClick={goToProfile} className="post-profile-link">{`Anunciado por ${
                post?.owner.name ?? ''
              } ${post?.owner.lastname ?? ''}`}</a>
            </div>

            <ScrollBox styles={tagBoxStyle}>
              {post?.tags
                ? post?.tags?.map((tag, index) => {
                    const tagColor = getTagColor(tag?.categoryId);

                    return (
                      <InputTag
                        styles={{ backgroundColor: `${tagColor}` }}
                        key={index}
                      >{`${tag?.name}`}</InputTag>
                    );
                  })
                : []}
            </ScrollBox>
          </div>
        </>
      )}
    </>
  );
}

export default PostDetails;
