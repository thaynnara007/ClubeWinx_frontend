import React, { useState } from 'react';

import './profile.css';

function Profile() {
  const [headerBackground, setHeaderBackground] = useState({ backgroundColor: '#D9D4DF' });
  const [isHeaderImage, setIsHeaderImage] = useState(false);

  return (
    <>
      <div className="profile-header" style={{ ...headerBackground }}>
        <div className="profile-image"/>  
        <div className="profile-box">
        </div>
      </div>
    </>
  );
}

export default Profile;
