import React, { Fragment, useState  } from "react";
import useFetch from '../../hooks/useFetch';
import Input from '../input';

import "./autocomplete.css";

function Autocomplete(props) {
  const { tags, setTags } = props
  const { data: suggestions } = useFetch('/tag');

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');


  const onChange = input => {
    const filteredSuggestionsChange = input
      ?
      suggestions.filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
      )
      :
      [];

    setFilteredSuggestions(filteredSuggestionsChange);
    setUserInput(input);
  };

  const onClick = e => {
    setFilteredSuggestions([]);
    setUserInput("");
    
    const tagId = e.currentTarget.value;
    const tag = suggestions.find(input => input.id === tagId); 

    if(!tags.includes(tag)){
      setTags((prev) => [...prev, tag])
    }
  };

    
  const suggestionsListComponent = (filteredSuggestions.length > 0)
    ?
    <ul class="suggestions">
      {filteredSuggestions.map((suggestion, index) => {

        return (
          <li value={suggestion.id} key={index} onClick={onClick}>
            {suggestion.name}
          </li>
        );
      })}
    </ul>
    :
    <div className="no-suggestions">
      <em>Top tags</em>
    </div>

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