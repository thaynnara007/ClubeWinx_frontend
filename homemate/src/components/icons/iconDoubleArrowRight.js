import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

function IconDoubleArrowRight({ size = 'lg', styles = { color: '#6983AA' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faAngleDoubleRight} style={styles} size={size} />
    </div>
  );
}

export default IconDoubleArrowRight;
