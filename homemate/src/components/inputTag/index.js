import React, { useState } from 'react';
import './inputTag.css';

function InputTag(props) {
  const truncateTag = (tag) => {
    if (tag.length > 10) {
      return tag.slice(0, 9);
    }
    return tag;
  };

  const { children, clickTag = () => '', styles } = props;
  const [tagValue, setTagValue] = useState(truncateTag(children));
  const [expanseTag, setExpanseTag] = useState('(...)');
  const [truncate, setTruncate] = useState(false);

  const changeTag = (tag) => {
    setTruncate(true);
    if (tag !== children) {
      setTagValue(children);
      setExpanseTag('<<<');
    } else {
      setTagValue(children.slice(0, 9));
      setExpanseTag('(...)');
    }
  };

  truncateTag(children);
  return (
    <div className="components-inputTag-tag" style={styles ?? {}}>
      <span className="components-inputTag-font" onClick={() => clickTag(children)}>
        {tagValue}
      </span>
      {truncate || children !== tagValue ? (
        <span onClick={() => changeTag(tagValue)}>{expanseTag}</span>
      ) : (
        ''
      )}
    </div>
  );
}
export default InputTag;
