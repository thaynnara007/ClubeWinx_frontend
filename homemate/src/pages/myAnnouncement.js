import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import AnnouncementDisplay from '../components/show/announcement';

function MyAnnouncement() {
  const [announcement, setAnnouncement] = useState(null);

  const getAnnouncement = () => {
    api
      .get('/user/poster/my')
      .then((response) => {
        setAnnouncement(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      });
  };

  useEffect(() => {
    getAnnouncement();
  }, [announcement]);

  return <div>{announcement && <AnnouncementDisplay announcement={announcement} />}</div>;
}

export default MyAnnouncement;
