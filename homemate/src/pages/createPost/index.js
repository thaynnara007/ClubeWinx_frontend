/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useHistory, useLocation } from 'react-router';

import AddTag from '../../components/addTag';
import TabBar from '../../components/tabBar';
import NewPost from '../../components/newPost';
import Flex from '../../components/flex';
import IconArrowLeft from '../../components/icons/iconArrowLeft';
import Loading from '../../components/loading';
import useFetch from '../../hooks/useFetch';

import './createPost.css';

function CreatePost() {
  const history = useHistory();
  const { pathname } = useLocation();
  const tabTitle = pathname === '/post/edit' ? 'EDITAR ANÚNCIO' : 'CRIAR ANÚNCIO';

  const [choosedTab, setChoosedTab] = useState(tabTitle);
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: post, isLoading2 } =
    pathname === '/post/edit' ? useFetch('/user/poster/my') : { data: {}, isLoading: false };
  const { data: address, isLoading } = useFetch('/address/me');

  const postData = {
    expense: post?.expense,
    description: post?.description,
    residents: post?.residents,
    vacancies: post?.vacancies,
    bathrooms: post?.bathrooms,
    beds: post?.beds,
    address: address ?? {},
  };

  const handleClickCreatePost = () => {
    setIsFlipped(false);
    setChoosedTab(tabTitle);
  };

  const handleClickAddTag = () => {
    setIsFlipped(true);
    setChoosedTab('ADICIONAR TAGS');
  };

  const homepage = () => {
    window.location.replace('/posts');
  };

  const back = (
    <button
      type="button"
      className="arrow-left-icon-button"
      onClick={() =>
        pathname === '/post/edit' ? history.push('/posts/my') : history.push('/profile/me')
      }
    >
      <IconArrowLeft styles={{ color: '#FFFFFF' }} />
    </button>
  );

  return (
    <div className="homepage-background createPost-background">
      {isLoading || isLoading2 ? (
        <Loading />
      ) : (
        <Flex styles={{ width: '50%', margin: '0 auto' }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/homemate-55271.appspot.com/o/homemate.png?alt=media&token=d17bf811-1be1-4aa3-8ddd-a366e0326d90"
            className="homepage-logo"
            alt="homemate's logo"
            style={{ cursor: 'pointer' }}
            onClick={() => homepage()}
          />
          <TabBar
            choosed={choosedTab}
            styles={{ top: '160px' }}
            actions={[() => {}, handleClickCreatePost, handleClickAddTag]}
          >
            {[back, tabTitle, 'ADICIONAR TAGS']}
          </TabBar>
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            containerStyle={{ width: '50%', marginTop: '100px' }}
          >
            <Flex styles={{ width: '100%' }}>
              <NewPost post={postData} isEdit={pathname === '/post/edit'} />
            </Flex>

            <Flex styles={{ width: '100%' }}>
              <AddTag post={post}/>
            </Flex>
          </ReactCardFlip>
        </Flex>
      )}
    </div>
  );
}

export default CreatePost;
