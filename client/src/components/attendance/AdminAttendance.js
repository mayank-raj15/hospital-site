import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDoctorsListAttendance } from "../../actions";

class AdminAttendance extends Component {
  state = { doctorIndex: 0 };

  componentDidMount() {
    this.props.fetchDoctorsListAttendance();
  }

  renderTableBody = () => {
    if (!this.props.doctors.length) return;

    const attendanceList =
      this.props.doctors[this.state.doctorIndex].attendance;
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

  renderDoctorOptions = () => {
    const doctors = this.props.doctors;
    return doctors.map(({ firstName, lastName, email }, index) => {
      return (
        <option
          key={index}
          value={index}
        >{`${firstName} ${lastName} (${email})`}</option>
      );
    });
  };

  render() {
    this.state;
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        <div className="row">
          <div className="col-12">
            <label>Choose Doctor: </label>
            <select
              className="form-select"
              value={this.state.doctorIndex}
              onChange={(event) =>
                this.setState({ doctorIndex: event.target.value })
              }
            >
              {this.renderDoctorOptions()}
            </select>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Present</th>
              <th scope="col">Timestamp</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ doctors }) {
  return { doctors };
}

export default connect(mapStateToProps, { fetchDoctorsListAttendance })(
  AdminAttendance
);
