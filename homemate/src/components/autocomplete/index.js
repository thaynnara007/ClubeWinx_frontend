import React, { Fragment, useState  } from "react";
import useFetch from '../../hooks/useFetch';
import Input from '../input';
import Button from '../button';

import "./autocomplete.css";

function Autocomplete(props) {
  const { tags, setTags} = props
  const { data: suggestions } = useFetch('/tag');

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [category, setCategory] = useState('');

  const onChange = input => {
    const filteredSuggestionsChange = input
    ?
    suggestions.filter(
      suggestion =>
      suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1 && suggestion.categoryId == category
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

  const changeCategory = e => {
    console.log(e.currentTarget.value);
    setCategory(e.currentTarget.value);
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


  const newTag = () => {
    const inputName = userInput;
    const tag = {
      id: -1,
      name: inputName,
      categoryId: category
    }
    console.log(tag)
    if(tag){
      setTags((prev) => [...prev, tag])
    }
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

      <select onChange={changeCategory} value={category.toString()}>
        <option value="1">Moradia</option>
        <option value="2">Saúde</option>
        <option value="3">Estudante</option>
        <option value="4">Curso</option>
        <option value="5">Animais</option>
        <option value="6">Minorias</option>
        <option value="7">Sobre você</option>
      </select>

      <Button onClick={newTag}>Criar Tag</Button>
    </div>
  );
}

export default Autocomplete;