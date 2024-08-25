import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/styles.scss";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup/signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./pages/login/auth/authAction";
import CustomDashboard from "./components/dashboard/dashboard";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser()); // Fetch user data to initialize store
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route exact path="/jobs/createjob" element={<JobForm />} /> */}
        <Route
          exact
          path="/jobs/list"
          element={<CustomDashboard></CustomDashboard>}
        />
      </Routes>
    </>
  );
}

export default App;
