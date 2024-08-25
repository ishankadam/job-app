import { combineReducers } from "redux";
import authReducer from "../pages/login/auth/authReducer";
import jobReducer from "../pages/jobs/jobAuth/jobReducer";
import sessionReducer from "../session-auth/sessionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
  session: sessionReducer,
  // Add other reducers here
});

export default rootReducer;
