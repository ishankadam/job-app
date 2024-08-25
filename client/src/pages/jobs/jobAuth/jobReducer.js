// src/features/jobs/jobReducer.js
import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  EDIT_JOB_REQUEST,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_FAILURE,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
} from "./jobActions";

const initialState = {
  loading: false,
  jobs: [],
  error: "",
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
    case CREATE_JOB_REQUEST:
    case EDIT_JOB_REQUEST:
    case DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_JOBS_SUCCESS:
    case CREATE_JOB_SUCCESS:
    case EDIT_JOB_SUCCESS:
    case DELETE_JOB_SUCCESS:
      return {
        loading: false,
        jobs: action.payload, // Add the new job to the list
        error: "",
      };
    case FETCH_JOBS_FAILURE:
    case CREATE_JOB_FAILURE:
    case EDIT_JOB_FAILURE:
    case DELETE_JOB_FAILURE:
      return {
        loading: false,
        jobs: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default jobReducer;
