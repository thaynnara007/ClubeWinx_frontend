import React from 'react';
import './createTag.css';
import api from '../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OneLineInput from '../input/oneLineInput/index';
import BaseButton from '../button/baseButton/index';

function CreateTag(props) {
  const { isProfile, categories, setMyTags, setMyTagsList } = props;
  const [novaTag, setNovaTag] = useState('');
  const [state, setState] = useState(null);

  const createTag = isProfile ? '/profile//me/create/tags' : 'user/poster/me/create/tags';

  useEffect(() => {
    setState("Animais");
  }, []);

  const create = () => {
    const category = categories.filter(x => x.name === state);
    if (novaTag && category.length > 0) {
      const body = {
        'tags': [
          {
            'categoryId': category[0].id,
            'name': novaTag
          }
        ]
      };
      api 
        .post(createTag, body)
        .then((response) => {
          console.log(response)
          setMyTags(response.data.tags);
          setMyTagsList(response.data.tags);
          toast('Anúncio criado com su  cesso');
          toast('Edite seu anúncio: adicione algumas tags!');
          setFlag(true);
          setStateAnnouncement(ENTER_PAGE_MYANNOUNCEMENTT)
        })
        .catch((error) => {
          let msg = '';
          if (error.response) msg = error.response.data.error;
          else msg = 'Network failed';
          toast.error(msg);
        });
    }
  }

  function handleChange(event) {
    setState(event.target.value);
  };

  return (
    <>
        <div className="component-filter-base-box">
          <div>
            <table>
              <td>
                <label>Categoria:</label>
                <select value={state} onChange={handleChange} >
                  {categories.map((category) => <option value={category.name}>{category.name}</option>)}
                </select> 
              </td>
              <td>
                <OneLineInput name="Nome da nova tag" value={novaTag} onChange={(e) => setNovaTag(e)} />
              </td>
            </table>
          </div>
          <BaseButton onClick={create}>Adicionar tag persolanizada</BaseButton>
        </div>
    </>
  );
}
export default CreateTag;
