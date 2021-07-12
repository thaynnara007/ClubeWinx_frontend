import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

import Text from '../../components/text';
import Button from '../../components/button';
import InputTag from '../../components/inputTag';
import ScrollBox from '../../components/scrollBox';
import IconPeople from '../../components/icons/iconPeople';
import FileUploader from '../../components/fileUploader';
import { getTagColor } from '../../utils/functions';

import IconDoor from '../../components/icons/iconDoor';
import IconBed from '../../components/icons/iconBed';
import IconBath from '../../components/icons/iconBath';

import './postDetails.css';

import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading';
import InfoSpan from '../../components/infoSpan';
import { useParams } from 'react-router-dom';
import Picture from '../../components/picture';

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

const commumDisplay = {
  width: 'fit-content',
  height: 'fit-content',
  marginBottom: '30px',
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

function PostDetails() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  const { id } = useParams();
  const { data: post, isLoading } = useFetch(`/user/poster/${id}`);
  const loadingStyle = { marginTop: '400px' };

  const history = useHistory();

  const handleHeaderUpload = (file) => {
    if (file) {
      const image = URL.createObjectURL(file);

      setHeaderBackground({ backgroundImage: `url('${image}')` });
    }
  };

  const posts = [
    {
      id: 1,
      post: 'https://dmhxz00kguanp.cloudfront.net/fotos/136023/quarto-infantil-estrelinha-rosa-291044.jpg',
    },
    {
      id: 2,
      post: 'https://images-americanas.b2w.io/produtos/01/00/img/84842/9/84842978_1GG.jpg',
    },
  ];

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
            <div className="Picture">
              <Picture listPost={posts} />
            </div>
          </div>
          <div className="post-box">
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
                {`${post?.owner.address.street ?? ''},   
                ${post?.owner.address.number ?? ''}, 
                ${post?.owner.address.district ?? ''}, 
                ${post?.owner.address.city ?? ''}`}
                {console.log(post)}
              </Text>
              <div style={{ margin: '0 auto', width: 'fit-content', height: 'fit-content' }}>
                <Button
                  styles={{ paddingTop: '4px', paddingBottom: '4px', margin: 0 }}
                  onClick={() => history.push(`/profile/${id}`)}
                >
                  VER PERFIL DO ANUNCIANTE
                </Button>
              </div>
            </div>
            <div className="post-vl" />
            <div className="post-info-display">
              <ScrollBox styles={scrollBoxPriceStyles}>
                {[<span className="flip-card-back-font">{`R$ ${post?.expense ?? ''},00`}</span>]}
              </ScrollBox>
              <ScrollBox styles={scrollBoxIconsStyles}>
                {[
                  <InfoSpan description="pessoas" amountText={post?.residents ?? ''}>
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
              <ScrollBox styles={scrollBoxDescriptionStyles}>{[post?.description ?? '']}</ScrollBox>
            </div>
            <ScrollBox styles={descriptionBoxStyle}>
            {post?.tags
                ? post?.tags?.map((tag) => {
                    const tagColor = getTagColor(tag?.categoryId);

                    return (
                      <InputTag
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

export default PostDetails;
