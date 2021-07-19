import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function IconArrowLeft({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faArrowLeft} style={styles} size={size} />
    </div>
  );
}

export default IconArrowLeft;
