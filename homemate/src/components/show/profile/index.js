import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function ProfileDisplay({ profile }) {
  return (
    <div className="component-show-profile">
      <div className="component-show-profile-left">
        <img src={profile.picture} alt="Foto Perfil" width="150" />
        <h4>{`${profile.name} ${profile.lastname}`}</h4>
        <h5>{profile.address.city}</h5>
        <h5>{profile.address.state}</h5>
        <div className="component-show-profile-left-social-media">
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href={profile.socialMedia} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="component-show-profile-right">
        <div className="component-show-profile-info">
          <h3>Informações</h3>

          <div className="component-show-profile-info-data">
            <div className="component-show-profile-data">
              <h4>Descrição</h4>
              <span>{profile.description}</span>
            </div>
            <div className="component-show-profile-data">
              <h4>Tags</h4>
              <span className="component-show-profile-right-tags">
                {profile.tags.map((tag) => (
                  <span>{`<${tag.name}>`}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="component-show-profile-info">
          <h3>Contato</h3>

          <div className="component-show-profile-info-data">
            <div className="component-show-profile-data">
              <h4>Email</h4>
              <span>{profile.email}</span>
            </div>
            <div className="component-show-profile-data">
              <h4>Telefone</h4>
              <span>{profile.phoneNumber}</span>
            </div>
          </div>
        </div>
        <button type="button">Editar Perfil</button>
      </div>
    </div>
  );
}

export default ProfileDisplay;
