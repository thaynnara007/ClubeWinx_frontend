import { Avatar, makeStyles } from '@material-ui/core';
import { getTagColor } from '../../utils/functions';
import InputTag from '../inputTag';
import IconMap from '../icons/iconMap';
import wesleyImg from '../../img/wesley.jpeg';
import './profileCard.css';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: '#8566AA',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function ProfileCard({ name, description, tags, city, state }) {
  const styles = useStyles();

  return (
    <div className="profile-card">
      <div className="card-header">
        <Avatar className={styles.avatar} src={wesleyImg} />
      </div>
      <div className="card-content">
        <div id="profile-location">
          <IconMap size="1x" />
          <span className="profile-address">{`${city} - ${state}`}</span>
        </div>
        <div className="profile-name">{name}</div>
        <div className="profile-description">{description}</div>
        <div className="profile-tags">
          {Array.isArray(tags) &&
            tags.map((tag) => {
              const tagColor = getTagColor(tag.categoryId);

              return (
                <InputTag styles={{ backgroundColor: `${tagColor}` }}>{`${tag.name}`}</InputTag>
              );
            })}
        </div>
        <button type="button"> VER PERFIL</button>
      </div>
    </div>
  );
}

export default ProfileCard;
