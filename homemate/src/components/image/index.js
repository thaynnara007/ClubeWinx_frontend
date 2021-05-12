import { useEffect, useState } from 'react';
import BaseButton from '../button/baseButton/index';
import api from '../../api/index';
import { toast } from 'react-toastify';

function FileImage() {

const [file, setFile] = useState(null)

 const editFile = (event) => {
  
    if(event.target.files[0]) {
     const f = event.target.files[0]

      setFile(f)

    }
  }

  const upload = () => {

    if (file) {

      const formData = new FormData()
      formData.append('file', file)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }

      api
      .post('/user/poster/me/picture', formData, config)
      .then( res => {
        console.log(res)
        toast('Imagem adicionada com sucesso');
      })
      .catch( error => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';

        toast.error(msg);
      })
    }
  }

return (
  <>
    <table>
          <tr>
            <td>
              <div>
                <input type="file" placeholder="Upload" enctype="multipart/form-data" name="image" onChange={(event) => editFile(event)} />
              </div>
            </td>
            <td>
              <div>
                <BaseButton onClick={upload}>ENVIAR</BaseButton>
              </div>
            </td>
          </tr>
        </table>     
  </>
)
}
export default FileImage;