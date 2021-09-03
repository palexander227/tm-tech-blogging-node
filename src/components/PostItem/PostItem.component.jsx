import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import './PostItem.styles.scss';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner.component';

const PostItem = ({
  post,
}) => {
  const { id, title, content, createdAt, user, image } = post;
  return !user ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <div className="card style-card">
      <img height='200px' src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title"><Link className="style-title mb-2" to={`post/${id}`}>{title}</Link></h5>
        <div className="user-info my-auto">{user.firstName} {user.lastName}</div>
        <div className="created-date">{moment(createdAt).fromNow(false)}</div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
