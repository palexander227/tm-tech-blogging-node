import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, updateInitialState } from '../../redux/posts/posts.actions';
import { Link } from 'react-router-dom';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import InfiniteScroll from 'react-infinite-scroll-component';
import './HomePage.styles.scss';
import { Redirect } from 'react-router-dom';
import { post } from 'jquery';

const HomePage = ({ getPosts, updateInitialState, post: { posts, loading, count }, match, auth: { user, isAuthenticated } }) => {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [isUser, setUser] = useState(false);

  useEffect(() => {
    return () => {
      updateInitialState();
    }
  }, [])

  useEffect(() => {
    if (match.url === '/dashboard') {
      setUser(true);
      if (user) getPosts(user.id);
    } else {
      setUser(false);
      getPosts();
    }
  }, [getPosts, user, match.url]);

  useEffect(() => {
    if (!posts.length) setHasMore(false);
    else setHasMore(true);
  }, [posts]);

  const fetchMoreData = () => {
    if (posts.length >= count) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
    (isUser) ? getPosts(user.id, page) : getPosts(null, page);
  }
  if (isUser && !isAuthenticated && !loading) {
    return <Redirect to="/login" />
  }
  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div className='container-fluid'>
        <div className="post-create-btn mr-5">
          {isUser && <Link className="btn btn-primary" to="add/post">Create New Post</Link>}
        </div>
        <div className='dsafsdf' >
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            className='style-post-card'
          >
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </InfiniteScroll>
          {!posts.length &&
            <div className="text-center p-5">We couldn't found any blog</div>
          }
        </div>
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  updateInitialState: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, updateInitialState })(HomePage);
