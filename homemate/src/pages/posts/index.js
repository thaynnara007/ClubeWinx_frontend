import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FlipCard from '../../components/flipCard';
import Loading from '../../components/loading';
import api from '../../api';
import imgLoading from '../../img/loading.gif';
import './posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const loadingStyle = { marginTop: '400px' };
  const imgLoadingStyle = {
    position: 'fixed',
    bottom: '0px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '40px',
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight ||
      currentPage === totalPages ||
      isLoading
    ) {
      return;
    }

    setCurrentPage(currentPage + 1);
  }

  function getPosts() {
    setIsLoading(true);
    api
      .get(`/user/poster?page=${currentPage}&pageSize=${postsPerPage}`)
      .then((response) => {
        setTotalPages(response.data.pages);
        setPosts([...posts, ...response.data.rows]);
        setIsLoading(false);
      })
      .catch((error) => {
        let msg = '';
        if (error.response) msg = error.response.data.error;
        else msg = 'Network failed';
        setIsLoading(false);
        toast.error(msg);
      });
  }

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      {isLoading && currentPage === 1 ? (
        <Loading style={loadingStyle} />
      ) : (
        <>
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
            {isLoading && currentPage > 1 && (
              <img style={imgLoadingStyle} alt="loading" src={imgLoading} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Posts;
