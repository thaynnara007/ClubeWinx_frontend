import React, { useState, useEffect } from 'react';
import './inputTag.css';

import IconDoubleArrowLeft from '../icons/iconDoubleArrowLeft';
import IconDoubleArrowRight from '../icons/iconDoubleArrowRight';

const expand = <IconDoubleArrowRight styles={{ color: '#F4F4F4' }} />;
const contract = <IconDoubleArrowLeft styles={{ color: '#F4F4F4' }} />;

function InputTag(props) {
  const truncateTag = (tag) => {
    if (tag.length > 10) {
      return tag.slice(0, 9);
    }
    return tag;
  };

  const { children, clickTag = () => '', styles, id } = props;
  const [tagValue, setTagValue] = useState(truncateTag(children));
  const [expanseTag, setExpanseTag] = useState(expand);
  const [truncate, setTruncate] = useState(false);

  useEffect(() => {
    function updateState() {
      setTagValue(truncateTag(children));
    }
    updateState();
  }, [children]);

  const changeTag = (tag) => {
    setTruncate(true);
    if (tag !== children) {
      setTagValue(children);
      setExpanseTag(contract);
    } else {
      setTagValue(children.slice(0, 9));
      setExpanseTag(expand);
    }
  };

  truncateTag(children);
  return (
    <div className="components-inputTag-tag" style={styles ?? {}}>
      <span className="components-inputTag-font" onClick={() => clickTag(id)}>
        {tagValue}
      </span>
      {truncate || children !== tagValue ? (
        <span style={{ marginLeft: '5px' }} onClick={() => changeTag(tagValue)}>
          {expanseTag}
        </span>
      ) : (
        ''
      )}
    </div>
  );
}
export default InputTag;
