import React from 'react';
import './flex.css';

function Flex({ styles, children }) {
  return (
    <form className="component-flex-form" style={styles}>
      {children}
    </form>
  );
}

export default Flex;
