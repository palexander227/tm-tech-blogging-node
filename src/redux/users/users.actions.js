import {
  GET_USERS,
  GET_USER, USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from './users.types';

import axios from 'axios';

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Get user
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/${id}`);

    console.log(res.data);
    dispatch({
      type: GET_USER,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Update user
export const updateUser = ({firstName, lastName}) => async (dispatch) => {
  const body = {firstName, lastName};
  try {
    const res = await axios.put(`/api/user`, body);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Delete user
export const deleteUser = () => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/user`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
