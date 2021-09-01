import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPost } from '../../redux/posts/posts.actions';
import Spinner from '../../components/Spinner/Spinner.component';

import './PostForm.styles.scss';
import AskForm from './AskForm/AskForm.component';

const PostForm = ({ auth, auth: { isAuthenticated, loading }, match, getPost }) => {

  useEffect(() => {
    getPost(match.params.id);
  }, [])

  if (!isAuthenticated && !loading) {
    return <Redirect to='/login' />;
  }

  return loading === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div className='post-form-container pb-5'>
        <div className='post-form-content col-md-6 col-12 justify-content-center'>
          <div className='post-form-header'>
            <div className='post-form-headline fc-black-800'>
              Create new blog
            </div>
          </div>
          <div className='post-form-section'>
            <div className='post-form' style={{ width: '100%' }}>
              <AskForm postId={match.params.id} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(PostForm);
