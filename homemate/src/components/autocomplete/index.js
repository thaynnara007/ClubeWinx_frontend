import React, { Fragment, useState, useLayoutEffect  } from "react";
import useFetch from '../../hooks/useFetch';
import InputTag from '../inputTag';
import { getTagColor } from '../../utils/functions';
import Input from '../input';

import "./autocomplete.css";

function Autocomplete(props) {
  const { tagsFormmated, setTagsFormmated, tags, setTags } = props
  const { data: suggestions } = useFetch('/tag');

  const [activeSuggestion, setActiveSuggestion] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const [filterTags, setFiltertags] = useState([]);


  const onChange = e => {
    const input = e;
    const filteredSuggestionsChange = input
      ?
      suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
      )
      :
      [];

    setActiveSuggestion(activeSuggestion);
    setFilteredSuggestions(filteredSuggestionsChange);
    setShowSuggestions(showSuggestions);
    setUserInput(input);
  };

  const onClick = e => {
    setActiveSuggestion(activeSuggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput("");
    
    const tagId = e.currentTarget.value;
    const tag = suggestions.find(e => e.id === tagId);
    filterTags.push(tag);
    setFiltertags(filterTags);
    updateTagList();
  };

    const updateTagList = () => {
      setTags(filterTags)
      console.log(tags)
      const att = filterTags && filterTags.length > 0 && filterTags.map(x => {
        const tagColor = getTagColor(x.categoryId);
        return(<InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name}</InputTag>);
        })
      console.log("att: ",att)
      setTagsFormmated(att)
    }
    
  const suggestionsListComponent = (filteredSuggestions.length > 0)
    ?
    <ul class="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
        let className;
        // Flag the active suggestion with a class
        if (index === activeSuggestion) {
          className = "suggestion-active";
        }
        return (
          <li value={suggestion.id} className={className} key={index} onClick={onClick}>
            {suggestion.name}
          </li>
        );
      })}
    </ul>
    :
    <div class="no-suggestions">
      <em>Top tags</em>
    </div>

  // render() {
  // const {
  //   onChange,
  //   onClick,
  //   onKeyDown,
  //   state: {
  //     activeSuggestion,
  //     filteredSuggestions,
  //     showSuggestions,
  //     userInput
  //   }
  // } = this;

  if (showSuggestions && userInput) {
    suggestionsListComponent
  };

  return (
    <div>
      <Fragment>
      <Input
        name="Buscar tags"
        value={userInput}
        onChange={onChange}
      />
        {suggestionsListComponent}
      </Fragment>
    </div>
  );
}

export default Autocomplete;
