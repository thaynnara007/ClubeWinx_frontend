import React from 'react';
import './filter.css';
import api from '../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TagButton from '../button/tagButton/index';
import BaseButton from '../button/baseButton/index';

function Filter(props) {
  const {filterList, setFilterList, clickFilter} = props;
  const [categories, setCategories] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [focusCategory, setFocusCategory] = useState("Animais");


  const getCategories = () => {
    api
      .get('/category/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        toast.error(msg);
      });
  };

  const setFocus = (category) => {
        setFocusCategory(category);
  }

  
  const addFilter = (tag) => {
    const newList = filterList.concat(tag.id);
    const newTagList = filterTags.concat(tag);
    setFilterList(newList);
    setFilterTags(newTagList);
  }

  const removeFilter = (tag) => {

    const newList = filterList.filter(id => tag.id !== id);
    const newTagList = filterTags.filter(t => tag.id !== t.id);

    setFilterList(newList);
    setFilterTags(newTagList);
  }
  
  useEffect(() => {
      getCategories();
    }, []);

  return (
    <>
        <div className="component-filter-base-box">
            <div>   
                {categories && categories.map((category) => <TagButton onClick={() => setFocus(category.name)}>{`${category.name}`}</TagButton> )}
            </div>
            <div>
                {focusCategory && categories && categories.map((category) => category.name === focusCategory && category.tags.map( (tag) => <TagButton tag onClick={() => addFilter(tag)}>{`${tag.name}`}</TagButton>) )}
            </div>
            <BaseButton filter onClick={() => clickFilter()}>filtrar</BaseButton>
            <div>
                {filterTags && filterTags.map((tag) => <TagButton tag danger onClick={() => removeFilter(tag)}>{`${tag.name}`}</TagButton> )}
            </div>
        </div>
    </>
  );
}

export default Filter;
