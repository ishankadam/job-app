import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./authAction";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user,
        loading: false,
      };
    case LOGIN_FAILURE:
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.email.endsWith("@alphawarenext.com"),
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
