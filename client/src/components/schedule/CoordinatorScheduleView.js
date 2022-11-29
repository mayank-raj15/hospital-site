import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDoctors, fetchSchedule } from "../../actions";

class CoordinatorScheduleView extends Component {
  componentDidMount() {
    this.props.fetchDoctors();
    this.props.fetchSchedule({
      email: this.props.doctors[0]
        ? this.props.doctors[0].email
        : "mrv4102@gmail.com",
    });
    console.log("called");
  }

  state = { doctorIndex: 0 };

  renderDoctorOptions = () => {
    const doctors = this.props.doctors;
    if (!doctors) return;
    return doctors.map(({ firstName, lastName, email }, index) => {
      return (
        <option
          key={index}
          value={index}
        >{`${firstName} ${lastName} (${email})`}</option>
      );
    });
  };

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
    return bookedTimeSlots.map((slot, i) => {
      return (
        <div
          key={i}
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

  renderSchedule = () => {
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
  };

  render() {
    if (!this.props.auth || this.props.auth.role !== "coordinator") return;
    console.log(this.state);
    console.log(this.props.schedule);
    console.log(this.props.doctors);
    return (
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <label>Choose Doctor: </label>
            <select
              className="form-select"
              value={this.state.doctorIndex}
              onChange={(event) => {
                const index = parseInt(event.target.value);
                this.props.fetchSchedule({
                  email: this.props.doctors[index].email,
                });
                this.setState({ doctorIndex: index });
              }}
            >
              {this.renderDoctorOptions()}
            </select>
          </div>
        </div>
        {this.renderSchedule()}
      </div>
    );
  }
}

function mapStateToProps({ auth, schedule, doctors }) {
  return { auth, schedule, doctors };
}

export default connect(mapStateToProps, { fetchDoctors, fetchSchedule })(
  CoordinatorScheduleView
);
