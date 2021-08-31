import {GET_USERS, GET_USER, USER_ERROR, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS} from './users.types';

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
