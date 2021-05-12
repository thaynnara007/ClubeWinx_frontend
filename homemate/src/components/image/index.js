import { useState } from 'react';
import BaseButton from '../button/baseButton/index';

import './image.css'
import image from '../../img/no_image.jpg'

function FileImage(props) {

  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState(props.fileUrl)
  const { imageStyle, upload } = props 

  const editFile = (event) => {
  
    if(event.target.files[0]) {
      const f = event.target.files[0]
      const url = URL.createObjectURL(f)

      setFile(f)
      setFileUrl(url)
    }
  }

  const handleUpload = () => {
    if (file) 
      upload(file)
  }

return (
  <>
    <img 
    alt="foto de perfil"
    style={ imageStyle ? imageStyle : {
      width: 400,
      height: 340,
      borderRadius: 20 
    }}
    src={ 
      fileUrl ? 
      fileUrl : 
      image}> 
    </img>
    <table>
      <tbody>
          <tr>
            <td>
              <div className="component-image-cover">
                <button className="component-image-button">Escolha uma foto</button>
                <input className= '.component-image-input' type="file" placeholder="Upload" encType="multipart/form-data" name="image" onChange={(event) => editFile(event)} />
              </div>
            </td>
            <td>
              <div>
                <BaseButton onClick={() => handleUpload()}>ENVIAR</BaseButton>
              </div>
            </td>
          </tr>
        </tbody>
    </table>     
  </>
)
}
export default FileImage;