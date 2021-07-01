import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function IconPeople({ size = 'lg', color = '#6983AA' }) {
  return (
    <div>
      <FontAwesomeIcon icon={faUser} style={{ color }} size={size} />
    </div>
  );
}

export default IconPeople;
