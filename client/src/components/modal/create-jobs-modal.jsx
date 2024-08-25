import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Textfield from "../../components/textfield/textfield";
import SelectDropdown from "../../components/select-dropdown/selectDropdown";
import ModalComponent from "./generic-modal";
import { contracts } from "../../common";
import { useDispatch } from "react-redux";
import {
  createJob,
  editJobs,
  fetchJobs,
  updateJobs,
} from "../../pages/jobs/jobAuth/jobActions";

const JobForm = (props) => {
  const dispatch = useDispatch();
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    position: "",
    contract: "",
    location: "",
  });

  const handleChange = (value, field) => {
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleNewJob = (e) => {
    e.preventDefault();
    // addJob(jobDetails, props.setAllJobs);
    dispatch(createJob(jobDetails));
    handleClose();
    // Add logic for form submission
  };

  const handleEditJob = (e) => {
    e.preventDefault();
    dispatch(updateJobs(jobDetails));
    handleClose();
    // Add logic for form submission
  };

  const handleClose = () => {
    props.handleModalClose();
    // Add logic for modal close
  };

  useEffect(() => {
    setJobDetails({ ...props.data });
  }, [props.data]);

  return (
    <ModalComponent
      className="job-form-modal"
      open={props.open}
      title={{
        label: "Create Job",
        variant: "h2",
        id: "apply-job-modal-title",
      }}
      primaryButton={{
        isRequired: true,
        label: props.isEdit ? "Save" : "Add",
        handler: props.isEdit ? handleEditJob : handleNewJob,
      }}
      secondaryButton={{
        isRequired: true,
        label: "Cancel",
        handler: handleClose,
      }}
    >
      <Container className="createjob-container">
        <Box className="createjob-box">
          <Textfield
            label="Company Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="companyName"
            value={jobDetails.companyName}
            config={{ field: "companyName" }}
            handleEdit={handleChange}
          />
          <Textfield
            label="Position"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="position"
            value={jobDetails.position}
            config={{ field: "position" }}
            handleEdit={handleChange}
          />
          <SelectDropdown
            label="Contract"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            select
            name="contract"
            value={jobDetails.contract}
            config={{ field: "contract" }}
            handleEdit={handleChange}
            optionList={contracts}
          />
          <Textfield
            label="Location"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="location"
            value={jobDetails.location}
            config={{ field: "location" }}
            handleEdit={handleChange}
          />
        </Box>
      </Container>
    </ModalComponent>
  );
};

export default JobForm;
