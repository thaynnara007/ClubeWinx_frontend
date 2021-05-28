import React from 'react';
import './editTags.css';
import api from '../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TagButton from '../button/tagButton/index';
import BaseButton from '../button/baseButton/index';
import CreateTag from '../createTag/index';

function EditTags(props) {
  const { isProfile } = props;
  const [categories, setCategories] = useState([]);
  const [focusCategory, setFocusCategory] = useState("Animais");
  const [myTagsList, setMyTagsList] = useState([]);
  const [myTags, setMyTags] = useState([]);

  const addTag = isProfile ? '/profile/me/add/tags' : 'user/poster/me/add/tags';
  const removeTag = isProfile ? '/profile/me/remove/tags' : 'user/poster/me/remove/tags/';
  const getTags = isProfile ? '/profile/me' : 'user/poster/my';

  const getCategories = () => {
    api
      .get('/category/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed getCategories';
        toast.error(msg);
      });
  };

  const setFocus = (category) => {
        setFocusCategory(category);
  }

  const addFilter = (tag) => {
    const newList = myTagsList.concat(tag.id);
    const newTagList = myTagsList.concat(tag);
    setMyTagsList(newList);
    setMyTagsList(newTagList);
  }

  const removeFilter = (tag) => {

    const newList = myTagsList.filter(id => tag.id !== id);
    const newTagList = myTagsList.filter(t => tag.id !== t.id);

    setMyTagsList(newList);
    setMyTagsList(newTagList);
  }
  
  function initializeTags() {
    api
    .get(getTags)
    .then( response => {
      const { data } = response 
      setMyTagsList(data.tags);
      setMyTags(data.tags);
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed getProfile';
      toast.error(msg);
    });
  }

    const saveTags = () => {
      let adicionadas = myTagsList.filter((tag) => notContains(myTags,tag));
      let removidas = myTags.filter((tag) => notContains(myTagsList,tag));
      if(adicionadas  && adicionadas[0] !== undefined) {
        addTagas(adicionadas)
      }
      if(removidas && removidas[0] !== undefined) {
        removeTags(removidas)
      }
    }

    const addTagas = (adicionadas) => {
      console.log("addTagas");
      const tags = adicionadas.map((tag) => tag.id);
      const body = {
        tags
      }
      api
      .post(addTag, body)
      .then((response) => {
        setMyTags(response.data.tags);
        setMyTagsList(response.data.tags);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed add';

        toast.error(msg);
      });
    }

    const removeTags = (removidas) => {
      console.log("removeTags");
      const tags = removidas.map((tag) => tag.id);
      const body = {
        tags
      }
      api
      .put(removeTag, body)
      .then((response) => {
        setMyTags(response.data.tags);
        setMyTagsList(response.data.tags);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed remove';

        toast.error(msg);
      });
    }

    function notContains(list, element){
      let contains = false;
      list.forEach(item => {
        if( item.id === element.id) contains = true;
      });
      if(!contains){
        return element.id
      }
    }

    useEffect(() => {
      getCategories();
      initializeTags();
    }, []);

  return (
    <>
        <div className="component-filter-base-box">
            <div>
                {myTagsList && myTagsList.map((tag) => <TagButton tag danger onClick={() => removeFilter(tag)}>{`${tag.name}`}</TagButton> )}
            </div>
            <div>   
                {categories && categories.map((category) => <TagButton onClick={() => setFocus(category.name)}>{`${category.name}`}</TagButton> )}
            </div>
            <div>
                {focusCategory && categories && categories.map((category) => category.name === focusCategory && category.tags.map( (tag) => <TagButton tag onClick={() => addFilter(tag)}>{`${tag.name}`}</TagButton>) )}
            </div>
            <BaseButton onClick={saveTags}>SALVAR</BaseButton>
            <CreateTag categories={categories} setMyTags={setMyTags} isProfile={isProfile} setMyTagsList={setMyTagsList}></CreateTag>
        </div>
    </>
  );
}

export default EditTags;
