import React, { useEffect, useRef, useState } from 'react';
import Autocomplete from '../autocomplete';

import './filter.css';

function filter() {
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [tagsSet, setTagsSet] = useState(new Set());
  const [tagsInit, setTagsInit] = useState(new Set());
  const [profileTag, setProfileTag] = useState([]);

  const [autocompletePosition, setAutocompletePosition] = useState();

  function removeTagP(tag) {
    tagsSet.delete(tag);
    setProfileTag((prev) => prev.filter((e) => e.id !== tag));
  }

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const position = containerRef.current.getBoundingClientRect().top;
      console.log(position, window.innerHeight);
      setAutocompletePosition(window.innerHeight - position);
    }
  }, [containerRef]);

  return (
    <div ref={containerRef} id="filter-container" style={{ height: autocompletePosition }}>
      <Autocomplete
        profileTag={profileTag}
        setProfileTag={setProfileTag}
        deleteTag={removeTagP}
        creatTag={false}
        tags={tagsSet}
        setTags={setTagsSet}
      />
    </div>
  );
}

export default filter;
