import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

import api from '../../api';
import Input from '../input';
import BaseButton from '../button';
import Autocomplete from '../autocomplete';

import Loading from '../loading';

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

  const [tags, setTags] = useState(new Set());
  const [tagsInit, setTagsInit] = useState(new Set());
  const [profileTag, setProfileTag] = useState([]);

  const addTagPerfilURL = '/profile/me/add/tags';
  const removeTagPerfilURL = '/profile/me/remove/tags';
  const createTag = '/profile//me/create/tags';

  useEffect(() => {
    function updateState() {
      setDescription(profile?.description);
      setSocialMedia(profile?.socialMedia);
      setProfileTag(profile.tags);
      console.log("edit", tags.size === 0)
      if (tags.size === 0) {
        let initSet = new Set();
        let initSetTags = new Set();
        profile && profile.tags && profile.tags !== undefined && profile.tags.map((tag) => initSet.add(tag.id) && initSetTags.add(tag.id));
        setTags(initSetTags);
        setTagsInit(initSet)
      }
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
      updateTags();
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

  const updateTags = () => {
    let addTag = [];
    let removeTag = [];

    tags.forEach((tag) => {
      if(!tagsInit.has(tag) && tag > 0) {
        addTag.push(tag);
      }
    })

    tagsInit.forEach((tag) => {
      if(!tags.has(tag)) {
        removeTag.push(tag);
      }
    })

    if(tags.has(-1)) {
      const createTags = profileTag.filter((tag) => tag.id < 0);
      create(createTags);
    }

    if(addTag.length > 0) {
      addTagP(addTag)
    }

    if(removeTag.length > 0) {
      removeTagsP(removeTag)
    }
  }

  function addTagP (tags) {
    console.log('add ',tags)
    if(tags.length > 0) {
      const body = {
        tags
      }
      api
      .post(addTagPerfilURL, body)
      .then((response) => {
        console.log("adicionou ",tags)
      })
      .catch((error) => {
        console.log('error'. error);
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed add';
      });
    }
  }

  async function removeTagP (tag) {
    tags.delete(tag);
    setProfileTag((prev) => prev.filter(e => e.id !== tag));
    console.log(tags)
    console.log(profileTag)

  }

  function removeTagsP (tags) {
    const body = {
      tags
    }
    api
    .put(removeTagPerfilURL, body)
    .then((response) => {
      console.log("removeu ",tags)
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
            console.log('criou ', body);
            toast('Tags criadas com sucesso');
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

          <Autocomplete profileTag={profileTag} setProfileTag={setProfileTag} deleteTag={removeTagP} creatTag={true} tags={tags} setTags={setTags} />
          <BaseButton onClick={editProfile} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
