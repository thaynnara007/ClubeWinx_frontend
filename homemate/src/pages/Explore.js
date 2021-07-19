import React from 'react';
import '../components/picture/picture.css';
import Autocomplete from "../components/autocomplete";
import { useState } from 'react';


function Explore() {
  const [tags, setTags] = useState([]);

  return (
    <div>
      {tags}
      <p></p>
      <Autocomplete tags={tags} setTags={setTags} />
    </div>
  );
}

export default Explore;
