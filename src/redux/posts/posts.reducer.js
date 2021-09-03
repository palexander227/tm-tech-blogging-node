import {
  GET_POSTS,
  GET_POST,
  GET_TOP_POSTS,
  GET_TAG_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST_REQ,
  INITIAL_STATE,
  UPDATE_POST,
  ADD_POST_REQ,
  UPDATE_POST_REQ
} from './posts.types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_TOP_POSTS:
    case GET_TAG_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        count: action.payload.count,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
      case UPDATE_POST:
        let posts = state.posts.map(post=>
          action.payload.id === post.id ? action.payload : post
        )
        return {
          ...state,
          posts: posts,
          loading: false,
        };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_POST_REQ:
    case ADD_POST_REQ:
    case UPDATE_POST_REQ:
      return {
        ...state,
        loading: true
      }
    case INITIAL_STATE:
      return {
        ...initialState
      }
    default:
      return state;
  }
}
