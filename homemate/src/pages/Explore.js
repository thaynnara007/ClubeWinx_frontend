import React from 'react';
import '../components/picture/picture.css';
import Autocomplete from "../components/autocomplete";
import { useState, useEffect } from 'react';
import InputTag from '../components/inputTag';
import Button from '../components/button';
import { getTagColor } from '../utils/functions';
import api from '../api';

function Explore() {
  const [tagsFormmated, setTagsFormmated] = useState([]);
  const [tagsElement, setTagsElement] = useState([]);
  const [profileTag, setProfileTag] = useState([]);
  const [anuncioTag, setAnuncioTag] = useState([]);

  const [ptags, setPtags] = useState([]);
  const [atags, setAtags] = useState([]);

  const addTagPerfilURL = '/profile/me/add/tags';
  const addTagAnuncioURL = 'user/poster/me/add/tags';

 // const removeTag = isProfile ? '/profile/me/remove/tags' : 'user/poster/me/remove/tags/';

  useEffect(() => {
    getProfile();
    getAnuncio();
    attPtags();
  }, []);

  useEffect(() => {
    attPtags();
  }, [profileTag]);

  useEffect(() => {
    attAtags();
  }, [anuncioTag]);

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
        setAnuncioTag(response.data.tags);
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
      setProfileTag(response.data.tags);
    })
    .catch((error) => {
      console.log('error'. error);
      let msg = '';
      if (error.response) msg = error.response.data.error;
      else msg = 'Network failed add';
    });
  }
  // const removeTags = (removidas) => {
  //   console.log("removeTags");
  //   const tags = removidas.map((tag) => tag.id);
  //   const body = {
  //     tags
  //   }
  //   api
  //   .put(removeTag, body)
  //   .then((response) => {
  //     setMyTags(response.data.tags);
  //     setMyTagsList(response.data.tags);
  //   })
  //   .catch((error) => {
  //     let msg = '';
  //     if (error.response) msg = error.response.data.error;
  //     else msg = 'Network failed remove';

  //     toast.error(msg);
  //   });
  // }

  const attPtags = () => {
    const atualizaTags = profileTag && profileTag.length > 0 && profileTag.map(x => {
    const tagColor = getTagColor(x.categoryId);
    return(<InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
    });
    setPtags(atualizaTags);
  }

    const attAtags = () => {
      const atualizaTags = anuncioTag && anuncioTag.length > 0 && anuncioTag.map(x => {
      const tagColor = getTagColor(x.categoryId);
      return(<InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
      });
      setAtags(atualizaTags)
    }

  return (
    <div>
      {tagsFormmated}
      <p></p>
      <Autocomplete tagsFormmated={tagsFormmated} setTagsFormmated={setTagsFormmated} tags={tagsElement} setTags={setTagsElement} />
      <p></p>
      {ptags}
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
