import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

function IconClose({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faTimesCircle} style={styles} size={size} />
    </div>
  );
}

export default IconClose;
