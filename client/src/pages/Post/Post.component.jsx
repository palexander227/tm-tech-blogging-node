import React, {useEffect, Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPost, deletePost} from '../../redux/posts/posts.actions';
import {getComments, addComment, deleteComment} from '../../redux/comments/comments.actions';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner.component';
import { Dropdown } from 'react-bootstrap';
import IframeResizer from 'iframe-resizer-react';
import './Post.styles.scss';

const Post = ({getPost, post, comments, match, getComments, addComment, deleteComment, deletePost, auth: {user}}) => {
  const {loading, post: postData} = post;
  const [content, setContent] = useState('');
  const [contents, setContents] = useState('');
  const ref = React.useRef();
  const [height, setHeight] = React.useState("0px");
  const onLoad = () => {
    console.log(ref.current.style)
    ref.current.style.height = ref.current.contentWindow.document.body.scrollHeight + "px";
    setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
  };
  let firstName = '';
  let lastName = '';
  if (postData && postData.user) {
    
    firstName = postData.user.firstName;
    lastName = postData.user.lastName;
  }
  useEffect(() => {
    getPost(match.params.id);
    getComments(match.params.id);
    // eslint-disable-next-line
  }, [getPost]);

  useEffect(()=>{
    if(postData && postData.content) {
      const embed = postData.content;

      const stringToHTML = function(str) {
        const domContainer = document.createElement("span");
        domContainer.innerHTML = str;
        return domContainer;
      };

      const parentEmbed = stringToHTML(embed);

      let oldIframe = parentEmbed.querySelectorAll("oembed");
      oldIframe = Array.from(oldIframe);

      for (const i in oldIframe) {
        //Get the url from oembed tag
        let url = oldIframe[i].getAttribute("url");
        //Replace 'watch?v' with 'embed/'
        url = url.replace("watch?v=", "embed/");

        //Create a iframe tag
        const newIframe = document.createElement("iframe");
        newIframe.setAttribute("width", "100%");
        newIframe.setAttribute("height", "auto");
        newIframe.setAttribute("allowFullScreen", "");
        newIframe.setAttribute("frameBorder", 0);
        if (url) {
          newIframe.setAttribute("src", url);
        }
        // replace oldIframe with newIframe
        oldIframe[i].parentNode.replaceChild(newIframe, oldIframe[i]);
      }

      const contentToRender = parentEmbed.outerHTML;
      setContents(contentToRender);
      let doc = document.getElementById('iframe').contentWindow.document;
      console.log(contentToRender)
      doc.open();
      doc.write(contentToRender);
      doc.close();
    }
  },[postData])

  const handleChange = (e) => {
    setContent(e.target.value);
  }

  const handleSubmit = (e) => {
    if (content) {
      addComment({content, postId: match.params.id});
      setContent('');
    }
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <i 
      className="fa fa-ellipsis-h my-auto ml-5"
      aria-hidden="true"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </i>
  ));
 
  return loading || postData === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <PageTitle title={`${postData.title} - Tech Blog`} />
      <div id='mainbar' className='post py-5'>
        <div className="row mx-0 mb-4">
          <div className="profile-image">
              {firstName.charAt(0) + lastName.charAt(0)}
          </div>
          <div className="user-info ml-2 my-auto">{firstName} {lastName}</div>
          <div className="created-date my-auto ml-2">{moment(postData.createdAt).fromNow(false)}</div>
          {user && user.id === postData.userId && <Dropdown className="my-auto">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-post">
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/add/post/${match.params.id}`}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={()=>deletePost(match.params.id)} href={`/`}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>}
        </div>
        
        <div className='row mx-0 mb-3'>
          <div className="title col-12 mb-3">{postData.title}</div>
          <div className="content col-12">
            <iframe ref={ref}
              onLoad={onLoad}
              id="iframe"
              width="100%"
              height={height}
              scrolling="no"
              frameBorder="0"
              style={{
                width: "100%",
                overflow: "auto",
                height: {height}
              }}/>
          </div>
        </div>
        <div className='row mx-0 mb-3'>
          <div className="col-12"><i className="fa fa-comment"></i></div>
        </div>
        <div className="comments-section">
          <div className="comment-enter mb-3">
            <div className="row mx-0 mb-4">
              <div className="profile-image mr-3 profile-25">
                  {firstName.charAt(0) + lastName.charAt(0)}
              </div>
              <textarea className="form-control col-10" name="content" id="comment-value" rows="2" onChange={handleChange}></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>comment</button>
          </div>
          {comments.map(comment=>{
            const {user: {firstName, lastName}, createdAt, content, id} = comment
            return (
              <div className="comment-container mb-4">
                <div className="row mx-0">
                  <div className="profile-image">
                      {firstName.charAt(0) + lastName.charAt(0)}
                  </div>
                  <div className="user-info ml-2 my-auto">{firstName} {lastName}</div>
                  <div className="created-date my-auto ml-2">{moment(createdAt).fromNow(false)}</div>
                  {user && user.id === post.userId && <Dropdown className="my-auto">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-comment">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>deleteComment(id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  }
                </div>
                <div className="comment-content pl-4">
                  {content}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  comments: state.comment.comments,
  auth: state.auth
});

export default connect(mapStateToProps, {getPost, getComments, addComment, deleteComment, deletePost})(Post);
