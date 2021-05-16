import React from 'react';
import './navbar.css'; 

function Navbar(props) {
  const { children, actions, choosed, logout = -1} = props;

  return (
    <>
      <nav className="component-navbar-navbar">
        {children.map((option, index) => {
          let aClassName = 'component-navbar-option';

          if (option === choosed) aClassName += ' component-navbar-selected';
          if (index === logout) aClassName = 'component-navbar-lougout'

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

export default Navbar;
