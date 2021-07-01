import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

function IconBed({ size = 'lg', color = '#6983AA' }) {
  return (
    <div>
      <FontAwesomeIcon icon={faBed} style={{ color }} size={size} />
    </div>
  );
}

export default IconBed;
