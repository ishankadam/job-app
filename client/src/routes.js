import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/login/signup/signup";
import JobForm from "./pages/jobs/create-jobs";
import JobList from "./pages/jobs/job-list";
// import JobForm from "./components/Admin/JobForm";
// import JobList from "./components/Admin/JobList";
// import JobSearch from "./components/User/JobSearch";
// import AppliedJobs from "./components/User/AppliedJobs";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/jobs/createjobs" component={JobForm} />
      <Route path="/jobs/list" component={JobList} />

      {/* <Route path="/admin/jobs/form" component={JobForm} />
      <Route path="/jobs" component={JobSearch} />
      <Route path="/applied-jobs" component={AppliedJobs} /> */}
    </Switch>
  </Router>
);

export default Routes;
