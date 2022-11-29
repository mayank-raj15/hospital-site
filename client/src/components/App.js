import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import AdminProfile from "./admin/AdminProfile";
import RoleUpdate from "./admin/roleUpdate/RoleUpdateForm";
import UserProfile from "./profile/UserProfile";
import DoctorList from "./doctor/DoctorList";
import ActivityList from "./activity/ActivityList";
import AttendanceView from "./attendance/AttendanceView";
import AppointmentCreate from "./appointment/AppointmentCreate";
import AppointmentList from "./appointment/Appointment List";
import DoctorScheduleView from "./schedule/DoctorScheduleView";

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
              <Route exact path="/appointments" component={AppointmentList} />
              <Route exact path="/admin" component={AdminProfile} />
              <Route path="/admin/updateRole" component={RoleUpdate} />
              <Route exact path="/doctors" component={DoctorList} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/activities" component={ActivityList} />
              <Route path="/schedule" component={DoctorScheduleView} />
              <Route path="/attendance" component={AttendanceView} />
              <Route
                path="/appointments/create"
                component={AppointmentCreate}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
