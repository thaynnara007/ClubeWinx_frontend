import ListDisplay from '../components/show/my';
import { ENTER_PAGE_PROFILE, ENTER_PAGE_PROFILELIST } from '../utils/constants';
import BasicForm from '../components/form/BasicForm';
import api from '../api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ProfileDisplay from '../components/show/profile';

function Explore() {
  const [profiles, setProfiles] = useState(null);
  const options = [ENTER_PAGE_PROFILE, ENTER_PAGE_PROFILELIST];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_PROFILELIST);
  const [clickedProfileId, setClickedProfileId] = useState(null);

  let contentForm = null;

  const localContext = 'Nome';

  const getProfiles = () => {
    api
      .get('/profile/recomendation')
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
  };

  const onClickedProfile = (id) => {
    setClickedProfileId(id)
    setClickedOption(ENTER_PAGE_PROFILE)
  }

  useEffect(() => {
    getProfiles();
  }, []);

  switch(clickedOption){
    case ENTER_PAGE_PROFILELIST:
      contentForm = (
        <>
        <div style={{ marginTop: '150px' }} />
        <BasicForm>
        {profiles &&
          profiles.map((profile) => (
            <ListDisplay
              key={profile.user.id}
              title={profile.user.name}
              imageUrl={profile.picture.pictureUrl}
              city={profile.user.address.city}
              state={profile.user.address.state}
              tags={profile.tags}
              use={localContext}
              id={profile.user.id}      
              onClickedAnnouncement={onClickedProfile}        
            />
        ))}
        </BasicForm>
      </>
      )
      break;
    case ENTER_PAGE_PROFILE:
      contentForm = (
        <>
          {profiles &&
            profiles.map((profile) => (
              profile.id == clickedProfileId ? 
              <ProfileDisplay key={profile.id} id={profile.id} my={false}/> : <> </>
            ))
          }
        </>
      )
      break;
    default:
      break;
  }

  return (
   <>
    {contentForm}
   </>
  );
}

export default Explore;
