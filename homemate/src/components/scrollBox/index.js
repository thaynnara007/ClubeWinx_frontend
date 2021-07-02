/* eslint-disable react/no-array-index-key */
import './scrollBox.css';

function ScrollBox({ children, styles }) {
  return (
    <div className="scroll-box-container" style={styles?.display ?? {}} role="list">
      {children.map((child, i) => (
        <div key={`scroll-box-item-${i}`} style={styles?.item ?? {}}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default ScrollBox;
