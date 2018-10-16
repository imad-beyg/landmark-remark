import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <section className="h-100 text-center text-white">
        <div className="container h-100 d-flex flex-column">
          <div className="row align-items-center justify-content-center flex-fill">
            <div className="col-md-8 col-lg-6">
              <h1 className="mb-4">Mark Your Land</h1>
              <p className="lead mb-4">
                Share your personal experience thorugh notes at your current
                location to help other travelers. <br />
                Happy traveling!
              </p>
              <Link to="/journey" className="btn btn-get-started">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
