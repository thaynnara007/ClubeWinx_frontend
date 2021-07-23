import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import api from '../../api';
import ProfileCard from '../../components/profileCard';
import './explore.css';

function Explore() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingStyle = { marginTop: '400px' };

  function getProfiles() {
    setIsLoading(true);
    api
      .get('/profile')
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
    getProfiles();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading style={loadingStyle} />
      ) : (
        <div className="explore-container">
          {profiles &&
            profiles.length > 0 &&
            profiles.map((profile) => (
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
