import ListDisplay from '../components/show/my';
import { ENTER_PAGE_PROFILE, ENTER_PAGE_PROFILELIST } from '../utils/constants';
import BasicForm from '../components/form/BasicForm';
import api from '../api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ProfileDisplay from '../components/show/profile';
import Filter from '../components/filter';

function Explore() {
  const [profiles, setProfiles] = useState([]);
  const options = [ENTER_PAGE_PROFILE, ENTER_PAGE_PROFILELIST];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_PROFILELIST);
  const [clickedProfileId, setClickedProfileId] = useState(null);
  const [filterList, setFilterList] = useState([]);

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

  const filterProfiles = () => {
    // let param = filterList.length > 0 || page || pageSize ? "?" : "";
    let param =  filterList.length > 0  ? "?" : "";
    // if(page) { param= param + "page=" + page };
    // if(pageSize) {  param = page ? param + "&pageSize=" + pageSize :  param + "pageSize=" + pageSize };
    if(filterList.length > 0) {
      let tags = "";
      filterList.forEach(tagId => {
        tags = tags + "&tags[]=" + tagId;
        // param = param + "&tags[]=" + tagId;
      });
      param = param + tags.substring(1);
    };

    if( !param ) {
      getProfiles();
    } else {
      api
      .get('/profile/'+ param)
      .then((response) => {
        setProfiles(response.data)
        // setAnnouncements(response.data.rows)
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
    }

  }

  switch(clickedOption){
    case ENTER_PAGE_PROFILELIST:
      contentForm = (
        <>
        <div style={{ marginTop: '150px' }} />
        <BasicForm>
        <Filter filterList={filterList} clickFilter={filterProfiles} setFilterList={setFilterList}></Filter>
        {profiles &&
          profiles.map((profile) => (
            <ListDisplay
              key={profile.user.id}
              title={profile.user.name}
              imageUrl={profile.picture ? profile.picture.pictureUrl : ''}
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
