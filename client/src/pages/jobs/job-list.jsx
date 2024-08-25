import React, { useEffect, useState } from "react";
import AdminJobList from "./adminJobList";
import UserJobList from "./userJobList";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./jobAuth/jobActions";
import { CircularProgress, Typography } from "@mui/material";

const JobList = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector((state) => state.jobs);
  const { loading, jobs, error } = jobsState;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (loading) {
    return (
      <div className="circular-progress">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return isAdmin ? (
    <AdminJobList jobs={jobs} loading={loading}></AdminJobList>
  ) : (
    <UserJobList jobs={jobs} loading={loading}></UserJobList>
  );
};

export default JobList;
