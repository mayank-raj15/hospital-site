import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav style={{ backgroundColor: "#4682b4" }}>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/appointments" : "/"}
            href="#"
            className="left brand-logo"
          >
            Health Centre, IITI
          </Link>
          <ul className="right">
            <li>
              <a href="/api/current_user">Current User</a>
            </li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
