import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import AnnouncementDisplay from '../components/show/announcement';
import Announcement from '../components/announcement';
import BaseButton from '../components/button/baseButton';
import BasicForm from '../components/form/BasicForm';
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


function MyAnnouncement() {
  const options = [
    ENTER_PAGE_MYANNOUNCEMENTT,
    ENTER_PAGE_ADDANNOUNCEMENT,
    ENTER_PAGE_EDITANNOUNCEMENT,
    ENTER_PAGE_NEWANNOUNCEMENT,
  ];
  const [announcement, setAnnouncement] = useState(null);
  const [ state, setState ] = useState('')
  const [flag, setFlag] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const [flag3, setFlag3] = useState(false)
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_MYANNOUNCEMENTT);
  const history = useHistory();

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
      contentForm = <MyAnnouncement />;
      break;
    case ENTER_PAGE_MYPROFILE:
      history.push('/homepage');
      break;
    case ENTER_PAGE_EXPLORE:
      history.push('/homepage');
      break;
    default:
      break;
  }

  const getAnnouncement = () => {

    api
      .get('/user/poster/my')
      .then((response) => {

        setAnnouncement(response.data);
        setState(ENTER_PAGE_MYANNOUNCEMENTT);
      })
      .catch((error) => {

        if (error.response) {
          const { status } = error.response;

          if (status === 404) setState(ENTER_PAGE_ADDANNOUNCEMENT);
          else toast.error(error.response.data.error);
        }
        else toast.error('Network failed');
        
      });
      
  };

  const onClickInserir = () => {
    setState((previos) => ENTER_PAGE_NEWANNOUNCEMENT);
  };

  const onClickEdit = () => {
    setState(ENTER_PAGE_EDITANNOUNCEMENT);
  };

  const handleDeleteImage = (id) => {
    api
      .delete(`/user/poster/me/picture/${id}`)
      .then(() => {
        const updatedAnnouncement = announcement;
        updatedAnnouncement.posterPictures = announcement.posterPictures.filter((picture) => {
          return picture.id != id;
        });
        setAnnouncement(updatedAnnouncement);
        setState(ENTER_PAGE_MYANNOUNCEMENTT);
        window.location.replace('/myannouncement')
      })
      .catch((error) => {
  
        if (error.response) {
          const { status } = error.response;
  
          if (status === 404) setState(ENTER_PAGE_ADDANNOUNCEMENT);
          else toast.error(error.response.data.error);
        }
        
      });
  }

  const onClickDelete = () => {
    api
      .delete(`/user/poster/my`)
      .then((response) => {
        toast('Anúncio excluido com sucesso!');
        setAnnouncement(response.data);
        setState(ENTER_PAGE_ADDANNOUNCEMENT);
      })
      .catch((error) => {

        if (error.response) {
          const { status } = error.response;
        }
        
      });
  }

  useEffect(() => {
    getAnnouncement();
  }, [flag]);

  useEffect(() => {
    getAnnouncement();
  }, [flag2]);

  useEffect(() => {
    getAnnouncement();
  }, [flag3]);

  switch (state) {
    case ENTER_PAGE_MYANNOUNCEMENTT:
      contentForm =
        <AnnouncementDisplay 
            announcement={announcement} 
            onClickEdit={onClickEdit} 
            onClickDelete={onClickDelete} 
            isMyAnnouncement={true}
            handleDeleteImage={handleDeleteImage}
          />
      
      break;
    case ENTER_PAGE_ADDANNOUNCEMENT:
      contentForm = (
        <BasicForm>
          <div style={{ marginTop: '150px' }}>
            <BaseButton onClick={onClickInserir}>INSERIR</BaseButton>
          </div>
        </BasicForm>
      );
      break;
    case ENTER_PAGE_NEWANNOUNCEMENT:
      contentForm = (
        <Announcement 
          announcementExists={false} 
          typeButton={ENTER_PAGE_NEWANNOUNCEMENT} 
          setStateAnnouncement={setState} 
          setFlag={setFlag} 
        />);
      break;
    case ENTER_PAGE_EDITANNOUNCEMENT:
      contentForm = (
        <Announcement 
          announcement={announcement} 
          announcementExists={true} 
          typeButton={ENTER_PAGE_EDITANNOUNCEMENT} 
          setStateAnnouncement={setState} 
          setFlag2={setFlag2} 
          setFlag3={setFlag3}
        />);
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar 
          choosed={ENTER_PAGE_MYANNOUNCEMENTT}
          actions={[onChangeHome, onChangeMyAnnouncement, onChangeMyProfile, onChangeExplore]}
          logout={options.length - 1} 
      >
        {navBarOptions}
      </Navbar>
      {contentForm}
    </>
  );
}

export default MyAnnouncement;
