import React from 'react';
import '../components/picture/picture.css';
import Autocomplete from "../components/autocomplete";
import { useState, useEffect } from 'react';
import InputTag from '../components/inputTag';
import Button from '../components/button';
import { getTagColor } from '../utils/functions';
import api from '../api';

function Explore() {
  const [tagsElement, setTagsElement] = useState([]);
  const [profileTag, setProfileTag] = useState([]);
  const [anuncioTag, setAnuncioTag] = useState([]);

  const [ptags, setPtags] = useState([]);
  const [atags, setAtags] = useState([]);

  const addTagPerfilURL = '/profile/me/add/tags';
  const addTagAnuncioURL = 'user/poster/me/add/tags';
  const removeTagPerfilURL = '/profile/me/remove/tags';
  const removeTagAnuncioURL = 'user/poster/me/remove/tags/';
 // const removeTag = isProfile ? '/profile/me/remove/tags' : 'user/poster/me/remove/tags/';

  useEffect(() => {
    getProfile();
    getAnuncio();
    // attPtags();
    // attAtags();
  }, []);

  // useEffect(() => {
  //   // attPtags();
  // }, [profileTag]);

  // useEffect(() => {
  //   attAtags();
  // }, [anuncioTag]);

  const getProfile = () => {
    api
      .get('/profile/me')
      .then((response) => {
        setProfileTag(response.data.tags);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
      });
  }

  const getAnuncio = () => {
    api
      .get('user/poster/my')
      .then((response) => {
        const tags = creatTags(response.data.tags)
        setAnuncioTag(tags);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
      });
  }

  const addTagP = () => {
    console.log("addTagas");
    const tags = tagsElement.map((tag) => tag.id);
    console.log("tagas q vao ser adicionadas no perfil ",tags);
    const body = {
      tags
    }
    api
    .post(addTagPerfilURL, body)
    .then((response) => {
      setProfileTag(response.data.tags);
      // attPtags();
    })
    .catch((error) => {
      console.log('error'. error);
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed add';
    });
  }

  const addTagA = () => {
    console.log("addTagas");
    const tags = tagsElement.map((tag) => tag.id);
    console.log("tagas q vao ser adicionadas no anuncio ",tags);
    const body = {
      tags
    }
    api
    .post(addTagAnuncioURL, body)
    .then((response) => {
      setAnuncioTag(response.data.tags);
      attAtags();
    })
    .catch((error) => {
      console.log('error'. error);
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed add';
    });
  }
  function removeTagsP (tagId) {
    const tags = [tagId];
    const body = {
      tags
    }
    api
    .put(removeTagPerfilURL, body)
    .then((response) => {
      setProfileTag(response.data.tags);
      console.log(response.data.tags)
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed remove';
    });
  }

  function removeTagsA  (tagId) {
    const tags = [tagId];
    const body = {
      tags
    }
    api
    .put(removeTagAnuncioURL, body)
    .then((response) => {
      setAnuncioTag(response.data.tags);
      attAtags();
    })
    .catch((error) => {
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed remove';
    });
  }

  // const attPtags = () => {
  //   const atualizaTags = profileTag && profileTag.length > 0 && profileTag.map(x => {
  //   const tagColor = getTagColor(x.categoryId);
  //   return(<InputTag id={x.id} clickTag={removeTagsP} styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
  //   });
  //   setPtags(atualizaTags);
  // }

  function creatTags (lista) {
    const tags = lista && lista.length > 0 && lista.map(x => {
      const tagColor = getTagColor(x.categoryId);
      return(<InputTag id={x.id} clickTag={removeTagsA} styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
      });
      return tags
  }

    const attAtags = () => {
      const atualizaTags = anuncioTag && anuncioTag.length > 0 && anuncioTag.map(x => {
      const tagColor = getTagColor(x.categoryId);
      return(<InputTag id={x.id} clickTag={removeTagsA} styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
      });
      setAtags(atualizaTags)
    }

  return (
    <div>
      {
        tagsElement && tagsElement.length > 0 && tagsElement.map(x => {
          const tagColor = getTagColor(x.categoryId);
          return(
          <InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
        })
      }
      <p></p>
      <Autocomplete tags={tagsElement} setTags={setTagsElement} />
      <p></p>
      { profileTag && profileTag.length > 0 && profileTag.map(x => {
    const tagColor = getTagColor(x.categoryId);
    return(<InputTag id={x.id} clickTag={removeTagsP} styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
    })}
      <p></p>
      <Button onClick={addTagP}>add tags profile</Button>
      <p></p>
      {atags}
      <p></p>
      <Button onClick={addTagA}>add tags anuncio</Button>

    </div>
  );
}

export default Explore;
