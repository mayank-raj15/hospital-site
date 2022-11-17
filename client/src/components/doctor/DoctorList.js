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
        <div
          className="four wide column"
          key={doctor.firstName + "-" + doctor.lastName}
        >
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
          <div className="ui large header">{category}</div>
          <div className="ui grid">
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
