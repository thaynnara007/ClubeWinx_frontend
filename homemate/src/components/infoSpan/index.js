import React from 'react';

import './infoSpan.css';

function InfoSpan({
  amountText = '0',
  amountTextSize = '36px',
  description,
  descriptionSize = '14px',
  spanColor = '#6983AA',
  children,
}) {
  return (
    <div className="info-span-info">
      <span
        style={{
          fontSize: amountTextSize,
          fontWeight: '700',
          fontFamily: 'Roboto',
          color: spanColor,
        }}
      >
        {amountText ?? 0}
      </span>
      <div style={{ marginLeft: '0.3em' }}>
        {children}
        <span
          className="info-span-icon-span"
          style={{ color: spanColor, fontSize: descriptionSize }}
        >
          {description}
        </span>
      </div>
    </div>
  );
}

export default InfoSpan;
