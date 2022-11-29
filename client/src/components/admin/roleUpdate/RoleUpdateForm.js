import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { submitRole } from "../../../actions";

const userRole = {
  user: "User",
  doctor: "Doctor",
  coordinator: "Coordinator",
  admin: "Admin",
};

class RoleUpdateForm extends Component {
  state = { email: "", role: "user" };

  renderContent() {
    console.log(this.props.userDetails);
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        <form>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Role Update Form</h4>
          </div>
          <div className="row mt-2">
            <div className="row">
              <div className="col-6">
                <label>Email</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label>Role</label>
                <select
                  className="form-select"
                  value={this.state.role}
                  onChange={(event) =>
                    this.setState({ role: event.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-12">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                  onClick={() =>
                    this.props.submitRole({
                      email: this.state.email,
                      role: this.state.role,
                    })
                  }
                >
                  Update Role <i className="material-icons right">done</i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default connect(null, { submitRole })(RoleUpdateForm);
