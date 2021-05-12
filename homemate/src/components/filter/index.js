import React from 'react';
import './filter.css';
import api from '../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BaseButton from '../button/baseButton/index';

function Filter(props) {
  const {filterList, setFilterList} = props;
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
        console.log(category)
        setFocusCategory(category);
  }

  
  const addFilter = (tag) => {
    const newList = filterList.concat(tag.id);
    const newTagList = filterTags.concat(tag);
    setFilterList(newList);
    setFilterTags(newTagList);
  }

  const removeFilter = (tag) => {
    console.log(tag.id)
    console.log(tag)
    const newList = filterList.filter(id => tag.id != id);
    const newTagList = filterTags.filter(t => tag.id != t.id);
    console.log(newList);
    console.log(newTagList);
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
                {filterTags && filterTags.map((tag) => <BaseButton tag danger onClick={() => removeFilter(tag)}>{`${tag.name}`}</BaseButton> )}
            </div>
            <div>   
                {categories && categories.map((category) => <BaseButton tag onClick={() => setFocus(category.name)}>{`${category.name}`}</BaseButton> )}
            </div>
            <div>
                {focusCategory && categories && categories.map((category) => category.name === focusCategory && category.tags.map( (tag) => <BaseButton tag onClick={() => addFilter(tag)}>{`${tag.name}`}</BaseButton>) )}
            </div>
        </div>
    </>
  );
}

export default Filter;
