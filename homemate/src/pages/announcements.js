import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import ListDisplay from '../components/show/my';
import BasicForm from '../components/form/BasicForm';
import Filter from '../components/filter';
import { ENTER_PAGE_ANNOUNCEMENT, ENTER_PAGE_ANNOUNCEMENTLIST } from '../utils/constants';
import AnnouncementDisplay from '../components/show/announcement';


function Announcements() {
  const options = [ENTER_PAGE_ANNOUNCEMENT, ENTER_PAGE_ANNOUNCEMENTLIST];
  const [clickedOption, setClickedOption] = useState(ENTER_PAGE_ANNOUNCEMENTLIST);
  const [clickedAnnouncementId, setClickedAnnouncementId] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  let page = 1;
  let pageSize = 2;
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
/*
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
      
  }; */

  const onClickedAnnouncement = (id) => {
    setClickedAnnouncementId(id)
    setClickedOption(ENTER_PAGE_ANNOUNCEMENT)
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  const filterAnnuncements = () => {
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
      param = param + tags;
    };

    api
    .get('/user/poster'+ param)
    .then((response) => {
      setAnnouncements(response.data)
      // setAnnouncements(response.data.rows)
    })
      
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      toast.error(msg);
    });
  }

  switch(clickedOption) {
    case ENTER_PAGE_ANNOUNCEMENTLIST:
      contentForm = ( 
      <>
        <div style={{ marginTop: '150px' }} />
        <BasicForm>
          <Filter filterList={filterList} clickFilter={filterAnnuncements} setFilterList={setFilterList}></Filter>
          {announcements && announcements.length > 0 &&
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
