import React, { useState } from 'react';
import Navbar from '../components/navbar';
import {
  ENTER_PAGE_EXPLORE,
  ENTER_PAGE_ANNOUNCEMENTS,
  ENTER_PAGE_MYANNOUNCEMENT,
  ENTER_PAGE_MYPROFILE,
} from '../utils/constants';
import Announcements from './announcements';
import MyAnnouncemente from './myAnnouncement';
import Profile from './profile';
import Explore from './explore';

function HomePage() {
  const options = [
    ENTER_PAGE_ANNOUNCEMENTS,
    ENTER_PAGE_MYANNOUNCEMENT,
    ENTER_PAGE_MYPROFILE,
    ENTER_PAGE_EXPLORE,
  ];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_ANNOUNCEMENTS);

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
      contentForm = <MyAnnouncemente />;
      break;
    case ENTER_PAGE_MYPROFILE:
      contentForm = <Profile />;
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
      >
        {options}
      </Navbar>
      {contentForm}
    </>
  );
}

export default HomePage;
