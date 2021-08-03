import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function IconAdd({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faPlus} style={styles} size={size} />
    </div>
  );
}

export default IconAdd;
