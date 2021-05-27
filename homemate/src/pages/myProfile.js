import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api';
import ProfileDisplay from '../components/show/profile';

import {
  ENTER_PAGE_MYANNOUNCEMENTT,
  ENTER_PAGE_ADDANNOUNCEMENT,
  ENTER_PAGE_EDITANNOUNCEMENT,
  ENTER_PAGE_NEWANNOUNCEMENT,
  ENTER_PAGE_EXPLORE,
  ENTER_PAGE_ANNOUNCEMENTS,
  ENTER_PAGE_MYANNOUNCEMENT,
  ENTER_PAGE_MYPROFILE,
} from '../utils/constants';
import Navbar from '../components/navbar';
import Logout from '../components/button/logoutButton'
import { useHistory } from 'react-router';

function myProfile() {
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_MYPROFILE);
  const history = useHistory();

  const options = [
    ENTER_PAGE_MYANNOUNCEMENTT,
    ENTER_PAGE_ADDANNOUNCEMENT,
    ENTER_PAGE_EDITANNOUNCEMENT,
    ENTER_PAGE_NEWANNOUNCEMENT,
  ];

  const navBarOptions = [
    ENTER_PAGE_ANNOUNCEMENTS,
    ENTER_PAGE_MYANNOUNCEMENT,
    ENTER_PAGE_MYPROFILE,
    ENTER_PAGE_EXPLORE,
    <Logout/>
  ];

  const onChangeHome = () => {
    setClickedOption(ENTER_PAGE_ANNOUNCEMENTS);
  };

  const onChangeMyAnnouncement = () => {
    setClickedOption(ENTER_PAGE_MYANNOUNCEMENT);
  };

  const onChangeMyProfile = () => {
    setClickedOption(ENTER_PAGE_MYPROFILE);
  };

  const onChangeExplore = () => {
    setClickedOption(ENTER_PAGE_EXPLORE);
  };

  let contentForm = clickedOption;

  switch (clickedOption) {
    case ENTER_PAGE_ANNOUNCEMENTS:
      history.push('/homepage');
      break;
    case ENTER_PAGE_MYANNOUNCEMENT:
      history.push('/myannouncement');
      break;
    case ENTER_PAGE_MYPROFILE:
      contentForm = <myProfile />;
      break;
    case ENTER_PAGE_EXPLORE:
      history.push('/homepage');
      break;
    default:
      break;
  }


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

  return (
    <>
        <Navbar 
          choosed={ENTER_PAGE_MYPROFILE}
          actions={[onChangeHome, onChangeMyAnnouncement, onChangeMyProfile, onChangeExplore]}
          logout={options.length - 1} 
      >
        {navBarOptions}
      </Navbar>

      {profile && <ProfileDisplay profile={profile} />}
     
    </>
    );
}

export default myProfile;
