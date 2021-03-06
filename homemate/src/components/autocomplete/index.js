/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';

import { getTagColor } from '../../utils/functions';
import useFetch from '../../hooks/useFetch';
import Input from '../input';
import ScrollBox from '../scrollBox';
import InputTag from '../inputTag';
import IconAdd from '../icons/iconAdd';

import './autocomplete.css';

const tagsBoxStyle = {
  display: {
    width: '100%',
    height: '150px',
    border: '2px solid #cbdae5',
    borderRadius: '8px',
    justifySelf: 'center',
    marginTop: '40px',
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

  const shouldCreateTag = !!creatTag;
  const styleText = shouldCreateTag ? 'suggestions' : 'suggestions suggestions-type-2';

  const onChange = (input) => {
    const categories = shouldCreateTag ? [parseInt(category, 10)] : [1, 2, 3, 4, 5, 6, 7];

    const filteredSuggestionsChange = input
      ? suggestions.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1 &&
            categories.includes(suggestion.categoryId)
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
      <ul className={styleText}>
        {filteredSuggestions.map((suggestion) => (
          <li value={suggestion.id} onClick={onClick} key={suggestion.id}>
            {suggestion.name}
          </li>
        ))}
      </ul>
    ) : (
      []
    );

  const createTag = () => {
    const inputName = userInput;

    if (inputName && inputName !== '') {
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
    }
  };

  return (
    <>
      {shouldCreateTag && (
        <select
          onChange={changeCategory}
          value={category.toString()}
          className="autocomplete-select"
        >
          <option value="1" className="autocomplete-select-option">
            Moradia
          </option>
          <option value="2">Sa??de</option>
          <option value="3">Estudante</option>
          <option value="4">Curso</option>
          <option value="5">Animais</option>
          <option value="6">Minorias</option>
          <option value="7">Sobre voc??</option>
        </select>
      )}
      <>
        <Input name="BUSCAR TAGS" value={userInput} onChange={onChange} onClick={createTag}>
          {shouldCreateTag && <IconAdd />}
        </Input>
        {suggestionsListComponent}
      </>
      <ScrollBox styles={tagsBoxStyle}>
        {profileTag && profileTag.length > 0
          ? profileTag.map((tag) => {
              const tagColor = getTagColor(parseInt(tag?.categoryId, 10));
              return (
                <div style={{ width: 'fit-content', height: 'fit-content' }} key={tag?.id}>
                  <InputTag
                    styles={{ backgroundColor: `${tagColor}` }}
                    id={tag.id}
                    clickTag={deleteTag}
                  >{`${tag?.name}`}</InputTag>
                </div>
              );
            })
          : []}
      </ScrollBox>
    </>
  );
}

export default Autocomplete;
