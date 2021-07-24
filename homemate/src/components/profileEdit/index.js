import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Autocomplete from '../autocomplete';
import InputTag from '../inputTag';
import ScrollBox from '../scrollBox';

import Loading from '../loading';
import { getTagColor } from '../../utils/functions';

const stylesInvalid = {
  label: {
    color: 'red',
  },
};

const stylesValid = {
  label: {
    color: '#F4F4F4',
  },
};


const tagsBoxStyle = {
  display: {
    gridColumn: '1 / 3',
    gridRow: '5 / 7',
    width: '100%',
    height: '100%',
    border: '2px solid #cbdae5',
    borderRadius: '8px',
    justifySelf: 'center',
    marginTop: '40px',
  },
  item: {
    height: 'fit-content',
  },
};

function ProfileEdit({ profile }) {
  const [description, setDescription] = useState(profile?.description ?? '');
  const [problemDescription, setProblemDescription] = useState({});
  const [socialMedia, setSocialMedia] = useState(profile?.socialMedia ?? '');
  const [problemSocialMedia, setProblemSocialMedia] = useState({});
  const [loading, setLoading] = useState(false);

  const [tagsElement, setTagsElement] = useState([]);
  const [profileTag, setProfileTag] = useState([]);
  const addTagPerfilURL = '/profile/me/add/tags';
  const removeTagPerfilURL = '/profile/me/remove/tags';
  const createTag = '/profile//me/create/tags';

  useEffect(() => {
    function updateState() {
      setDescription(profile?.description);
      setSocialMedia(profile?.socialMedia);
    }

    updateState();
  }, [profile]);

  const history = useHistory();

  const validateDescription = () => {
    const validation = description === '' || description === null;
    setProblemDescription(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateSocialMedia = () => {
    const validation = socialMedia === '' || socialMedia === null;
    setProblemSocialMedia(validation ? stylesInvalid : stylesValid);

    return !validation;
  };

  const validateInfo = () => validateDescription() || validateSocialMedia();

  const editProfile = () => {
    const validated = validateInfo();

    if (validated) {
      addTagP();
      const body = {
        description,
        socialMedia,
      };
      api
        .put(`/profile/me`, body)
        .then(() => {
          toast('Informações atualizadas com sucesso');
          setLoading(false);
          history.push('/profile/me');
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          setLoading(false);
          toast.error(msg);
        });
    }
  };

  const addTagP = () => {
    console.log("addTagas");
    const add = tagsElement.filter((tag) => tag.id !== -1);
    const createTags = tagsElement.filter((tag) => tag.id === -1);
    create(createTags);
    const tags = add.map((tag) => tag.id);
    console.log("tagas q vao ser adicionadas no perfil ",tags);
    const body = {
      tags
    }
    api
    .post(addTagPerfilURL, body)
    .then((response) => {
      setProfileTag(response.data.tags);
      // attPtags();
    })
    .catch((error) => {
      console.log('error'. error);
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed add';
    });
  }

  function removeTagsP (tagId) {
    const tags = [tagId];
    const body = {
      tags
    }
    api
    .put(removeTagPerfilURL, body)
    .then((response) => {
      setProfileTag(response.data.tags);
      console.log(profileTag)
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed remove';
    });
  }

  const create = (tags) => {
    if (tags && tags.length > 0) {
      tags.forEach(element => {
        console.log(element)
        const body = {
          'tags': [
            {
              'categoryId': element.categoryId,
              'name': element.name
            }
          ]
        };
        api 
          .post(createTag, body)
          .then((response) => {
            console.log(response)
            setMyTags(response.data.tags);
            setMyTagsList(response.data.tags);
            toast('Anúncio criado com su  cesso');
            toast('Edite seu anúncio: adicione algumas tags!');
            setFlag(true);
            setStateAnnouncement(ENTER_PAGE_MYANNOUNCEMENTT)
          })
          .catch((error) => {
            let msg = '';
            if (error.response) msg = error.response.data.error;
            else msg = 'Network failed';
            toast.error(msg);
          });
        
      });
    }
  }

  return (
    <>
      {loading ? (
        <div style={{ marginTop: '400px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input
            name="DESCRIÇÃO"
            value={description}
            onChange={setDescription}
            styles={problemDescription}
          />
          <Input
            name="LINK DE REDE SOCIAL"
            value={socialMedia}
            onChange={setSocialMedia}
            styles={problemSocialMedia}
          />
        {
          profileTag && profileTag.length > 0 && profileTag.map(x => {
            const tagColor = getTagColor(x.categoryId);
            return(
            <InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
          })
        }
          <Autocomplete creatTag={true} tags={tagsElement} setTags={setTagsElement} />
          <BaseButton onClick={editProfile} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
          <ScrollBox styles={tagsBoxStyle}>
              {profile?.tags
                ? profile?.tags?.map((tag, index) => {
                    const tagColor = getTagColor(tag?.categoryId);
                    return (
                      <InputTag
                        key={index}
                        styles={{ backgroundColor: `${tagColor}` }}
                      >{`${tag?.name}`}</InputTag>
                    );
                  })
                : []}
                {tagsElement
                ? tagsElement?.map((tag, index) => {
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

        </>
      )}
    </>
  );
}

export default ProfileEdit;
