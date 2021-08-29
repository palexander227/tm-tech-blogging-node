import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import './PostItem.styles.scss';
import {Link} from 'react-router-dom';

const PostItem = ({
  post,
}) => {
  const {id, title, content, createdAt, user: {firstName, lastName}, image} = post;
  return (
    <div className='posts'>
      <div className="row">
        <div className="profile-image">
            {firstName.charAt(0) + lastName.charAt(0)}
        </div>
        <div className="user-info ml-2 my-auto">{firstName} {lastName}</div>
      </div>
      <div className="row">
        <div className="col-6">
          <Link className="title mb-2" to={`post/${id}`}>{title}</Link>
          <div className="content mb-2">{content?.replace(/<[^>]*>/g, "")}</div>
          <div className="created-date">{moment(createdAt).fromNow(false)}</div>
        </div>
        {image && <div className="col-6">
          <img src={image} alt="" className="thumnail"/>
        </div>}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
