import React from 'react';

import './fileUploader.css';

function FileUploader({ children, styles, handleUpload, icon = false }) {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    handleUpload(file);
  };

  const className = icon ? "file-uploader-icon-button" : "file-uploader-button"

  return (
    <>
      <button type="button" className={className} onClick={handleClick} style={styles}>
        {children}
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
}

export default FileUploader;
