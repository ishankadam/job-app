import { verifyToken } from "../api";
import { getToken } from "../auth";
import { SESSION_EXPIRED, SESSION_VALID } from "./sessionReducer";

export const sessionExpired = () => ({
  type: SESSION_EXPIRED,
});

export const sessionValid = () => ({
  type: SESSION_VALID,
});

export const validateToken = () => async (dispatch) => {
  const authToken = getToken();

  if (!authToken) {
    dispatch(sessionExpired());
    return;
  }

  try {
    const response = await verifyToken(authToken);
    if (response) {
      dispatch(sessionValid());
    } else {
      dispatch(sessionExpired());
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    dispatch(sessionExpired());
  }
};
