import React from 'react';
import './filter.css';
import api from '../../api';
import BasicForm from '../form/BasicForm';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
        <div>
            {filterTags && filterTags.map((tag) => <button type="button" onClick={() => removeFilter(tag)}>{`${tag.name}`}</button> )}
        </div>
        <div>
            {categories && categories.map((category) => <button type="button" onClick={() => setFocus(category.name)}>{`${category.name}`}</button> )}
        </div>
        <div>
            {focusCategory && categories && categories.map((category) => category.name === focusCategory && category.tags.map( (tag) => <button type="button" onClick={() => addFilter(tag)}>{`${tag.name}`}</button>) )}
        </div>

    </>
  );
}

export default Filter;
