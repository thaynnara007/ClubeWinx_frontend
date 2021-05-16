import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api';
import ProfileDisplay from '../components/show/profile';

function myProfile() {
  const [profile, setProfile] = useState(null);

  const getProfile = () => {
    api
      .get('/profile/me')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        toast.error(msg);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <div>{profile && <ProfileDisplay profile={profile} />}</div>;
}

export default myProfile;
