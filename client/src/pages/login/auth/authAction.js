import axios from "axios";
import { getUserInfo } from "../../../api";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action Creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    user,
    isAdmin: user.email.endsWith("@alphawarenext.com"),
  },
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logout = () => ({ type: LOGOUT });

// Thunks
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const user = response.data;
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
      const userId = localStorage.getItem("employeeId");
      const user = await getUserInfo(userId);

      dispatch({ type: FETCH_USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};
