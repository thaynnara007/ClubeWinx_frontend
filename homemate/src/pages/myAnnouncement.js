import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import AnnouncementDisplay from '../components/show/announcement';
import Announcement from '../components/announcement'
import BaseButton from '../components/button/baseButton';
import BasicForm from '../components/form/BasicForm';
import { ENTER_PAGE_MYANNOUNCEMENTT, ENTER_PAGE_ADDANNOUNCEMENT, ENTER_PAGE_EDITANNOUNCEMENT, ENTER_PAGE_NEWANNOUNCEMENT } from '../utils/constants';

function MyAnnouncement() {
  const options = [ENTER_PAGE_MYANNOUNCEMENTT, ENTER_PAGE_ADDANNOUNCEMENT, ENTER_PAGE_EDITANNOUNCEMENT, ENTER_PAGE_NEWANNOUNCEMENT];
  const [announcement, setAnnouncement] = useState(null);
  const [ state, setState ] = useState('')
  const [flag, setFlag] = useState(false)
  let contentForm = null;

  const getAnnouncement = () => {
    api
      .get('/user/poster/my')
      .then((response) => {
        setAnnouncement(response.data);
        setState(ENTER_PAGE_MYANNOUNCEMENTT)
      })
      .catch((error) => {

        const { status } = error.response

        if (status === 404) setState(ENTER_PAGE_ADDANNOUNCEMENT)
        else {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        }
      });
  };

  const onClickInserir = () => {
    setState( (previos) => ENTER_PAGE_NEWANNOUNCEMENT)
  }

  const onClickEdit = () => {
    setState(ENTER_PAGE_EDITANNOUNCEMENT)
  }

  useEffect(() => {
    getAnnouncement();
  }, [flag]);

  switch (state) {
    case ENTER_PAGE_MYANNOUNCEMENTT:
      contentForm = (<AnnouncementDisplay announcement={announcement} onClick={onClickEdit} />);
      break;
    case ENTER_PAGE_ADDANNOUNCEMENT:
      contentForm = ( <BasicForm>
                        <div style={{ marginTop: '150px' }}>
                          <BaseButton onClick={onClickInserir}>INSERIR</BaseButton>
                        </div>
                      </BasicForm> )
      break;
    case ENTER_PAGE_NEWANNOUNCEMENT:
      contentForm = (<Announcement announcementExists={false} typeButton={ENTER_PAGE_NEWANNOUNCEMENT} setStateAnnouncement={setState}/>);
      break;
    case ENTER_PAGE_EDITANNOUNCEMENT:
      contentForm = (<Announcement announcementExists={true} typeButton={ENTER_PAGE_EDITANNOUNCEMENT} setStateAnnouncement={setState} setFlag={setFlag}/>);
      break;
    default:
      break;
  }

  return (
    <div>
      {contentForm}
    </div>
  );
}

export default MyAnnouncement;
