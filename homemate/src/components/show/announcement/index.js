import './announcement.css';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from 'react-toastify';


function AnnouncementDisplay({ announcement, onClickEdit, onClickDelete, isMyAnnouncement, handleDeleteImage}) {
  const [urlImage, setUrlImage] = useState("https://media.discordapp.net/attachments/823680071885389904/841046406331629578/257492.jpg");
  let [indexImage, setIndexImage] = useState(0);

  const changeAnnoucementImage = function(index) {
    indexImage += index;
    
    if(indexImage == announcement.posterPictures.length) {
      indexImage = 0;
      setIndexImage(indexImage);

    } else if(indexImage < 0) {
      indexImage = announcement.posterPictures.length - 1;
      setIndexImage(indexImage);

    } else {
      setIndexImage(indexImage);
    }

    setUrlImage(announcement.posterPictures[indexImage].pictureUrl);
  }

  useEffect(() => {
    if(announcement && announcement.posterPictures != null && announcement.posterPictures.length > 0) {
      setUrlImage(announcement.posterPictures[announcement.posterPictures.length - 1].pictureUrl);
    }
  }, []);


  return (
    <>
    {announcement &&
      <div className="component-show-announcement">
        <div className="component-show-announcement-left">
          <button className={isMyAnnouncement ? "delete-button" : "none"} onClick={() => {
            if(announcement.posterPictures !== undefined && announcement.posterPictures.length > 0) {
              handleDeleteImage(announcement.posterPictures[indexImage].id);
              changeAnnoucementImage(1);
            }
          }}>x</button>

          <img src={urlImage} alt="Foto do Anúncio" width="300" height="300" />
          
          <div className={announcement.posterPictures !== undefined && announcement.posterPictures.length > 0
             ? "component-show-announcement-buttons" : "component-show-announcement-buttons-disable"}>
            <button onClick={() => {changeAnnoucementImage(-1)}} className="button-display-left"> &lt; </button>
            <button onClick={() => {changeAnnoucementImage(1)}} className="button-display-right"> &gt; </button>
          </div>
          <p>{announcement.description}</p>

          <div className={isMyAnnouncement ? "component-show-announcement-bottom-buttons" : "none"} >
            <button className="edit" type="button" onClick={onClickEdit}>Editar Anúncio</button>
            <button className="delete" type="button" onClick={onClickDelete}>Excluir Anúncio</button>
          </div>

        </div>

        <div className="component-show-announcement-right">
          <div className="component-show-announcement-info">
            <h3>Informações do Anúncio</h3>

            <div className="component-show-announcement-info-data">
              <div className="component-show-announcement-data">
                <h4>Valor</h4>
                <div>{announcement.expense}</div>
                <h4>Quantidade de residentes</h4>
                <div>{announcement.residents}</div>
              </div>

              <div className="component-show-announcement-data">
                <h4>Quantidade de Vagas</h4>
                <div>{announcement.vacancies}</div>
                <h4>Anunciante</h4>
                <div>Nome: {announcement.owner !== undefined ? announcement.owner.name : ""}</div>
              </div>
            </div>
          </div>
          <div className="component-show-announcement-right-tags">
            {announcement.tags && announcement.tags.map((tag) => (
              <span>{`<${tag.name}>`}</span>
            ))}
          </div>
        </div>
      </div>
    }
    </>
  );
}


export default AnnouncementDisplay;
