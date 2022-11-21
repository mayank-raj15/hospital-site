import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchActivities } from "../../actions";
import ActivityCard from "./ActivityCard";

class ActivityList extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderCards(activitiesArray) {
    return _.map(activitiesArray, (activity) => {
      return (
        <div key={activity._id}>
          <ActivityCard activity={activity} />
        </div>
      );
    });
  }

  renderActivities() {
    return (
      <div>
        <div className="h2 text-left">Activity</div>
        <div className="row">{this.renderCards(this.props.activities)}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="container rounded bg-white mt-5 mb-5 ">
        {this.renderActivities()}
      </div>
    );
  }
}

function mapStateToProps({ activities }) {
  return { activities };
}

export default connect(mapStateToProps, { fetchActivities })(ActivityList);
