/* eslint-disable react/no-array-index-key */
import React from 'react';
import './tabBar.css';

function TabBar(props) {
  const { children, actions, choosed, styles } = props;

  return (
    <>
      <nav className="component-navbar-navbar" style={styles}>
        {children.map((option, index) => {
          let aClassName = 'component-navbar-option';

          aClassName +=
            option === choosed ? ' component-navbar-selected' : ' component-navbar-other-option';

          return (
            <a key={index} className={aClassName} onClick={actions[index]}>
              {option}
            </a>
          );
        })}
      </nav>
    </>
  );
}

export default TabBar;
