import React, { useState } from 'react';
import './inputTag.css';

function InputTag(props) {
  const { children, clickTag = () => '', styles } = props;
  const [tagValue, setTagValue] = useState(truncateTag(children));
  const [expanseTag, setExpanseTag] = useState("(...)");
  const [truncate, setTruncate] = useState(false);

  function truncateTag(tag) {
    if(tag.length > 10) { 
      return  children.slice(0,9)
    } else {
      return tag;
    }
  }

  function changeTag(tag) {
    setTruncate(true);
    if(tag !== children) { 
      setTagValue(children);
      setExpanseTag('<<<');
    } else {
      setTagValue(children.slice(0,9));
      setExpanseTag('(...)');
    }
  }
truncateTag(children);
  return (
    <div class='components-inputTag-tag' style={styles?? {}}>
      <span onClick={() => clickTag(children)}>
        {tagValue} 
      </span>
      {truncate || children !== tagValue ? <span onClick={() => changeTag(tagValue)}>{expanseTag}</span> : ""} 
    </div>
  );
}
export default InputTag;
