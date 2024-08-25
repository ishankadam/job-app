// src/features/jobs/jobActions.js

import { addJob, deleteJob, editJob, getAllJobs } from "../../../api";
import { sessionExpired } from "../../../session-auth/sesssionAction";

export const FETCH_JOBS_REQUEST = "FETCH_JOBS_REQUEST";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";
export const CREATE_JOB_REQUEST = "CREATE_JOB_REQUEST";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";
export const CREATE_JOB_FAILURE = "CREATE_JOB_FAILURE";
export const EDIT_JOB_REQUEST = "EDIT_JOB_REQUEST";
export const EDIT_JOB_SUCCESS = "EDIT_JOB_SUCCESS";
export const EDIT_JOB_FAILURE = "EDIT_JOB_FAILURE";
export const DELETE_JOB_REQUEST = "DELETE_JOB_REQUEST";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_FAILURE = "DELETE_JOB_FAILURE";

export const fetchJobsRequest = () => ({
  type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

export const createJobRequest = () => ({
  type: CREATE_JOB_REQUEST,
});

export const createJobSuccess = (job) => ({
  type: CREATE_JOB_SUCCESS,
  payload: job,
});

export const createJobFailure = (error) => ({
  type: CREATE_JOB_FAILURE,
  payload: error,
});

export const editJobRequest = () => ({
  type: EDIT_JOB_REQUEST,
});

export const editJobSuccess = (job) => ({
  type: EDIT_JOB_SUCCESS,
  payload: job,
});

export const editJobFailure = (error) => ({
  type: EDIT_JOB_FAILURE,
  payload: error,
});

export const deleteJobRequest = () => ({
  type: DELETE_JOB_REQUEST,
});

export const deleteJobSuccess = (job) => ({
  type: DELETE_JOB_SUCCESS,
  payload: job,
});

export const deleteJobFailure = (error) => ({
  type: DELETE_JOB_FAILURE,
  payload: error,
});

export const fetchJobs = () => {
  return async (dispatch) => {
    dispatch(fetchJobsRequest());
    try {
      const jobs = await getAllJobs(); // Replace with your API endpoint
      dispatch(fetchJobsSuccess(jobs));
    } catch (error) {
      dispatch(fetchJobsFailure(error.message));
    }
  };
};

export const createJob = (jobData) => {
  return async (dispatch) => {
    dispatch(createJobRequest());
    try {
      const job = await addJob(jobData);
      dispatch(createJobSuccess(job));
    } catch (error) {
      dispatch(createJobFailure(error.message));
    }
  };
};

export const updateJobs = (jobData, userId) => {
  return async (dispatch) => {
    dispatch(editJobRequest());
    try {
      const job = await editJob(jobData, userId); // Ensure this is awaited properly
      dispatch(editJobSuccess(job)); // This will only be called after `editJob` completes
    } catch (error) {
      dispatch(editJobFailure(error.message));
    }
  };
};

export const deleteJobs = (jobData, userId) => {
  return async (dispatch) => {
    dispatch(deleteJobRequest());
    try {
      const job = await deleteJob(jobData.jobId); // Ensure this is awaited properly
      dispatch(deleteJobSuccess(job)); // This will only be called after `deleteJob` completes
    } catch (error) {
      dispatch(deleteJobFailure(error.message));
    }
  };
};
