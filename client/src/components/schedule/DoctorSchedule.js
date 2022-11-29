import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSchedule } from "../../actions";

class DoctorSchedule extends Component {
  componentDidMount() {
    if (this.props.auth)
      this.props.fetchSchedule({ email: this.props.auth.email });
  }

  getTimeFull = (day) => {
    const sh =
      day.dayStartHours.length == 1
        ? `0${day.dayStartHours}`
        : day.dayStartHours;
    const sm =
      day.dayStartMinutes.length == 1
        ? `0${day.dayStartMinutes}`
        : day.dayStartMinutes;
    const eh =
      day.dayEndHours.length == 1 ? `0${day.dayEndHours}` : day.dayEndHours;
    const em =
      day.dayEndMinutes.length == 1
        ? `0${day.dayEndMinutes}`
        : day.dayEndMinutes;

    return `${sh}:${sm} - ${eh}:${em}`;
  };

  getTimeBreak = (day) => {
    if (day.breakStartHours === "N/A") return "N/A";
    const sh =
      day.breakStartHours.length == 1
        ? `0${day.breakStartHours}`
        : day.breakStartHours;
    const sm =
      day.breakStartMinutes.length == 1
        ? `0${day.breakStartMinutes}`
        : day.breakStartMinutes;
    const eh =
      day.breakEndHours.length == 1
        ? `0${day.breakEndHours}`
        : day.breakEndHours;
    const em =
      day.breakEndMinutes.length == 1
        ? `0${day.breakEndMinutes}`
        : day.breakEndMinutes;

    return `${sh}:${sm} - ${eh}:${em}`;
  };

  renderSlots = ({ bookedTimeSlots }) => {
    if (!bookedTimeSlots.length)
      return (
        <div className="col">
          <b>No Slot Booked</b>
        </div>
      );
    return bookedTimeSlots.map((slot) => {
      return (
        <div
          className="col"
          style={{
            border: "2px solid red",
            borderRadius: "10px",
            margin: "5px",
          }}
        >
          {slot}
        </div>
      );
    });
  };

  renderDays = () => {
    return this.props.schedule.days.map((day) => {
      return (
        <div
          key={day.day}
          style={{ border: "2px solid black", marginBottom: "30px" }}
        >
          <div className="row" style={{ marginTop: "15px" }}>
            <div className="col-4">
              <b>Date:</b>
              {new Date(day.date).toLocaleDateString("en-GB")}
            </div>
            <div className="col-4">
              <b>Time:</b> {this.getTimeFull(day)}
            </div>
            <div className="col-4">
              <b>Break: </b>
              {this.getTimeBreak(day)}
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <b>Booked Slots:</b>
            </div>
            <div className="row row-cols-4 text-center justify-content-center">
              {this.renderSlots(day)}
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    if (!this.props.schedule) {
      return (
        <div className="row text-center">
          <div className="col">
            <h4>
              <b>Schedule not set yet</b>
            </h4>
          </div>
        </div>
      );
    }
    return <div className="row">{this.renderDays()}</div>;
  }
}

function mapStateToProps({ auth, schedule }) {
  return { auth, schedule };
}

export default connect(mapStateToProps, {
  fetchSchedule,
})(DoctorSchedule);
