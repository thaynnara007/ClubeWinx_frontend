import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

function IconAddress({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faMapMarkedAlt} style={styles} size={size} />
    </div>
  );
}

export default IconAddress;
