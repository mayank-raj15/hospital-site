import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { statusValues, statusLabels } from "./fields";
import { updateStatus } from "../../actions";

class DoctorStatus extends Component {
  state = { status: "offline" };

  componentDidMount() {
    if (this.props.auth) this.setState({ status: this.props.auth.status });
  }

  updateActiveOption = (event) => {
    this.setState({ status: event.target.value });
  };

  renderStatusOptions() {
    return _.map(statusValues, ({ name, key }) => {
      return (
        <option key={key} value={key}>
          {name}
        </option>
      );
    });
  }

  render() {
    // console.log(this.state.status);
    return (
      <div>
        <div className="row">
          <div className="col-6 text-right">Current Status:</div>
          <div className="col-6">
            {this.props.auth ? statusLabels[this.props.auth.status] : ""}
          </div>
        </div>
        <div className="row text-right">
          <div className="col-6">Update Status:</div>
          <div className="col-2">
            <form>
              <select
                className="form-select"
                value={this.state.status}
                onChange={this.updateActiveOption}
              >
                {this.renderStatusOptions()}
              </select>
            </form>
          </div>
        </div>
        <div className="mt-5 text-center" style={{ paddingBottom: "20px" }}>
          <button
            className="btn btn-primary profile-button"
            type="submit"
            onClick={() =>
              this.props.updateStatus({ status: this.state.status })
            }
          >
            Confirm <i className="material-icons right">done</i>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { updateStatus })(DoctorStatus);
