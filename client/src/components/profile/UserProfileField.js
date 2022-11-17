import React from "react";

const UserProfileField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label className="labels">{label}</label>
      {input.name === "email" ? (
        <input type="text" className="form-control" {...input} readOnly />
      ) : (
        <input type="text" className="form-control" {...input} />
      )}
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default UserProfileField;
