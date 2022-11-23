import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import AdminProfile from "./admin/AdminProfile";
import RoleUpdate from "./admin/roleUpdate/RoleUpdate";
import UserProfile from "./profile/UserProfile";
import DoctorList from "./doctor/DoctorList";
import ActivityList from "./activity/ActivityList";
import DoctorScheduleView from "./schedule/DoctorScheduleView";
import AttendanceView from "./attendance/AttendanceView";
const Dashboard = () => <h2>List of Appointments</h2>;
const AppointmentNew = () => <h2>Create a new Appointment</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div style={{ fontFamily: "Helvetica, sans-serif" }}>
              <Route exact path="/" component={Landing} />
              <Route exact path="/appointments" component={Dashboard} />
              <Route path="/appointments/new" component={AppointmentNew} />
              <Route exact path="/admin" component={AdminProfile} />
              <Route path="/admin/updateRole" component={RoleUpdate} />
              <Route exact path="/doctors" component={DoctorList} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/activities" component={ActivityList} />
              <Route path="/schedule" component={DoctorScheduleView} />
              <Route path="/attendance" component={AttendanceView} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
