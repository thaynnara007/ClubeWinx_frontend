/* eslint-disable react/no-array-index-key */

import moment from 'moment';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { makeStyles, Avatar, Tooltip } from '@material-ui/core';

import api from '../../api';
import Text from '../../components/text';
import useFetch from '../../hooks/useFetch';
import Button from '../../components/button';
import Loading from '../../components/loading';
import InputTag from '../../components/inputTag';
import ScrollBox from '../../components/scrollBox';
import { DATE_FORMAT } from '../../utils/constants';
import { getTagColor } from '../../utils/functions';
import IconEdit from '../../components/icons/iconEdit';
import FileUploader from '../../components/fileUploader';
import IconPhone from '../../components/icons/iconPhone';
import IconEmail from '../../components/icons/iconEmail';
import IconPeople from '../../components/icons/iconPeople';
import IconAddress from '../../components/icons/iconAddress';
import IconProfileEdit from '../../components/icons/iconEditProfile';
import IconInstagram from '../../components/icons/iconInstagram';
import IconFacebook from '../../components/icons/iconFacebook';
import IconTwitter from '../../components/icons/iconTwitter';

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
  },
};

const tagsBoxStyle = {
  display: {
    gridColumn: '1 / 3',
    gridRow: '5 / 7',
    width: '70%',
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

function Profile() {
  const { id } = useParams();

  //const { data: userData, isLoading } = useFetch(`/profile/${id}`, id);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [avatarImage, setAvatarImage] = useState(userData?.picture);

  const history = useHistory();
  const styles = useStyles();

  const handleHeaderUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);

      setHeaderBackground({ backgroundImage: `url('${image}')` });
    }
  };

  const handleAvatarUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      formData.append('file', file);
      setAvatarImage(image);

      api
        .put('/profile/me/picture', formData, config)
        .then(() => {
          toast('Foto atualizada com sucesso');
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
    }
  };

  const seePost = () => history.push(`/posts/${id === 'me' ? 'my' : userData?.posterId}`);
  const createPost = () => history.push(`/createPost`);

  const getAge = (birthday) => {
    if (birthday) {
      const bDay = moment(birthday, DATE_FORMAT);

      return moment().diff(bDay, 'years');
    }
    return '';
  };

  function open() {
    window.location.href = userData?.socialMedia;
  }

  function socialMedia() {
    let social = null;

    if ((userData?.socialMedia).includes('instagram')) {
      social = (
        <Tooltip title="instagram">
          <button onClick={open} className="profile-icon-button">
            <IconInstagram size="3x" />
          </button>
        </Tooltip>
      );
    } else if ((userData?.socialMedia).includes('facebook')) {
      social = (
        <Tooltip title="facebook">
          <button onClick={open} className="profile-icon-button">
            <IconFacebook size="3x" />
          </button>
        </Tooltip>
      );
    } else if ((userData?.socialMedia).includes('twitter')) {
      social = (
        <Tooltip title="twitter">
          <button onClick={open} className="profile-icon-button">
            <IconTwitter size="3x" />
          </button>
        </Tooltip>
      );
    }
    return social;
  }

  useEffect(() => {
    console.log(userData?.socialMedia);
    api
      .get(`/profile/${id}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("aaa");
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setIsLoading(false);
        toast.error(msg);
      });
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="profile-header" style={{ ...headerBackground }}>
            {id === 'me' && (
              <div style={{ position: 'absolute', right: '5%', top: '16%' }}>
                <FileUploader handleUpload={handleHeaderUpload}>EDITAR</FileUploader>
              </div>
            )}

            <div style={{ position: 'absolute', left: '50%', top: '13%', zIndex: 3 }}>
              <Avatar className={styles.avatar} src={avatarImage ?? userData?.picture}>
                {`${userData?.name[0]}${userData?.lastname[0]}`}
              </Avatar>
              {id === 'me' && (
                <div style={{ marginLeft: '60px' }}>
                  <Tooltip title="mudar foto">
                    <div style={{ width: 'fit-content' }}>
                      <FileUploader icon handleUpload={handleAvatarUpload}>
                        <IconEdit styles={{ zIndex: 4, color: '#6983AA' }} />
                      </FileUploader>
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          <div className="profile-box">
            <div className="profile-socialmedia-icons">{socialMedia()}</div>
            {id === 'me' && (
              <div className="profile-edit-info-icon">
                <Tooltip title="editar informações">
                  <button
                    onClick={() => history.push(`/editProfile`)}
                    type="button"
                    className="profile-icon-button"
                  >
                    <IconProfileEdit size="2x" />
                  </button>
                </Tooltip>
              </div>
            )}

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
                {`${userData?.name} ${userData?.lastname}`}
              </Text>
              <div style={{ margin: '0 auto', width: 'fit-content', height: 'fit-content' }}>
                {userData?.posterId ? (
                  <Button
                    styles={{ paddingTop: '4px', paddingBottom: '4px', margin: 0 }}
                    onClick={seePost}
                  >
                    VER ANÚNCIO
                  </Button>
                ) : (
                  id === 'me' && (
                    <Button
                      styles={{ paddingTop: '4px', paddingBottom: '4px', margin: 0 }}
                      onClick={createPost}
                    >
                      CRIAR ANÚNCIO
                    </Button>
                  )
                )}
              </div>
            </div>

            <div className="profile-vl" />

            <div className="profile-info-display">
              <div style={iconStyle}>
                <IconPeople size="2x" />
              </div>
              <Text styles={infoTextStyle}>{`${getAge(userData?.birthday)} anos, ${
                userData?.gender ?? ''
              }`}</Text>

              <div style={iconStyle}>
                <IconEmail size="2x" />
              </div>
              <Text styles={infoTextStyle}>{`${userData?.email}`}</Text>

              <div style={iconStyle}>
                <IconPhone size="2x" />
              </div>
              <Text styles={infoTextStyle}>{`${userData?.phone ?? ''}`}</Text>

              <div style={iconStyle}>
                <IconAddress size="2x" />
              </div>
              <Text styles={infoTextStyle}>{`${userData?.address?.state ?? ''}, ${
                userData?.address?.city ?? ''
              }`}</Text>
            </div>

            <ScrollBox styles={descriptionBoxStyle}>
              {[<p className="profile-description-text">{`${userData?.description ?? ''}`}</p>]}
            </ScrollBox>

            <ScrollBox styles={tagsBoxStyle}>
              {userData?.tags
                ? userData?.tags?.map((tag, index) => {
                    const tagColor = getTagColor(tag?.categoryId);

                    return (
                      <InputTag
                        key={index}
                        styles={{ backgroundColor: `${tagColor}` }}
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

export default Profile;
