import React from "react";

const DoctorCard = ({ activity }) => {
  return (
    <div className="card">
      <div className="card-header">
        {new Date(activity.activityTime).toString()}
      </div>
      <div className="card-body">
        <p className="card-text">
          <i className="material-icons left">chevron_right</i>
          {`${activity.userEmail} ${activity.description}`}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
