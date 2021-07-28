/* eslint-disable react/jsx-boolean-value */

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

import api from '../../api';
import BaseButton from '../button';
import Autocomplete from '../autocomplete';

import Loading from '../loading';

function AddTag(props) {
  const { post } = props;
  const [tagsSet, setTagsSet] = useState(new Set());
  const [tagsInit, setTagsInit] = useState(new Set());
  const [postTag, setPostTag] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const addTagAnuncioURL = 'user/poster/me/add/tags';
  const removeTagAnuncioURL = 'user/poster/me/remove/tags/';
  const createTag = 'user/poster/me/create/tags';
  const history = useHistory();

  useEffect(() => {
    function updateState() {
      if (tagsSet.size === 0) {
        const initSet = new Set();
        const initSetTags = new Set();
        if (post && post.tags) {
          setPostTag(post.tags);
          post.tags.forEach((tag) => initSet.add(tag.id) && initSetTags.add(tag.id));
        }
        setTagsSet(initSetTags);
        setTagsInit(initSet);
      }
    }
    updateState();
  }, [post]);

  function addTags(tagsAdd) {
    setLoadingAdd(true);
    const tags = Array.from(tagsAdd);
    const body = {
      tags,
    };
    api
      .post(addTagAnuncioURL, body)
      .then(() => {
        setLoadingAdd(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed add tags';
        toast.error(msg);
        setLoadingAdd(false);
      });
  }

  function removeTags(tagsRemove) {
    setLoadingRemove(true);
    const tags = Array.from(tagsRemove);
    const body = {
      tags,
    };
    api
      .put(removeTagAnuncioURL, body)
      .then(() => {
        setLoadingRemove(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed remove tags';
        toast.error(msg);
        setLoadingRemove(false);
      });
  }

  const createTags = (tags) => {
    setLoadingCreate(true);
    if (tags && tags.length > 0) {
      tags.forEach((element) => {
        const body = {
          tags: [
            {
              categoryId: element.categoryId,
              name: element.name,
            },
          ],
        };
        api
          .post(createTag, body)
          .then(() => {
            toast('Tags criadas com sucesso');
            setLoadingCreate(false);
          })
          .catch((error) => {
            let msg = '';
            if (error.response) msg = error.response.data.error;
            else msg = 'Network failed';
            toast.error(msg);
            setLoadingCreate(false);
          });
      });
    }
  };

  const updateTags = () => {
    const addTag = new Set([...tagsSet].filter((i) => !tagsInit.has(i) && i > 0));
    const removedTag = new Set([...tagsInit].filter((i) => !tagsSet.has(i)));

    // tags.forEach((tag) => {
    //   if(!tagsInit.has(tag) && tag > 0) {
    //     addTag.push(tag);
    //   }
    // })

    // tagsInit.forEach((tag) => {
    //   if(!tags.has(tag)) {
    //     removeTag.push(tag);
    //   }
    // })

    if (tagsSet.has(-1)) {
      const newTags = postTag.filter((tag) => tag.id < 0);
      createTags(newTags);
    }

    if (addTag.size > 0) {
      addTags(addTag);
    }

    if (removedTag.size > 0) {
      removeTags(removedTag);
    }

    toast('Informações atualizadas com sucesso');
    history.push('/posts/my');
  };

  function removeTag(tag) {
    tagsSet.delete(tag);
    setPostTag((prev) => prev.filter((e) => e.id !== tag));
  }

  return (
    <>
      {
        (loadingCreate,
        loadingAdd,
        loadingRemove ? (
          <div style={{ marginTop: '400px' }}>
            <Loading />
          </div>
        ) : (
          <>
            <Autocomplete
              profileTag={postTag}
              setProfileTag={setPostTag}
              deleteTag={removeTag}
              creatTag={true}
              tags={tagsSet}
              setTags={setTagsSet}
            />
            <BaseButton onClick={updateTags} styles={{ width: '100%', fontWeight: 'bold' }}>
              SALVAR
            </BaseButton>
          </>
        ))
      }
    </>
  );
}

export default AddTag;
