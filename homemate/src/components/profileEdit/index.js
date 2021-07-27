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

function ProfileEdit({ profile }) {
  const [description, setDescription] = useState(profile?.description ?? '');
  const [problemDescription, setProblemDescription] = useState({});
  const [socialMedia, setSocialMedia] = useState(profile?.socialMedia ?? '');
  const [problemSocialMedia, setProblemSocialMedia] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [tagsSet, setTagsSet] = useState(new Set());
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
      if (tagsSet.size === 0) {
        const initSet = new Set();
        const initSetTags = new Set();
        if (profile && profile.tags) {
          profile.tags.forEach((tag) => initSet.add(tag.id) && initSetTags.add(tag.id));
        }
        setTagsSet(initSetTags);
        setTagsInit(initSet);
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

  function addTagP(tagsAdd) {
    setLoadingAdd(true);
    const tags = Array.from(tagsAdd);
    const body = {
      tags,
    };
    api
      .post(addTagPerfilURL, body)
      .then(() => {
        setLoadingAdd(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed add tags';
        toast.error(msg);
        setLoadingAdd(false);
      });
  }

  function removeTagP(tag) {
    tagsSet.delete(tag);
    setProfileTag((prev) => prev.filter((e) => e.id !== tag));
  }

  function removeTagsP(tagsRemove) {
    setLoadingDelete(true);
    const tags = Array.from(tagsRemove);
    const body = {
      tags,
    };
    api
      .put(removeTagPerfilURL, body)
      .then(() => {
        setLoadingDelete(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed remove tags';
        toast.error(msg);
        setLoadingDelete(false);
      });
  }

  const create = (tags) => {
    setLoadingCreate(true);
    if (tags && tags.length > 0) {
      tags.forEach((element) => {
        const body = {
          tags: [
            {
              categoryId: element.categoryId,
              name: element.name,
            },
          ],
        };
        api
          .post(createTag, body)
          .then(() => {
            toast('Tags criadas com sucesso');
            setLoadingCreate(false);
          })
          .catch((error) => {
            let msg = '';
            if (error.response) msg = error.response.data.error;
            else msg = 'Network failed';
            toast.error(msg);
            setLoadingCreate(false);
          });
      });
    }
  };

  const updateTags = () => {
    const addTag = new Set([...tagsSet].filter((i) => !tagsInit.has(i) && i > 0));
    const removeTag = new Set([...tagsInit].filter((i) => !tagsSet.has(i)));

    // tags.forEach((tag) => {
    //   if(!tagsInit.has(tag) && tag > 0) {
    //     addTag.push(tag);
    //   }
    // })

    // tagsInit.forEach((tag) => {
    //   if(!tags.has(tag)) {
    //     removeTag.push(tag);
    //   }
    // })

    if (tagsSet.has(-1)) {
      const createTags = profileTag.filter((tag) => tag.id < 0);
      create(createTags);
    }

    if (addTag.size > 0) {
      addTagP(addTag);
    }

    if (removeTag.size > 0) {
      removeTagsP(removeTag);
    }
  };

  const editProfile = () => {
    const validated = validateInfo();

    if (validated) {
      setLoading(true);
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

  return (
    <>
      {loading || loadingCreate || loadingAdd || loadingDelete ? (
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

          <Autocomplete
            profileTag={profileTag}
            setProfileTag={setProfileTag}
            deleteTag={removeTagP}
            creatTag={true}
            tags={tagsSet}
            setTags={setTagsSet}
          />
          <BaseButton onClick={editProfile} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
