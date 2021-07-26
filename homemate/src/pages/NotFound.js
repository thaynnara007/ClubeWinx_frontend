import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <Link to="/posts">Back to the homepage.</Link>
    </>
  );
}

export default NotFound;
