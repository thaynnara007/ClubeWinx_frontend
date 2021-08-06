import React, { useEffect, useRef, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import Autocomplete from '../autocomplete';
import Button from '../button';
import Input from '../input';

import './filter.css';

const PurpleRadio = withStyles({
  root: {
    '&$checked': {
      color: '#8566AA',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function filter(props) {
  const { setQuery, filterPost } = props;

  const [tagsSet, setTagsSet] = useState(new Set());
  const [profileTag, setProfileTag] = useState([]);
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [expense, setExpense] = useState();
  const [expenseOp, setExpenseOp] = useState('min');
  const [residents, setResidents] = useState();
  const [residentsOp, setResidentsOp] = useState('min');
  const [vacancies, setVacancies] = useState();
  const [vacanciesOp, setVacanciesOp] = useState('min');
  const [bathrooms, setBathrooms] = useState();
  const [bathroomsOp, setBathroomsOp] = useState('min');
  const [beds, setBeds] = useState();
  const [bedsOp, setBedsOp] = useState('min');

  const [autocompletePosition] = useState();
  const containerRef = useRef(null);

  function updateQuery() {
    let newQuery = '';

    if (tagsSet) {
      tagsSet.forEach((tag) => {
        newQuery = `${newQuery}'&tags='${tag}`;
      });
    }

    if (city) newQuery += `&city=${city}`;

    if (state) newQuery += `&state=${state}`;

    if (district) newQuery += `&district=${district}`;

    if (city) newQuery += `&city=${city}`;

    if (expense) newQuery += `&expense=${expense}&expenseOp=${expenseOp}`;

    if (residents) newQuery += `&residents=${residents}&residentsOp=${residentsOp}`;

    if (vacancies) newQuery += `&vacancies=${vacancies}&vacanciesOp=${vacanciesOp}`;

    if (bathrooms) newQuery += `&bathrooms=${expense}&bathroomsOp=${bathroomsOp}`;

    if (beds) newQuery += `&beds=${expense}&bedsOp={bedsOp}`;

    setQuery(newQuery);
    filterPost(newQuery);
  }

  // useEffect(() => {
  //   updateQuery()
  // }, [tagsSet]);
  /*
  useEffect(() => {
    if (containerRef.current) {
      const position = containerRef.current.getBoundingClientRect().top;
      console.log(position, window.innerHeight);
      //setAutocompletePosition(window.innerHeight - position + 100);
    }
  }, [containerRef]); */

  function removeTag(tag) {
    tagsSet.delete(tag);
    setProfileTag((prev) => prev.filter((e) => e.id !== tag));
  }

  const expenseOpChange = (event) => {
    setExpenseOp(event.target.value);
  };

  const residentsOpChange = (event) => {
    setResidentsOp(event.target.value);
  };

  const vacanciesOpChange = (event) => {
    setVacanciesOp(event.target.value);
  };

  const bathroomsOpChange = (event) => {
    setBathroomsOp(event.target.value);
  };

  const bedsOpChange = (event) => {
    setBedsOp(event.target.value);
  };

  return (
    <div ref={containerRef} id="filter-container" style={{ height: autocompletePosition }}>
      <Autocomplete
        profileTag={profileTag}
        setProfileTag={setProfileTag}
        deleteTag={removeTag}
        creatTag={false}
        tags={tagsSet}
        setTags={setTagsSet}
      />
      <FormControl component="fieldset">
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Cidade"
            value={city}
            onChange={setCity}
          />
          <Input
            styles={{ label: { color: 'black' } }}
            name="Estado"
            value={state}
            onChange={setState}
          />
        </div>
        <Input
          styles={{ label: { color: 'black' } }}
          name="Bairro"
          value={district}
          onChange={setDistrict}
        />
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Custo"
            value={expense}
            onChange={setExpense}
          />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={expenseOp}
            onChange={expenseOpChange}
          >
            <FormControlLabel value="min" control={<PurpleRadio />} label="min" />
            <FormControlLabel value="max" control={<PurpleRadio />} label="max" />
          </RadioGroup>
        </div>
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Residentes"
            value={residents}
            onChange={setResidents}
          />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={residentsOp}
            onChange={residentsOpChange}
          >
            <FormControlLabel value="min" control={<PurpleRadio color="#8566AA" />} label="min" />
            <FormControlLabel value="max" control={<PurpleRadio />} label="max" />
          </RadioGroup>
        </div>
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Quartos"
            value={vacancies}
            onChange={setVacancies}
          />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={vacanciesOp}
            onChange={vacanciesOpChange}
          >
            <FormControlLabel value="min" control={<PurpleRadio />} label="min" />
            <FormControlLabel value="max" control={<PurpleRadio />} label="max" />
          </RadioGroup>
        </div>
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Banheiros"
            value={bathrooms}
            onChange={setBathrooms}
          />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={bathroomsOp}
            onChange={bathroomsOpChange}
          >
            <FormControlLabel value="min" control={<PurpleRadio />} label="min" />
            <FormControlLabel value="max" control={<PurpleRadio />} label="max" />
          </RadioGroup>
        </div>
        <div class="teste">
          <Input
            styles={{ label: { color: 'black' } }}
            name="Camas"
            value={beds}
            onChange={setBeds}
          />
          <RadioGroup aria-label="gender" name="gender1" value={bedsOp} onChange={bedsOpChange}>
            <FormControlLabel value="min" control={<PurpleRadio />} label="min" />
            <FormControlLabel value="max" control={<PurpleRadio />} label="max" />
          </RadioGroup>
        </div>
        <Button onClick={updateQuery}>Filtrar</Button>
      </FormControl>
    </div>
  );
}

export default filter;
