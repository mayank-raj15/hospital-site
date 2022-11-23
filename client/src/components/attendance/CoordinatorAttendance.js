import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAttendanceCoordinator, generateCodes } from "../../actions";

class CoordinatorAttendance extends Component {
  state = { generated: false };

  componentDidMount = () => {
    this.props.fetchAttendanceCoordinator({ hello: "hi" });
  };

  renderCodeGenerateButton = (codesGenerated) => {
    if (!codesGenerated) {
      return (
        <div className="col-12">
          <div className="mt-5 text-center">
            <button
              className="btn btn-primary"
              onClick={() => this.props.generateCodes()}
            >
              Generate Attendance Codes
            </button>
          </div>
        </div>
      );
    }
  };

  renderTableBody = () => {
    const doctors = this.props.attendanceList[0].doctors;
    return doctors.map(({ name, email, code, present }, index) => {
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{name}</td>
          <td>{email}</td>
          <td>{code}</td>
          <td>
            {present ? (
              <i className="material-icons">done</i>
            ) : (
              <i className="material-icons">clear</i>
            )}
          </td>
        </tr>
      );
    });
  };

  renderCodes = (codesGenerated) => {
    if (codesGenerated) {
      return (
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Code</th>
                <th scope="col">Done</th>
              </tr>
            </thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
        </div>
      );
    }
  };

  render() {
    const codesGenerated = this.props.attendanceList.length > 0;
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        <div className="row">
          {this.renderCodeGenerateButton(codesGenerated)}
        </div>
        <div className="row">{this.renderCodes(codesGenerated)}</div>
      </div>
    );
  }
}

function mapStateToProps({ attendanceList }) {
  return { attendanceList };
}

export default connect(mapStateToProps, {
  fetchAttendanceCoordinator,
  generateCodes,
})(CoordinatorAttendance);
