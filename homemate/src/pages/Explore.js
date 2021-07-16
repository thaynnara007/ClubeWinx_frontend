import React from 'react';
import '../components/picture/picture.css';
import Autocomplete from "../components/autocomplete";
import { useState, useEffect } from 'react';
import api from '../api';

function Explore() {
  const [tags, setTags] = useState([]);
  const [filterTags, setFiltertags] = useState([]);

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

  const updateSelectList = () => {
    const att = filterTags && filterTags.length > 0 && filterTags.map(x => (<h1>{x.name}</h1>))
    console.log("att: ",att)
    setTags(att)
  }

  useEffect(() => {
    updateSelectList()
  }, [filterTags]);

  return (
    <div>
        { tags }
        <Autocomplete filterTags={filterTags} setFiltertags={setFiltertags} suggestions={teste}/>
    </div>
  );
}

export default Explore;
