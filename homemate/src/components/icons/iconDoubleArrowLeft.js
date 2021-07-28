import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function IconDoubleArrowLeft({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faAngleDoubleLeft} style={styles} size={size} />
    </div>
  );
}

export default IconDoubleArrowLeft;
