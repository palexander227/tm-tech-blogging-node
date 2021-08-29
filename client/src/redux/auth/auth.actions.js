import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './auth.types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data.users[0],
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({firstName, lastName, username, password}) => async (dispatch) => {

  const body = {firstName, lastName, username, password};

  try {
    const res = await axios.post('/api/user/register', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({username, password}) => async (dispatch) => {

  const body = {username, password};

  try {
    const res = await axios.post('/api/user/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch(setAlert('User has logged out', 'success'));
  localStorage.removeItem('token');

  dispatch({type: LOGOUT});
};
