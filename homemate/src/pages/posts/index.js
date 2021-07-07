import FlipCard from '../../components/flipCard';
import useFetch from '../../hooks/useFetch';
import './posts.css';

function Posts() {
  const { data: posts } = useFetch('/user/poster');

  return (
    <div className="posts-container">
      {posts &&
        posts.map((post) => (
          <FlipCard
            key={post.id}
            state={post.owner.address.state}
            city={post.owner.address.city}
            district={post.owner.address.district}
            street={post.owner.address.street}
            number={post.owner.address.number}
            pictureUrl="https://images.unsplash.com/photo-1529408686214-b48b8532f72c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=986e2dee5c1b488d877ad7ba1afaf2ec&auto=format&fit=crop&w=1350&q=80"
            price={post.expense}
            people={post.residents}
            rooms={5}
            beds={3}
            bathrooms={2}
            description={post.description}
          />
        ))}
    </div>
  );
}

export default Posts;
