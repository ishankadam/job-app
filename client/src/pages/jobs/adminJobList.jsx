import React, { useState } from "react";
import CustomTable from "../../components/custom-table/customTable";
import { Button, Typography } from "@mui/material";
import JobForm from "../../components/modal/create-jobs-modal";
import { contracts } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobs } from "./jobAuth/jobActions";

function AdminJobList(props) {
  const [showModal, setShowModal] = useState({
    show: false,
    isEdit: false,
    data: {},
  });

  const dispatch = useDispatch();
  const jobsState = useSelector((state) => state.jobs);
  const { loading, jobs } = jobsState;

  const handleOnClickView = (row, isEdit, index) => {
    setShowModal({
      show: true,
      isEdit: isEdit,
      data: row,
    });
  };

  const handleDeleteJob = (row) => {
    dispatch(deleteJobs(row));
  };

  const handleModalSubmit = () => {};

  const handleModalClose = () => {
    setShowModal({
      show: false,
      data: {},
    });
  };

  const handleOpenForm = () => {
    setShowModal({
      show: true,
      edit: false,
      data: {},
    });
  };

  const colDef = [
    {
      id: "company-name",
      label: "Company Name",
      key: "companyName",
      type: "text",
      align: "center",
    },
    {
      id: "position",
      label: "Position",
      key: "position",
      type: "text",
      align: "center",
    },
    {
      id: "contract",
      label: "Contract",
      key: "contract",
      type: "dropdown",
      align: "center",
      optionList: contracts,
    },
    {
      id: "location",
      label: "Company Name",
      key: "location",
      type: "text",
      align: "center",
    },
    {
      id: "notification-icon",
      label: "",
      key: "editAction",
      type: "action",
      align: "center",
      editId: "edit-icon",
      deleteId: "delete-icon",
      commentId: "comment-icon",
      editFunc: (row, index) => handleOnClickView(row, true, index),
      deleteFunc: (row, index) => handleDeleteJob(row, index),
      isDelete: true,
      isEdit: true,
      page: "JobListing",
    },
  ];

  return (
    <>
      <div className="jobs-header">
        <Typography className="job-list-title" variant="h4">
          Jobs
        </Typography>
        <div className="create-button">
          <Button size="small" onClick={handleOpenForm}>
            Create Jobs
          </Button>
        </div>
      </div>
      <div className="jobs-table">
        <CustomTable
          colDef={colDef}
          rowData={jobs}
          deleteContent={{
            title: "Delete Confirmation",
            message: "Are you sure you want to delete this record?",
          }}
          loading={loading}
        ></CustomTable>
      </div>
      {showModal.show ? (
        <JobForm
          open={showModal.show}
          isEdit={showModal.isEdit}
          data={showModal.data}
          handleModalSubmit={handleModalSubmit}
          handleModalClose={handleModalClose}
          setShowModal={setShowModal}
        ></JobForm>
      ) : null}
    </>
  );
}

export default AdminJobList;
