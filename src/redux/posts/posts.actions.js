import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import {
  GET_POSTS,
  GET_POST,
  GET_TOP_POSTS,
  GET_TAG_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST
} from './posts.types';

// Get posts
export const getPosts = (userId = null, page = 1) => async (dispatch, getState) => {
  const state = getState();
  try {
    const res = await axios.get(`/api/post/allpost?pageNo=${page}&userId=${userId}`);
    if (page && page !== 1) {
      res.data.posts = state.post.posts.concat(res.data.posts);
    }
    dispatch({
      type: GET_POSTS,
      payload: {posts: res.data.posts, count: res.data.count},
    });
  } catch (err) {
    /*dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });*/
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data.post,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//GET TAG POSTS
export const getTagPosts = (tagName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/tag/${tagName}`);

    dispatch({
      type: GET_TAG_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {

  try {
    const res = await axios.post('/api/post', formData);
    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(getPosts());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert(res.data.message, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Update post
export const updatePost = (formData, postId) => async (dispatch) => {

  try {
    const res = await axios.put(`/api/post/${postId}`, formData);
    dispatch({
      type: UPDATE_POST,
      payload: res.data.post,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(getPosts());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
