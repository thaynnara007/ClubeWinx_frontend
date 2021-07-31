/* eslint-disable react/jsx-boolean-value */

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';
import Input from '../input';
import AddTag from '../addTag';

function ProfileEdit({ profile }) {
  const [description, setDescription] = useState(profile?.description ?? '');
  const [problemDescription] = useState({});
  const [socialMedia, setSocialMedia] = useState(profile?.socialMedia ?? '');
  const [problemSocialMedia] = useState({});

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

  const editProfile = () => {
    const body = {
      description,
      socialMedia,
    };

    api
      .put(`/profile/me`, body)
      .then(() => {})
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
  };

  return (
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
      <AddTag
        data={profile}
        execute={editProfile}
        addTagUrl={addTagPerfilURL}
        removeTagUrl={removeTagPerfilURL}
        createTagUrl={createTag}
        backUrl="/profile/me"
      />
    </>
  );
}

export default ProfileEdit;
