import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import api from '../../../api';
import axios from 'axios'

function ProfileDisplay({ my = true, id }) {
  const history = useHistory();

  const [ name, setName ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ city, setCity ] = useState('')
  const [ state, setState ] = useState('')
  const [ picture, setPicture ] = useState('')
  const [ socialMedia, setSocialMedia ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ tags, setTags ] = useState([])

  const edit = () => {
    history.push('/profile/edit');
  }

  useEffect( () => {
    const url = my ? '/profile/me' : `/profile/${id}`

    api.get(url)
    .then( response => {
      const { data } = response

      setName(data.name)
      setLastname(data.lastname)
      setCity(data.address.city)
      setState(data.address.state)
      setPicture(data.picture)
      setSocialMedia(data.socialMedia)
      setPhoneNumber(data.phoneNumber)
      setEmail(data.email)
      setDescription(data.description)
      setTags(data.tags) 
      
    })
    .catch( error => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed';

      toast.error(msg);
    })
  }, [])

  return (
    <div className="component-show-profile">
      <div className="component-show-profile-left">
        <img src={picture} alt="Foto Perfil" width="150" />
        <h4>{`${name} ${lastname}`}</h4>
        <h5>{city}</h5>
        <h5>{state}</h5>
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
              <a href={socialMedia} target="_blank" rel="noreferrer">
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
              <span>{description}</span>
            </div>
            <div className="component-show-profile-data">
              <h4>Tags</h4>
              <span className="component-show-profile-right-tags">
                {tags.map((tag) => (
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
              <span>{email}</span>
            </div>
            <div className="component-show-profile-data">
              <h4>Telefone</h4>
              <span>{phoneNumber}</span>
            </div>
          </div>
        </div>
        { my ? <button type="button" onClick={edit}>Editar Perfil</button> : <div/>}
      </div>
    </div>
  );
}

export default ProfileDisplay;

