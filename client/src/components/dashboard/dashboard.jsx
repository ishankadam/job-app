import React from "react";
import MenuAppBar from "../appbar/appbar";
import JobList from "../../pages/jobs/job-list";

const CustomDashboard = () => {
  return (
    <>
      <MenuAppBar></MenuAppBar>
      <JobList></JobList>
    </>
  );
};

export default CustomDashboard;
