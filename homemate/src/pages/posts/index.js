import FlipCard from '../../components/flipCard';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/loading';
import './posts.css';

function Posts() {
  const { data: posts, isLoading } = useFetch('/user/poster');
  const loadingStyle = { marginTop: '400px' };

  return (
    <>
      {isLoading ? (
        <Loading style={loadingStyle} />
      ) : (
        <div className="posts-container">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <FlipCard
                key={post.id}
                id={post.id}
                state={post.owner.address.state}
                city={post.owner.address.city}
                district={post.owner.address.district}
                street={post.owner.address.street}
                number={post.owner.address.number}
                pictureUrl={
                  Array.isArray(post.posterPictures) && post.posterPictures.length > 0
                    ? post.posterPictures[0].pictureUrl
                    : ''
                }
                price={post.expense}
                people={post.residents}
                rooms={5}
                beds={3}
                bathrooms={2}
                description={post.description}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Posts;
