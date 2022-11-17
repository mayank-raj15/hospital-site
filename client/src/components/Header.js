import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

class Header extends Component {
  renderContentLog() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li key="login">
            <a className="tab-btn" href="/auth/google">
              Login With Google
            </a>
          </li>
        );
      default:
        return (
          <li key="logout">
            <a className="tab-btn" href="/api/logout">
              Logout
            </a>
          </li>
        );
    }
  }

  renderContentRole() {
    if (!this.props.auth) return;
    const role = this.props.auth.role;
    switch (role) {
      case "doctor":
        return [
          <li key="attendance">
            <a className="tab-btn" href="/attendance">
              Attendance
            </a>
          </li>,
          <li key="schedule">
            <a className="tab-btn" href="/schedule">
              Schedule
            </a>
          </li>,
        ];

      case "admin":
        return [
          <li key="doctors">
            <a className="tab-btn" href="/doctors">
              Doctors
            </a>
          </li>,
          <li key="attendance">
            <a className="tab-btn" href="/admin/attendance">
              Attendance
            </a>
          </li>,
          <li key="role-update">
            <a className="tab-btn" href="/admin/updateRole">
              Update Role
            </a>
          </li>,
        ];

      case "coordinator":
        return [
          <li key="doctors">
            <a className="tab-btn" href="/doctors">
              Doctors
            </a>
          </li>,
          <li key="attendance">
            <a className="tab-btn" href="/attendance-qr">
              Attendance QR
            </a>
          </li>,
        ];

      default:
        return [
          <li key="appointments">
            <a className="tab-btn" href="/appointments">
              Appointments
            </a>
          </li>,
          <li key="doctors">
            <a className="tab-btn" href="/doctors">
              Doctors
            </a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "5px 200px 5px 200px",
            margin: "0px 10px 0px 10px",
            background: "white",
          }}
        >
          <div className="left">
            <img
              style={{ height: "150px", widht: "150px" }}
              src="/logo-iit.png"
            ></img>
          </div>

          <div
            className="right"
            style={{
              textTransform: "uppercase",
              color: "#4682b4",
              fontWeight: "bold",
            }}
          >
            <h2
              style={{
                fontSize: "80px",
                margin: "5px 10px 5px 10px",
              }}
            >
              Health Centre
            </h2>
            <h4
              style={{
                fontSize: "50px",
                margin: "10px 10px 10px 10px",
              }}
            >
              IIT Indore
            </h4>
          </div>
        </div>
        <nav style={{ backgroundColor: "#4682b4", display: "block" }}>
          <div className="nav-wrapper" style={{ margin: "0 50px 0 50px" }}>
            <Link
              to={this.props.auth ? "/appointments" : "/"}
              href="#"
              className="left brand-logo"
            >
              HOME
            </Link>
            <ul className="right">
              {this.renderContentRole()}
              <li>
                <a className="tab-btn" href="/profile">
                  Profile
                </a>
              </li>

              {this.renderContentLog()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
