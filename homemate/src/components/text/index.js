import './text.css';

function Text({ children , styles }) {

    return (
        <p className='style-text' styles={styles}>{children}</p>
    );
}

export default Text;