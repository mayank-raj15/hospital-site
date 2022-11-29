import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAppointments } from "../../actions";

class AppointmentList extends Component {
  componentDidMount() {
    this.props.fetchAppointments();
  }

  renderAppointments = () => {
    return this.props.appointments.map(
      ({ userName, doctorName, date, description, timeSlot }) => {
        return (
          <div
            className="row text-center justify-content-center"
            style={{ border: "2px solid black" }}
          >
            {this.props.auth.role !== "user" ? (
              <div className="col-6">
                <b>Patient: </b>
                {userName}
              </div>
            ) : (
              ""
            )}
            {this.props.auth.role !== "doctor" ? (
              <div className="col-6">
                <b>Doctor: </b>
                {doctorName}
              </div>
            ) : (
              ""
            )}
            <div className="col-10">{description}</div>
            <div className="col-6 d-flex flex-row">
              <b>Date: </b>
              {new Date(date).toLocaleDateString("en-GB")}
            </div>
            <div className="col-6 d-flex flex-row-reverse">
              {timeSlot}
              <b>Time: </b>
            </div>
          </div>
        );
      }
    );
  };

  render() {
    if (!this.props.auth || !this.props.appointments) return;
    return (
      <div
        className="container rounded bg-white mt-5 mb-5"
        style={{ padding: "10px" }}
      >
        <div className="row">
          <h3>Appointments</h3>
        </div>
        {this.renderAppointments()}
      </div>
    );
  }
}

function mapStateToProps({ auth, appointments }) {
  return { auth, appointments };
}

export default connect(mapStateToProps, { fetchAppointments })(AppointmentList);
