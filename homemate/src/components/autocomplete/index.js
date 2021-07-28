import React, { Fragment, useState } from 'react';
import { getTagColor } from '../../utils/functions';
import useFetch from '../../hooks/useFetch';
import Input from '../input';
import Button from '../button';
import ScrollBox from '../scrollBox';
import InputTag from '../inputTag';

import './autocomplete.css';

const tagsBoxStyle = {
  display: {
    gridColumn: '1 / 3',
    gridRow: '5 / 7',
    width: '100%',
    height: '100%',
    border: '2px solid #cbdae5',
    borderRadius: '8px',
    justifySelf: 'center',
  },
  item: {
    height: 'fit-content',
  },
};

function Autocomplete(props) {
  const { tags, setTags, creatTag, deleteTag, profileTag, setProfileTag } = props;
  const { data: suggestions } = useFetch('/tag');

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [category, setCategory] = useState('1');
  const [newTag, setNewTag] = useState(-1);

  const onChange = (input) => {
    const filteredSuggestionsChange = input
      ? suggestions.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1 &&
            suggestion.categoryId === parseInt(category, 10)
        )
      : [];
    setFilteredSuggestions(filteredSuggestionsChange);
    setUserInput(input);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setUserInput('');

    const tagId = e.currentTarget.value;
    const tag = suggestions.find((input) => input.id === tagId);

    if (!tags.has(tag.id)) {
      setProfileTag((prev) => [...prev, tag]);
      tags.add(tag.id);
      setTags(tags);
    }
  };

  const changeCategory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const suggestionsListComponent =
    filteredSuggestions.length > 0 ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestions.id} value={suggestion.id} onClick={onClick}>
            {suggestion.name}
          </li>
        ))}
      </ul>
    ) : (
      []
    );

  const createTag = () => {
    const inputName = userInput;
    const tag = {
      id: newTag,
      name: inputName,
      categoryId: category,
    };
    if (tag) {
      setProfileTag((prev) => [...prev, tag]);
      tags.add(newTag);
      setNewTag(newTag - 1);
    }
    setFilteredSuggestions([]);
    setUserInput('');
  };

  return (
    <>
      <select onChange={changeCategory} value={category.toString()}>
        <option value="1">Moradia</option>
        <option value="2">Saúde</option>
        <option value="3">Estudante</option>
        <option value="4">Curso</option>
        <option value="5">Animais</option>
        <option value="6">Minorias</option>
        <option value="7">Sobre você</option>
      </select>
      <>
        <Input
          styles={{ label: { color: 'black' } }}
          name="Buscar tags"
          value={userInput}
          onChange={onChange}
        />
        {suggestionsListComponent}
      </>
      <ScrollBox styles={tagsBoxStyle}>
        {profileTag && profileTag.length > 0
          ? profileTag.map((tag) => {
              const tagColor = getTagColor(tag?.categoryId);
              return (
                <InputTag
                  key={tag.id}
                  styles={{ backgroundColor: `${tagColor}` }}
                  id={tag.id}
                  clickTag={deleteTag}
                >{`${tag?.name}`}</InputTag>
              );
            })
          : []}
      </ScrollBox>
      {creatTag ? (
        <>
          <Button onClick={createTag}>Criar Tag</Button>
        </>
      ) : (
        []
      )}
    </>
  );
}

export default Autocomplete;
