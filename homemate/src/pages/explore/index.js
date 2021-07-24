import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import api from '../../api';
import ProfileCard from '../../components/profileCard';
import './explore.css';

function Explore() {
  const [myProfile, setMyProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingStyle = { marginTop: '400px' };

  function getMyProfile() {
    api
      .get('/user/me')
      .then((response) => {
        setMyProfile(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        toast.error(msg);
      });
  }

  function getProfiles() {
    setIsLoading(true);
    api
      .get('/profile/recomendation')
      .then((response) => {
        setProfiles(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setIsLoading(false);
        toast.error(msg);
      });
  }

  useEffect(() => {
    getMyProfile();
    getProfiles();
  }, []);

  function itsNotMyProfile(profile) {
    return profile.id !== myProfile.id;
  }

  const recommendedProfiles = profiles.filter(itsNotMyProfile);

  return (
    <>
      {isLoading ? (
        <Loading style={loadingStyle} />
      ) : (
        <div className="explore-container">
          {recommendedProfiles &&
            recommendedProfiles.length > 0 &&
            recommendedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                id={profile.id}
                name={profile.user.name}
                description={profile.description}
                tags={Array.isArray(profile.tags) && profile.tags.length > 0 ? profile.tags : ''}
                city={
                  profile.user ? (profile.user.address.city ? profile.user.address.city : '') : ''
                }
                state={
                  profile.user ? (profile.user.address.state ? profile.user.address.state : '') : ''
                }
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Explore;
