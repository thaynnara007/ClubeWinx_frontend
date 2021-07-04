import './text.css';

function Text({ children, styles }) {
  return (
    <p className="style-text" style={styles}>
      {children}
    </p>
  );
}

export default Text;
