import React from 'react';

const defaultStyles = { backgroundColor: 'transparent', border: 'none' };

function IconButton({ children, onClick, styles }) {
  return (
    <button style={{ ...defaultStyles, ...styles }} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
