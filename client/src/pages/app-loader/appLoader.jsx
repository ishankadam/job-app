import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../../session-auth/sesssionAction";
import SessionTimeoutModal from "../../components/modal/session-timeout";
import { useLocation, useNavigate } from "react-router-dom";

const AppLoader = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isTokenValid = useSelector((state) => state.session.isTokenValid);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    localStorage.clear();
    setOpen(false);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    setOpen(!isTokenValid && ["/signup", "/"].includes(location.pathname));
  }, [isTokenValid]);

  return (
    <>
      <SessionTimeoutModal
        open={open}
        message=" Your session has expired. You will be redirected to the login page."
        title="Session Expired"
        handleClose={handleClose}
        setOpen={setOpen}
      />
      {children}
    </>
  );
};

export default AppLoader;
