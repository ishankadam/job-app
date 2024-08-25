import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editJobs, updateJobs } from "../../pages/jobs/jobAuth/jobActions";
import { findLabelByValue } from "../../common";

const CustomCard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleApply = (jobDetails) => {
    dispatch(updateJobs(jobDetails, user.userId));
  };

  return (
    <Card className="card" sx={{ position: "relative", padding: "16px" }}>
      <CardContent className="card-content">
        <Box
          sx={{
            backgroundColor: "#1976d2", // title background color
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "16px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            className="card-title"
            gutterBottom
            sx={{ color: "white" }}
          >
            {props.job.companyName}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          component="div"
          className="card-details"
          gutterBottom
        >
          <strong>Position:</strong> {props.job.position}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="card-details"
          gutterBottom
        >
          <strong>Contract:</strong> {findLabelByValue(props.job.contract)}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          className="card-details"
          gutterBottom
        >
          <strong>Location:</strong> {props.job.location}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        className="apply-button"
        onClick={() => handleApply(props.job)}
        size="small"
        disabled={props.job.applied.includes(user?.userId)}
        sx={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          color: "white",
          fontWeight: "600",
          borderRadius: "5px",
        }}
      >
        {props.job.applied.includes(user?.userId) ? "Applied" : "Apply"}
      </Button>
    </Card>
  );
};

export default CustomCard;
