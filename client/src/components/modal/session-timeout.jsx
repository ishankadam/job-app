import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import ModalComponent from "./generic-modal";
import { useNavigate } from "react-router-dom";

const SessionTimeoutModal = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.open) {
      const timer = setTimeout(() => {
        props.setOpen(false);
        navigate("/");
      }, 5000);

      // Clear the timer if the component unmounts or the modal is closed
      return () => clearTimeout(timer);
    }
  }, [props.open, navigate]);

  return (
    <ModalComponent
      className="modal-narrow"
      open={props.open}
      title={{
        label: props.title,
        variant: "h2",
        id: "session-modal-title",
      }}
      secondaryButton={{
        isRequired: true,
        label: "Ok",
        handler: props.handleClose,
      }}
    >
      <Typography id="session-modal-description">{props.message}</Typography>
    </ModalComponent>
  );
};

export default SessionTimeoutModal;
