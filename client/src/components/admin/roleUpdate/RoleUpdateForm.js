import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import validateEmail from "../../../utils/validateEmail";
import RoleUpdateField from "./RoleUpdateField";

import formFields from "./roleUpdateFormFields";

class RoleUpdateForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => {
      return (
        <Field
          key={name}
          type="text"
          name={name}
          label={label}
          component={RoleUpdateField}
        />
      );
    });
  }

  renderContent() {
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
          <div className="row">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Role Update Form</h4>
              </div>
              <div className="row mt-2">{this.renderFields()}</div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
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

function validate(values) {
  const errors = {};

  errors.email = validateEmail(values.email);

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  form: "roleUpdateForm",
  validate,
  destroyOnUnmount: false,
})(RoleUpdateForm);
