import React, { Component } from "react";
import { connect } from "react-redux";
import { markAttendance } from "../../actions";

class DoctorAttendance extends Component {
  state = { code: "" };

  renderAttendanceForm = () => {
    return (
      <form
        onSubmit={() => {
          this.props.markAttendance({ code: this.state.code });
        }}
      >
        <div className="row align-items-center justify-content-between">
          <div className="col-6">Enter Code:</div>
          <div className="col-6 ">
            <input
              type="text"
              value={this.state.code}
              onChange={(event) => {
                this.setState({ code: event.target.value });
              }}
            ></input>
          </div>
        </div>

        <div className="col-12">
          <div className="mt-5 text-center">
            <button className="btn btn-primary" type="submit">
              Mark Today's Attendance
            </button>
          </div>
        </div>
      </form>
    );
  };

  renderAttendance = () => {
    const attendanceList = this.props.auth.attendance;
    const dayToday = new Date().toLocaleDateString("en-GB");

    if (
      !attendanceList ||
      !attendanceList.length ||
      attendanceList[0].day !== dayToday ||
      !attendanceList[0].timestamp
    ) {
      return this.renderAttendanceForm();
    } else {
      return (
        <div className="col-6">
          Attendance already marked <i className="material-icons">done</i>
        </div>
      );
    }
  };

  renderAttendanceRows = () => {
    const attendanceList = this.props.auth.attendance;
    const dateToday = new Date();
    const firstDayOfMonth = new Date(
      dateToday.getFullYear(),
      dateToday.getMonth(),
      1
    ).toLocaleDateString("en-GB");

    const newArr = [];
    for (let i = 0; i < attendanceList.length; i++) {
      newArr.push(attendanceList[i]);
      if (attendanceList[i].day === firstDayOfMonth) break;
    }

    return newArr.map(({ day, timestamp }) => {
      return (
        <tr>
          <th scope="row">{day}</th>
          <td>
            {timestamp ? (
              <i className="material-icons">done</i>
            ) : (
              <i className="material-icons">clear</i>
            )}
          </td>
          <td>{timestamp}</td>
        </tr>
      );
    });
  };

  renderMonthsAttendance = () => {
    return (
      <div className="col-12">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Present</th>
              <th scope="col">Timestamp</th>
            </tr>
          </thead>
          <tbody>{this.renderAttendanceRows()}</tbody>
        </table>
      </div>
    );
  };

  render() {
    if (!this.props.auth) return;
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        <div className="row justify-content-center">
          {this.renderAttendance()}
        </div>
        <div className="row">
          <hr />
        </div>
        <div className="row">{this.renderMonthsAttendance()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { markAttendance })(DoctorAttendance);
