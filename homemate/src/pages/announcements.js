import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../api';
import ListDisplay from '../components/show/my';
import BasicForm from '../components/form/BasicForm';
import Filter from '../components/filter/index.js';

function Announcements() {
  const [filterList, setFilterList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  let page = 1;
  let pageSize = 2;

  const localContext = 'Aluguel';


  const getAnnouncements = () => {
    api
      .get('/user/poster')
      .then((response) => {
        setAnnouncements(response.data);
        console.log(announcements)
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
  }, []);

  const filter = () => {
    let param = filterList.length > 0 || page || pageSize ? "?" : "";
    if(page) { param= param + "page=" + page };
    if(pageSize) { page  ?param = param + "&pageSize=" + pageSize : param = param + "pageSize=" + pageSize };
    if(filterList.length > 0) {
      filterList.forEach(tagId => {
        param = param + "&tags[]=" + tagId;
      });
    };
    console.log(param);
    console.log(filterList);
    api
    .get('/user/poster'+ param)
    .then((response) => {
      setAnnouncements(response.data.rows);
      console.log(response.data.rows)
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      toast.error(msg);
    });
  }

  return (
    <>

      <div style={{ marginTop: '150px' }} />
      <BasicForm>
        <button type="button" onClick={() => filter()}>"filtrar"</button>
        <Filter filterList={filterList} setFilterList={setFilterList}></Filter>
        {announcements && announcements.length > 0 && announcements.map((announcement) => (
              <ListDisplay
                title={announcement.expense}
                imageUrl={
                  !announcement.posterPictures.length == 0
                    ? announcement.posterPictures[0].pictureUrl
                    : 'https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/11/at.jpg'
                }
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
