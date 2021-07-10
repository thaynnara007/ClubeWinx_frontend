import { useParams } from 'react-router-dom';
import './postDetails.css';

function PostDetails() {
  const { id } = useParams();

  return (
    <div className="post-details">
      <h2>Details about post whose id is {id}.</h2>
    </div>
  );
}

export default PostDetails;
