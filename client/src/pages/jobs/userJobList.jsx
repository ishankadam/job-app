import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../components/card/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "./jobAuth/jobActions";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import { TextFieldsTwoTone } from "@mui/icons-material";
import Textfield from "../../components/textfield/textfield";
import { contracts } from "../../common";

const UserJobList = (props) => {
  const [filterName, setFilterName] = useState({
    company: "",
    location: "",
    contract: "",
  });

  const jobsState = useSelector((state) => state.jobs);
  const { loading, jobs, error } = jobsState;
  const locationOptions =
    jobs && jobs?.length > 0 && jobs
      ? Array.from(new Set(jobs.map((job) => job.location))).map(
          (location) => ({
            label: location,
            value: location,
          })
        )
      : [];
  const setFilter = (value, field) => {
    setFilterName((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const filteredJobs =
    jobs &&
    jobs?.length > 0 &&
    jobs
      ?.filter((job) =>
        job.companyName.toLowerCase().includes(filterName.company.toLowerCase())
      )
      ?.filter((job) =>
        filterName.location ? job.location === filterName.location : true
      )
      ?.filter((job) =>
        filterName.contract ? job.contract === filterName.contract : true
      );

  const handleClear = (field) => {
    setFilterName((prevFilters) => ({
      ...prevFilters,
      [field]: "",
    }));
  };

  return (
    <>
      <div className="Job-filter-container">
        <div className="title-wrapper">
          <Typography className="job-list-title" variant="h4">
            Jobs
          </Typography>
        </div>
        <div className="filter-wrapper">
          <Textfield
            label="Search by Company"
            variant="outlined"
            value={filterName.company}
            config={{ field: "company", type: "filter" }}
            handleEdit={setFilter}
            fullWidth
            margin="normal"
          />

          <SelectDropdown
            className={`filter-dropdown ${
              filterName.location.length > 0 ? "disable-arrow" : ""
            }`}
            label="Filter by Location"
            variant="outlined"
            value={filterName.location}
            config={{ field: "location" }}
            handleEdit={setFilter}
            fullWidth
            margin="normal"
            optionList={locationOptions}
            handleClear={handleClear}
          ></SelectDropdown>

          <SelectDropdown
            className={`filter-dropdown ${
              filterName.contract.length > 0 ? "disable-arrow" : ""
            }`}
            label="Filter by Contract"
            variant="outlined"
            value={filterName.contract}
            config={{ field: "contract" }}
            optionList={contracts}
            handleEdit={setFilter}
            handleClear={handleClear}
            fullWidth
            margin="normal"
          ></SelectDropdown>
        </div>
      </div>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <Grid container spacing={2}>
          {filteredJobs &&
            filteredJobs?.length > 0 &&
            filteredJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={`job-${index}`}>
                <CustomCard job={job} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default UserJobList;
