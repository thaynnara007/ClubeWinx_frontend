import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Navbar from '../components/navbar';
import EditRegister from '../components/form/editRegister';
import EditProfile from '../components/form/editProfile';
import PasswordRecoveryChange from '../components/form/passwordRecoveryChange'
import { 
  ENTER_PAGE_EDIT_PROFILE, 
  ENTER_PAGE_EDIT_REGISTER,
  ENTER_PAGE_EDIT_PASSWORD 
} from '../utils/constants'; 
import api from '../api';

function EditProfilePage() {
  const options = [ENTER_PAGE_EDIT_PASSWORD ,ENTER_PAGE_EDIT_PROFILE, ENTER_PAGE_EDIT_REGISTER];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_EDIT_PASSWORD);
  const [ userInfo, setUserInfo ] = useState({})
  const [ addressInfo, setAddressInfo ] = useState({})
  const [ profileInfo, setProfileInfo ] = useState({})

  const getAddress = () => {
    api.get('/address/me')
    .then( response => {
      const { data } = response 

      setAddressInfo(data)
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      toast.error(msg);
    });
  }

  const getProfile = () => {
    api.get('/profile/me')
    .then( response => {

      const { data } = response 
      const userData = {
        picture: data.picture,
        name: data.name,
        lastname: data.lastname,
        phoneNumber: data.phoneNumber,
        email: data.email,
        birthday: data.birthday,
        gender: data.gender,
        userId: data.userId,
      }
      const profileData = {
        profileId: data.id,
        socialMedia: data.socialMedia,
        description: data.description,
        pictureUrl: data.picture
      }

      setUserInfo(userData)
      setProfileInfo(profileData)
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      toast.error(msg);
    });
  }

  useEffect( () => {
    getAddress()
    getProfile()
  }, [])

  const onChangedEditProfile = () => {
    setClickedOption(ENTER_PAGE_EDIT_PROFILE);
  }

  const onChangedEditRegister = () => {
    setClickedOption(ENTER_PAGE_EDIT_REGISTER);
  }
  
  const onChangePassword = () => {
    setClickedOption(ENTER_PAGE_EDIT_PASSWORD )
  }
  
  let contentForm = clickedOption

  switch (clickedOption) {
    case ENTER_PAGE_EDIT_PROFILE:
      contentForm = <EditProfile profileInfo={profileInfo}/> ;
      break;
    case ENTER_PAGE_EDIT_REGISTER:
      contentForm = <EditRegister userInfo={userInfo} addressInfo={addressInfo}/>;
      break;
    case ENTER_PAGE_EDIT_PASSWORD :
      contentForm = <PasswordRecoveryChange />;
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar choosed={clickedOption} actions={[onChangePassword, onChangedEditProfile, onChangedEditRegister]}>
        {options}
      </Navbar>
      {contentForm}
    </>
  );
}

export default EditProfilePage;