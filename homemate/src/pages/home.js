import React, { useState } from 'react';
import Navbar from '../components/navbar';
import {
  ENTER_PAGE_EXPLORE,
  ENTER_PAGE_ANNOUNCEMENTS,
  ENTER_PAGE_MYANNOUNCEMENT,
  ENTER_PAGE_MYPROFILE,
} from '../utils/constants';
import Announcements from './announcements';
import Logout from '../components/button/logoutButton'
import ProfileDisplay from '../components/show/profile'
import Explore from './explore';
import { useHistory } from 'react-router';

function HomePage() {
  const options = [
    ENTER_PAGE_ANNOUNCEMENTS,
    ENTER_PAGE_MYANNOUNCEMENT,
    ENTER_PAGE_MYPROFILE,
    ENTER_PAGE_EXPLORE,
    <Logout/>
  ];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_ANNOUNCEMENTS);
  const history = useHistory();

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
      contentForm = <Announcements />;
      break;
    case ENTER_PAGE_MYANNOUNCEMENT:
      contentForm = history.push('/myannouncement')
      break;
    case ENTER_PAGE_MYPROFILE:
      contentForm = <ProfileDisplay />;
      break;
    case ENTER_PAGE_EXPLORE:
      contentForm = <Explore />;
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar
        choosed={clickedOption}
        actions={[onChangeHome, onChangeMyAnnouncement, onChangeMyProfile, onChangeExplore]}
        logout={options.length - 1}
      >
        {options}
      </Navbar>
      {contentForm}
    </>
  );
}

export default HomePage;
