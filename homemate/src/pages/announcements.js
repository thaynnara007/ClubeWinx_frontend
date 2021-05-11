import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import ListDisplay from '../components/show/my';
import BasicForm from '../components/form/BasicForm';

function Announcements() {
  const [announcements, setAnnouncements] = useState(null);
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

  useEffect(() => {
    getAnnouncements();
  }, [announcements]);

  return (
    <>
     <div style={{ marginTop: '150px' }} />
      <BasicForm>
        {announcements &&
          announcements.map((announcement) => (
            <ListDisplay
              title={announcement.expense}
              imageUrl={!announcement.posterPictures.length == 0 ? 
                announcement.posterPictures[0].pictureUrl : "https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/11/at.jpg"}
              city={announcement.owner.address.city}
              state={announcement.owner.address.state}
              tags={announcement.tags}
              use={localContext}
            />
    ))}
      </BasicForm>
    </>
  );
}

export default Announcements;

// {announcements &&
//   <div style={{ marginTop: '150px' }}>
//     <BasicForm>

//       <ListDisplay
//       title={announcements[0].expense}
//       imageUrl={announcements[0].posterPictures[1].pictureUrl}
//       city={announcements[0].owner.address.city}
//       state={announcements[0].owner.address.state}
//       tags={announcements[0].tags}
//       use={localContext}
//     />
//     <ListDisplay
//       title={announcements[0].expense}
//       imageUrl={announcements[0].posterPictures[1].pictureUrl}
//       city={announcements[0].owner.address.city}
//       state={announcements[0].owner.address.state}
//       tags={announcements[0].tags}
//       use={localContext}
//     />
//     <ListDisplay
//     title={announcements[0].expense}
//     imageUrl={announcements[0].posterPictures[1].pictureUrl}
//     city={announcements[0].owner.address.city}
//     state={announcements[0].owner.address.state}
//     tags={announcements[0].tags}
//     use={localContext}
//     />
//     <ListDisplay
//     title={announcements[0].expense}
//     imageUrl={announcements[0].posterPictures[1].pictureUrl}
//     city={announcements[0].owner.address.city}
//     state={announcements[0].owner.address.state}
//     tags={announcements[0].tags}
//     use={localContext}
//     />
//     <ListDisplay
//     title={announcements[0].expense}
//     imageUrl={announcements[0].posterPictures[1].pictureUrl}
//     city={announcements[0].owner.address.city}
//     state={announcements[0].owner.address.state}
//     tags={announcements[0].tags}
//     use={localContext}
//     />
//   </BasicForm>
//   </div>
//   }

/*
<div style={{ marginTop: '150px' }} />
<BasicForm>
  {announcements &&
    announcements.map((announcement) => (
      <ListDisplay
        title={announcement.expense}
        imageUrl={announcement.posterPictures[0].pictureUrl}
        city={announcement.owner.address.city}
        state={announcement.owner.address.state}
        tags={announcement.tags}
        use={localContext}
      />
    ))}
</BasicForm>*/