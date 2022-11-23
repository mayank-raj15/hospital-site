import React, { Component } from "react";
import { connect } from "react-redux";
import AdminAttendance from "./AdminAttendance";
import CoordinatorAttendance from "./CoordinatorAttendance";
import DoctorAttendance from "./DoctorAttendance";

class AttendanceView extends Component {
  render() {
    if (!this.props.auth) return;

    const role = this.props.auth.role;
    switch (role) {
      case "doctor":
        return <DoctorAttendance />;
      case "coordinator":
        return <CoordinatorAttendance />;
      case "admin":
        return <AdminAttendance />;
      default:
        return;
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AttendanceView);
