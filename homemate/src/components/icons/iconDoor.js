import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

function IconDoor({ size = 'lg', styles = { color: '#6983AA'} }) {
  return (
    <div>
      <FontAwesomeIcon icon={faDoorOpen} style={styles} size={size} />
    </div>
  );
}

export default IconDoor;
