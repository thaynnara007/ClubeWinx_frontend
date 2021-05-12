import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import ListDisplay from '../components/show/my';
import BasicForm from '../components/form/BasicForm';
import { ENTER_PAGE_ANNOUNCEMENT, ENTER_PAGE_ANNOUNCEMENTLIST } from '../utils/constants';
import AnnouncementDisplay from '../components/show/announcement';


function Announcements() {
  const [announcements, setAnnouncements] = useState(null);
  const options = [ENTER_PAGE_ANNOUNCEMENT, ENTER_PAGE_ANNOUNCEMENTLIST];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_ANNOUNCEMENTLIST);
  const [clickedAnnouncementId, setClickedAnnouncementId] = useState(null);

  let contentForm = null;
  

  const localContext = 'Aluguel';

  const getAnnouncements = () => {
    api
      .get('/user/poster')
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
  };

  const getOwnerAnnouncement = () => {
    api
      .get(`/profile/${id}`)
      .then((response) => {
        console.log(id)
        setOwner(response.data)
      })
      .catch((error) => {
        const { status } = error.response
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';
          toast.error(msg);
      });
      
  };

  const onClickedAnnouncement = (id) => {
    setClickedAnnouncementId(id)
    setClickedOption(ENTER_PAGE_ANNOUNCEMENT)
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  switch(clickedOption) {
    case ENTER_PAGE_ANNOUNCEMENTLIST:
      contentForm = ( 
      <>
        <div style={{ marginTop: '150px' }} />
        <BasicForm>
        {announcements &&
          announcements.map((announcement) => (
            <ListDisplay
              key={announcement.id}
              title={announcement.expense}
              imageUrl={!announcement.posterPictures.length == 0 ? 
                announcement.posterPictures[0].pictureUrl : "https://media.discordapp.net/attachments/823680071885389904/841046406331629578/257492.jpg"}
              city={announcement.owner.address.city}
              state={announcement.owner.address.state}
              tags={announcement.tags}
              use={localContext}
              id={announcement.id}
              onClickedAnnouncement={onClickedAnnouncement}
              
            />
        ))}
        </BasicForm>
      </> )
      break;
    case ENTER_PAGE_ANNOUNCEMENT:
      contentForm = ( 
        <>
        {announcements &&
        announcements.map((announcement) => (
          announcement.id == clickedAnnouncementId ?
            <AnnouncementDisplay announcement={announcement} /> : <> </>
          
        ))}
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

export default Announcements;