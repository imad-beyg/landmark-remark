import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-avatar navbar-nav text-uppercase">
        <li className="nav-item">
          <Link
            to="/logout"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img className="rounded-circle" src={user.avatar} alt={user.name} />
            Logout
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/help">
            Help
          </Link>
        </li>
      </ul>
    );

    return (
      <header
        className={classnames("site-header", {
          "text-white": !isAuthenticated
        })}
      >
        <nav className="navbar navbar-expand-md fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              LANDMARK REMARK
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
