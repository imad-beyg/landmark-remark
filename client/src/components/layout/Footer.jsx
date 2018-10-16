import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <footer
        className={classnames("site-footer", {
          "text-white": !isAuthenticated
        })}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <p>Copyright &copy; 2018 Landmark Remark.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Footer);
