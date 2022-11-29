import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const name = doctor.firstName + " " + doctor.lastName;
  const email = doctor.email;
  return (
    <div className="card text-center h-100" style={{ height: "100%" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ margin: "5px 0px" }}>
          {name}
        </h5>
        <p className="card-text right" style={{ width: "100%" }}>
          <small className="text-muted">{doctor.designation}</small>
        </p>
        <p className="card-text">{doctor.description}</p>
        <hr />
        <p className="card-text">Status: {doctor.status}</p>
        <Link
          to={{
            pathname: "/appointments/create",
            query: { doctor: { name, email, category: doctor.specialization } },
          }}
        >
          <button
            className="btn btn-primary profile-button align-items-center"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <i className="add icon"></i>
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
