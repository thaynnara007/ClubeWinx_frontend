import BaseButton from '../components/button/baseButton';
  
import { useHistory } from "react-router";
import BasicForm from '../components/form/BasicForm';
import Announcementent from '../components/form/announcement';

function MyAnnouncemente() {
  const history = useHistory();
  const response = true;


  const handleClick = () => {
      history.push('/newAnnouncement');
  }

  const existAnnouncement = () => {
   
    /*
    api
        .post('/user/poster/my', body)
        .then((response) => {
          const { token, user } = response.data;

          localStorage.setItem('homemate_access_token', token);
          toast(`Bem-vindo de volta ${user.name}!`);
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';

          toast.error(msg);
        });
        */
      
  }

  return <div style={{ marginTop: '150px' }}>
    <BasicForm>
      {response && <BaseButton onClick={handleClick}>INSERIR</BaseButton>}
    </BasicForm>
  </div>;
  
}





export default MyAnnouncemente;
