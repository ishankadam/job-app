export const SESSION_EXPIRED = "SESSION_EXPIRED";
export const SESSION_VALID = "SESSION_VALID";

const initialState = {
  isTokenValid: true,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_EXPIRED:
      return {
        ...state,
        isTokenValid: false,
      };
    case SESSION_VALID:
      return {
        ...state,
        isTokenValid: true,
      };
    default:
      return state;
  }
};

export default sessionReducer;
