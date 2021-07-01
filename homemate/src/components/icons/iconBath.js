import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath } from '@fortawesome/free-solid-svg-icons';

function IconBath({ size = 'lg', color = '#6983AA' }) {
  return (
    <div>
      <FontAwesomeIcon icon={faBath} style={{ color }} size={size} />
    </div>
  );
}

export default IconBath;
