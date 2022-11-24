import React from "react";

const DoctorCard = ({ doctor }) => {
  const name = doctor.firstName + " " + doctor.lastName;

  return (
    <div className="card text-center h-100" style={{ height: "100%" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ margin: "5px 0px" }}>
          {name}
        </h5>
        <p class="card-text right" style={{ width: "100%" }}>
          <small class="text-muted">{doctor.designation}</small>
        </p>
        <p className="card-text">{doctor.description}</p>
        <hr />
        <p className="card-text">Status: {doctor.status}</p>
        <button
          className="btn btn-primary profile-button align-items-center"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <i className="add icon"></i>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
