import React, { Fragment, useState } from "react";
import "./autocomplete.css";

function Autocomplete(props) {
  const { suggestions ,filterTags, setFiltertags } = props;
  const [activeSuggestion, setActiveSuggestion] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selecionado, setSelecionado] = useState([]);

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
    setSelecionado(selecionado.concat([activeSuggestion]));
    setActiveSuggestion(activeSuggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput("");
    console.log(e.currentTarget.innerText)
    console.log(e.currentTarget.value)
    const tag = {
      id: e.currentTarget.value.id,
      name: e.currentTarget.innerText
    }
    filterTags.push(tag)
    console.log(filterTags.length > 0)
    console.log(filterTags)
    // console.log(e.target.value)
    // console.log(selecionado)
    // console.log(filterTags)

    // if (filterTags && filterTags.length > 0) {
    //   setFiltertags(filterTags.concat([selecionado]))  
    // } else {
    //   setFiltertags([selecionado]);
    // } 
  };

  // const onKeyDown = e => {

  //   if (e.keyCode === 13) {
  //     // this.setState({
  //     //   activeSuggestion: 0,
  //     //   showSuggestions: false,
  //     //   userInput: filteredSuggestions[activeSuggestion]
  //     // });
  //     setActiveSuggestion(0);
  //     setFilteredSuggestions(activeSuggestion.name);
  //     setShowSuggestions(false);
  //   } else if (e.keyCode === 38) {
  //     if (activeSuggestion === 0) {
  //       return;
  //     }
  //     // this.setState({ activeSuggestion: activeSuggestion - 1 });
  //     setActiveSuggestion(activeSuggestion - 1);

  //   }
  //   // User pressed the down arrow, increment the index
  //   else if (e.keyCode === 40) {
  //     if (activeSuggestion - 1 === filteredSuggestions.length) {
  //       return;
  //     }
  //     // this.setState({ activeSuggestion: activeSuggestion + 1 });
  //     setActiveSuggestion(activeSuggestion + 1);

  //   }
  // };

  const suggestionsListComponent = (filteredSuggestions.length)
    ?
    <ul class="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
        let className;
        // Flag the active suggestion with a class
        if (index === activeSuggestion) {
          className = "suggestion-active";
        }
        return (
          <li value={suggestion[index]} className={className} key={suggestion.id} onClick={onClick}>
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
    <Fragment>
      <input
        type="text"
        onChange={onChange}
        // onKeyDown={onKeyDown}
        value={userInput}
        placeholder='Pesquisa por tag'
      />
      {suggestionsListComponent}
      <h1>{selecionado}</h1>
    </Fragment>
  );
}

export default Autocomplete;
