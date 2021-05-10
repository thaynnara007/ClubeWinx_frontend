import './announcement.css';

function AnnouncementDisplay({ announcement, onClick }) {
  return (
    <div className="component-show-announcement">
      <div className="component-show-announcement-left">
        <img src={announcement.posterPictures[0].pictureUrl} alt="Foto Anuncio" width="300" height="300" />
        <p>{announcement.description}</p>
        <button type="button" onClick={onClick}>Editar Anúncio</button>
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
              <div>id: {announcement.owner.id}</div>
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
  );
}

export default AnnouncementDisplay;
