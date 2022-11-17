import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./roleUpdateFormFields";
import * as actions from "../../../actions";

const RoleUpdateFormReview = ({
  onCancel,
  formValues,
  submitRole,
  history,
}) => {
  const renderReviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="container rounded bg-white mt-5 mb-5 ">
      <div className="row">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Please Confirm</h4>
          </div>
          <div className="row mt-2">{renderReviewFields}</div>
        </div>
        <div className="mt-5" style={{ paddingBottom: "50px" }}>
          <button
            className="yellow white-text darken-3 btn-flat left"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={() => submitRole(formValues, history)}
            className="green btn-flat white-text right"
          >
            Confirm
            <i className="material-icons right">done</i>
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.roleUpdateForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(RoleUpdateFormReview));
