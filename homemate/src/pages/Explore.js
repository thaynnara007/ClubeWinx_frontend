import React from 'react';
import '../components/picture/picture.css';
import Autocomplete from "../components/autocomplete";
import { useState } from 'react';


function Explore() {
  const [tagsFormmated, setTagsFormmated] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <div>
      {tagsFormmated}
      <p></p>
      <Autocomplete tagsFormmated={tagsFormmated} setTagsFormmated={setTagsFormmated} tags={tags} setTags={setTags} />
    </div>
  );
}

export default Explore;
