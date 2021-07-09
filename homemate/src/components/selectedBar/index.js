/* eslint-disable react/no-array-index-key */
import React from 'react';
import './selectedBar.css';

function SelectedBar(props) {
  const { styles,children } = props;

  return (
    <>
      <div className="selectBarComponent-component-navbar-navbar" style={styles}>
        <h1 className='selectBarComponent-component-navbar-option selectBarComponent-component-navbar-selected'>
          {children}
        </h1>
      </div>
    </>
  );
}

export default SelectedBar;
