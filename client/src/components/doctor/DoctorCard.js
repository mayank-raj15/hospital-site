import React from "react";

const DoctorCard = ({ doctor }) => {
  const name = doctor.firstName + " " + doctor.lastName;

  return (
    <div className="card">
      <div className="content">
        <div className="header">{name}</div>
        <div className="description">{doctor.description}</div>
      </div>
      <button className="ui bottom attached button">
        <i className="add icon"></i>
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
