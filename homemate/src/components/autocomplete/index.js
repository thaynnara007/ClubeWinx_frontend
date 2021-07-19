import React, { Fragment, useState } from "react";
import useFetch from '../../hooks/useFetch';
import InputTag from '../inputTag';
import { getTagColor } from '../../utils/functions';

import "./autocomplete.css";

const teste = [
  { id: 69, name: 'Cachorro', isFixed: true, categoryId: 5 },
  { id: 70, name: 'Calopsita', isFixed: true, categoryId: 5 },
  { id: 72, name: 'Coelho', isFixed: true, categoryId: 5 },
  { id: 73, name: 'Gato', isFixed: true, categoryId: 5 },
  { id: 74, name: 'Hamster', isFixed: true, categoryId: 5 },
  { id: 75, name: 'Periquito', isFixed: true, categoryId: 5 },
  { id: 76, name: 'Porco', isFixed: true, categoryId: 5 },
  { id: 71, name: 'Porquinho-da-india', isFixed: true, categoryId: 5 }
];


function Autocomplete(props) {
  const { tags, setTags } = props
  const { data: suggestions, isLoading } = useFetch('/tag');

  //const [suggestions, setSuggestions] = useState(teste);
  const [activeSuggestion, setActiveSuggestion] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const [filterTags, setFiltertags] = useState([]);//tags clicadas id e name
  // const [tags, setTags] = useState([]);//filtertags em botao


  const onChange = e => {
    const input = e.currentTarget.value;
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
    console.log(e.currentTarget.innerText)
    console.log(e.currentTarget.value)

    const tag = {
      id: e.currentTarget.value,
      name: e.currentTarget.innerText
    }

    filterTags.push(tag)
    setFiltertags(filterTags)
    updateSelectList()

  };

    const updateSelectList = () => {
      const att = filterTags && filterTags.length > 0 && filterTags.map(x => {
        const tagColor = getTagColor(x?.categoryId);
        return(<InputTag styles={{ backgroundColor: `${tagColor}`}}>{x.name} {x.id}</InputTag>);
        })
      console.log("att: ",att)
      setTags(att)
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
          <li value={suggestion.id} className={className} key={suggestion.id} onClick={onClick}>
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
        <input
          type="text"
          onChange={onChange}
          // onKeyDown={onKeyDown}
          value={userInput}
          placeholder='Pesquisa por tag'
        />
        {suggestionsListComponent}
      </Fragment>
    </div>
  );
}

export default Autocomplete;
