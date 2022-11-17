import React, { Component } from "react";
import { reduxForm } from "redux-form";
import RoleUpdateForm from "./RoleUpdateForm";
import RoleUpdateFormReview from "./RoleUpdateFormReview";

class RoleUpdate extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview)
      return (
        <RoleUpdateFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );

    return (
      <RoleUpdateForm
        onFormSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}

export default reduxForm({
  form: "roleUpdateForm",
})(RoleUpdate);
