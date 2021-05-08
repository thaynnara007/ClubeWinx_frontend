import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import AnnouncementDisplay from '../components/show/announcement';
import Announcement from '../components/announcement'
import BaseButton from '../components/button/baseButton';
import BasicForm from '../components/form/BasicForm';

function MyAnnouncement() {
  const [announcement, setAnnouncement] = useState(null);
  const [ state, setState ] = useState('')
  let contentForm = null;

  const getAnnouncement = () => {
    api
      .get('/user/poster/my')
      .then((response) => {
        setAnnouncement(response.data);
        setState('INSERIR_ANUNCIO')
      })
      .catch((error) => {

        const { status } = error.response

        if (status === 404) setState('MEU_ANUNCIO')
        else {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        }
      });
  };

  const onClickInserir = () => {
    setState( (previos) => 'CRIAR_ANUNCIO')
  }

  const onClickEdit = () => {
    setState('EDITAR_ANUNCIO')
  }

  useEffect(() => {
    getAnnouncement();
  }, [announcement]);

  switch (state) {
    case 'MEU_ANUNCIO':
      contentForm = (<AnnouncementDisplay announcement={announcement} onClick={onClickEdit}/>);
      break;
    case 'INSERIR_ANUNCIO':
      contentForm = ( <BasicForm>
                        <div style={{ marginTop: '150px' }}>
                          <BaseButton onClick={onClickInserir}>INSERIR</BaseButton>
                        </div>
                      </BasicForm> )
      break;
    case 'CRIAR_ANUNCIO':
      contentForm = (<Announcement announcementExists={false} />);
      break;
    case 'EDITAR_ANUNCIO':
      contentForm = (<Announcement announcementExists={true} />);
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
