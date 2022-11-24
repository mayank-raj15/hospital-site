import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDoctors } from "../../actions";
import DoctorCard from "./DoctorCard";

class DoctorList extends Component {
  componentDidMount() {
    this.props.fetchDoctors();
  }

  renderCards(doctorsArray) {
    return _.map(doctorsArray, (doctor) => {
      return (
        <div className="col" key={doctor.firstName + "-" + doctor.lastName}>
          <DoctorCard doctor={doctor} />
        </div>
      );
    });
  }

  renderDoctors() {
    const doctors = this.props.doctors;
    const doctorsList = {};

    _.each(doctors, (doctor) => {
      if (!doctorsList[doctor.specialization])
        doctorsList[doctor.specialization] = [];
      doctorsList[doctor.specialization].push(doctor);
    });

    const categories = Object.keys(doctorsList);

    return categories.map((category) => {
      return (
        <div className="category" key={category}>
          <h3 className="header text-center">{category}</h3>
          <div className="row">
            <hr />
          </div>
          <div className="row row-cols-3">
            {this.renderCards(doctorsList[category])}
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="container">{this.renderDoctors()}</div>;
  }
}

function mapStateToProps({ doctors }) {
  return { doctors };
}

export default connect(mapStateToProps, { fetchDoctors })(DoctorList);
