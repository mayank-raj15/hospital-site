import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSchedule, submitAppointment } from "../../actions";

class AppointmentCreate extends Component {
  componentDidMount() {
    if (this.props.location.query && this.props.location.query.doctor) {
      const { name, email, category } = this.props.location.query.doctor;
      this.setState({ doctorName: name, doctorEmail: email, category });
      this.props.fetchSchedule({
        email,
      });
    }
  }

  state = {
    selectedSlot: "",
    description: "",
    error: true,
    doctorName: "",
    doctorEmail: "",
    category: "",
    date: "",
    day: "",
    days: [],
    index: -1,
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

  renderSlots = ({ availableTimeSlots, day, date }, i) => {
    if (!availableTimeSlots.length)
      return (
        <div className="col">
          <b>No Slots Available</b>
        </div>
      );
    return availableTimeSlots.map((slot) => {
      return (
        <div className="col-4">
          <button
            value={`${day} ${slot}`}
            className={`btn btn-primary ${
              this.state.selectedSlot === `${day} ${slot}` ? "active" : ""
            }`}
            style={{
              borderRadius: "10px",
              margin: "5px",
            }}
            onClick={(event) => {
              this.setState({
                selectedSlot: event.target.value,
                error: false,
                date: new Date(date),
                day,
                index: i,
              });
            }}
          >
            {slot}
          </button>
        </div>
      );
    });
  };

  renderDays = () => {
    return this.props.schedule.days.map((day, i) => {
      return (
        <div
          key={day.day}
          style={{ border: "2px solid black", marginBottom: "30px" }}
        >
          <div className="row align-items-center" style={{ marginTop: "15px" }}>
            <div className="col-3" style={{ borderRight: "3px solid black" }}>
              <div className="row">
                <div className="col-12" style={{ marginBottom: "10px" }}>
                  <b>{new Date(day.date).toLocaleDateString("en-GB")} </b>
                </div>
                <div className="col-12">
                  <b>{this.getTimeFull(day)}</b>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-12" style={{ marginBottom: "10px" }}>
                  <b>AVAILABLE SLOTS</b>
                </div>
                {this.renderSlots(day, i)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  submitAppointment = () => {
    if (this.state.error) {
      return;
    }

    const timeSlot = this.state.selectedSlot.substring(2);
    const days = this.props.schedule.days;
    const index = this.state.index;
    const i = days[index].availableTimeSlots.indexOf(timeSlot);
    if (i > -1) {
      days[index].availableTimeSlots.splice(i, 1);
    }
    days[index].bookedTimeSlots.push(timeSlot);
    days[index].bookedTimeSlots.sort();

    this.props.submitAppointment({
      doctorName: this.state.doctorName,
      doctorEmail: this.state.doctorEmail,
      date: this.state.date,
      day: this.state.day,
      timeSlot,
      description: this.state.description,
      scheduleId: this.props.schedule._id,
      days,
      week: this.props.schedule.week,
    });
  };

  render() {
    if (!this.props.location.query || !this.props.schedule) return;
    console.log(this.state);
    return (
      <div
        className="container rounded bg-white mt-5 mb-5"
        style={{ padding: "20px" }}
      >
        <div style={{ border: "2px solid black", margin: "5px 0px 5px 0" }}>
          <div className="row text-center justify-content-center">
            <div className="col-12">
              <h5>DOCTOR DETAILS</h5>
            </div>
            <div className="col-4">
              <b>Name: </b>
              {this.state.doctorName}
            </div>
            <div className="col-4">
              <b>Email: </b>
              {this.state.doctorEmail}
            </div>
            <div className="col-4">
              <b>Category: </b>
              {this.state.category}
            </div>
          </div>
        </div>
        <div style={{ border: "2px solid black", margin: "5px 0px 5px 0" }}>
          <div
            className="row text-center justify-content-center"
            style={{ padding: "20px" }}
          >
            <div className="col-12">
              <h5>CHOOSE SLOT</h5>
            </div>
            {this.renderDays()}
            <div className="col-12">
              <h5>ENTER ISSUE DESCRIPTION</h5>
            </div>
            <div className="col-10">
              <textarea
                placeholder="Issue Description"
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              ></textarea>
            </div>

            <div className="col-6" style={{ marginTop: "20px" }}>
              <form onSubmit={() => this.submitAppointment()}>
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                  disabled={this.state.error}
                >
                  Confirm <i className="material-icons right">done</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ schedule }) {
  return { schedule };
}

export default connect(mapStateToProps, { fetchSchedule, submitAppointment })(
  AppointmentCreate
);
