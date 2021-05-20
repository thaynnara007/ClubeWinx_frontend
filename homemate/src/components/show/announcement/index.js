import './announcement.css';

function AnnouncementDisplay({ announcement, onClick, my = true }) {
  return (
    <>
    {announcement &&
      <div className="component-show-announcement">
        <div className="component-show-announcement-left">
          <img src={!announcement.posterPictures.length == 0 ?
            announcement.posterPictures[0].pictureUrl : "https://media.discordapp.net/attachments/823680071885389904/841046406331629578/257492.jpg"} alt="Foto Anuncio" width="300" height="300"/>
          <p>{announcement.description}</p>
          { my ? <button type="button" onClick={onClick}>Editar Anúncio</button> : <div/>}
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
                <div>id: {announcement.owner.name}</div>
              </div>
            </div>
          </div>
          <div className="component-show-announcement-right-tags">
            {announcement.tags.map((tag) => (
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
