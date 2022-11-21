import _ from "lodash";
import React, { Component } from "react";
import DoctorAvailability from "./DoctorAvailability";
import DoctorSchedule from "./DoctorSchedule";
import DoctorStatus from "./DoctorStatus";

import { tabs } from "./fields";

class DoctorScheduleView extends Component {
  state = { activeBtn: "status" };

  updateActiveBtn(key) {
    this.setState({ activeBtn: key });
  }

  renderTabs() {
    return _.map(tabs, ({ name, key }) => {
      return (
        <li className="nav-item" key={key}>
          <button
            className={
              this.state.activeBtn === key ? "nav-link active" : "nav-link"
            }
            onClick={() => this.updateActiveBtn(key)}
          >
            {name}
          </button>
        </li>
      );
    });
  }

  renderBottom() {
    switch (this.state.activeBtn) {
      case "status":
        return <DoctorStatus />;
      case "days":
        return <DoctorAvailability />;
      default:
        return <DoctorSchedule />;
    }
  }

  render() {
    return (
      <div className="container rounded bg-white mt-5 mb-5">
        <ul
          className="nav nav-tabs justify-content-center"
          style={{ padding: "10px 10px" }}
        >
          {this.renderTabs()}
        </ul>
        {this.renderBottom()}
      </div>
    );
  }
}

export default DoctorScheduleView;
