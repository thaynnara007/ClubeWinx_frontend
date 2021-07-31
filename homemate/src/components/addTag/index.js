/* eslint-disable react/jsx-boolean-value */

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../api';
import BaseButton from '../button';
import Autocomplete from '../autocomplete';

import Loading from '../loading';

const addTagAnuncioURL = 'user/poster/me/add/tags';
const removeTagAnuncioURL = 'user/poster/me/remove/tags/';
const createTag = 'user/poster/me/create/tags';

function AddTag({
  data,
  execute = () => {},
  addTagUrl = addTagAnuncioURL,
  removeTagUrl = removeTagAnuncioURL,
  createTagUrl = createTag,
  backUrl = '/posts/my',
}) {
  const [tagsSet, setTagsSet] = useState(new Set());
  const [tagsInit, setTagsInit] = useState(new Set());
  const [postTag, setPostTag] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function updateState() {
      if (tagsSet.size === 0) {
        const initSet = new Set();
        const initSetTags = new Set();
        if (data && data.tags) {
          setPostTag(data.tags);
          data.tags.forEach((tag) => initSet.add(tag.id) && initSetTags.add(tag.id));
        }
        setTagsSet(initSetTags);
        setTagsInit(initSet);
      }
    }
    updateState();
  }, [data]);

  function addTags(tagsAdd) {
    setLoadingAdd(true);
    const tags = Array.from(tagsAdd);
    const body = {
      tags,
    };
    api
      .post(addTagUrl, body)
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
      .put(removeTagUrl, body)
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
          .post(createTagUrl, body)
          .then(() => {
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
  };

  const update = async () => {
    setLoading(true);
    await updateTags();
    await execute();

    setLoading(false);
    toast('Informações atualizadas com sucesso');
    window.location.replace(backUrl);
  };

  function removeTag(tag) {
    tagsSet.delete(tag);
    setPostTag((prev) => prev.filter((e) => e.id !== tag));
  }

  return (
    <>
      {loadingCreate || loadingAdd || loadingRemove || loading ? (
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
          <BaseButton onClick={update} styles={{ width: '100%', fontWeight: 'bold' }}>
            SALVAR
          </BaseButton>
        </>
      )}
    </>
  );
}

export default AddTag;
