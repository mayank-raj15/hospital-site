import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import userFormFields from "./userProfileFormFields";
import doctorFormFields from "./doctorProfileFormFields";
import UserProfileField from "./UserProfileField";
import * as actions from "../../actions";

let role;

class UserProfile extends Component {
  renderContent() {
    return (
      <div className="container rounded bg-white mt-5 mb-5">
        <form
          onSubmit={this.props.handleSubmit((values) =>
            this.props.updateProfile(values)
          )}
        >
          <div className="row">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                {this.renderFields()}
                {this.renderOtherRoles()}
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderFields() {
    if (!this.props.auth) return;
    return _.map(userFormFields, ({ name, label }) => {
      return (
        <div className="col-md-6" key={name}>
          <Field
            key={name}
            type="text"
            name={name}
            label={label}
            value="hello"
            component={UserProfileField}
          />
        </div>
      );
    });
  }

  renderOtherRoles() {
    if (!this.props.auth) return;
    role = this.props.auth.role;

    switch (role) {
      case "doctor":
        return _.map(doctorFormFields, ({ name, label }) => {
          return (
            <div className="col-md-6">
              <Field
                key={name}
                type="text"
                name={name}
                label={label}
                value="hello"
                component={UserProfileField}
              />
            </div>
          );
        });
      default:
        return;
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth }) {
  return { auth, initialValues: auth };
}

function validate(values) {
  const errors = {};
  _.map(userFormFields, ({ name, noValueError }) => {
    if (!values[name]) errors[name] = noValueError;
  });
  if (role && role == "doctor") {
    _.map(doctorFormFields, ({ name, noValueError }) => {
      if (!values[name]) errors[name] = noValueError;
    });
  }
  return errors;
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "userProfileForm",
    validate,
    destroyOnUnmount: false,
  })(UserProfile)
);
