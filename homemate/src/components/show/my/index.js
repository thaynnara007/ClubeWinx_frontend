import './list.css';

function ListDisplay({ title, imageUrl, city, state, tags, use, id, onClickedAnnouncement }) {
  console.log(id)
  return (
      <div className="components-show-my">
        <div className="components-show-my-left">
          <img src={imageUrl} alt="Imagem do card" width="150"/>
        </div>
        <div className="components-show-my-right">
          <div className="components-show-my-right-info">
            <div className="components-show-my-right-info-data">
              <h4>{use}</h4>
              <span>{`R$${title}`}</span>
            </div>
            <div className="components-show-my-right-info-data">
              <h4>Localização</h4>
              <div>{city}</div>
              <div>{state}</div>
            </div>
          </div>
          <div className="components-show-my-right-tags">
            {tags.map((tag) => (
              <span>{`<${tag.name}>`}</span>
            ))}
          </div>
          <button onClick={() => {onClickedAnnouncement(id)} }>Ver mais</button>
        </div>
      </div>
  );
}

export default ListDisplay;
