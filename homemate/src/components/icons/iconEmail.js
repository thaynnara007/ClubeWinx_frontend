import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function IconEmail({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faEnvelope} style={styles} size={size} />
    </div>
  );
}

export default IconEmail;
