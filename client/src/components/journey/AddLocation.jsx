import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLocation } from "../../actions/locationsActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      latitude: "",
      longitude: "",
      errors: {},
      showAddButton: true,
      showFormContainer: false,
      isSubmitting: false,
      showThanks: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.latitude) {
      this.setState({ latitude: nextProps.latitude });
    }

    if (nextProps.longitude) {
      this.setState({ longitude: nextProps.longitude });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    //Client side validation to show loader
    const { note } = this.state;

    // Check For Errors
    if (note === "") {
      this.setState({ errors: { note: "Note is required" } });
      return;
    }

    if (note.length < 10 || note.length > 200) {
      this.setState({
        errors: { note: "Note must be between 10 and 200 characters" }
      });
      return;
    }

    this.setState({
      showForm: false,
      isSubmitting: true
    });
    const newUserLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      note: this.state.note
    };

    this.props.addLocation(newUserLocation);

    //Added delay for an interactive loader
    setTimeout(() => {
      this.setState({
        note: "",
        latitude: "",
        longitude: "",
        isSubmitting: false,
        showFormContainer: false,
        showForm: false,
        showThanks: true,
        errors: {}
      });
    }, 5000);
  };
  toggleForm = e => {
    this.setState({
      showFormContainer: true,
      showForm: true,
      showAddButton: false
    });
  };
  hideForm = e => {
    this.setState({
      showFormContainer: false,
      showForm: false,
      showAddButton: true
    });
  };
  render() {
    const {
      note,
      errors,
      showFormContainer,
      showForm,
      showAddButton,
      isSubmitting,
      showThanks
    } = this.state;

    return (
      <React.Fragment>
        {showAddButton ? (
          <button
            className="btn-get-started btn-add-note"
            onClick={this.toggleForm}
          >
            Add a note
          </button>
        ) : (
          ""
        )}

        {showFormContainer ? (
          <div className="message-form card card-body">
            <h5 className="card-title">
              Welcome to
              <br />
              <strong>Landmark Remark</strong>
            </h5>
            <p className="card-text">
              Share your experience at a current location.
            </p>
            {showForm ? (
              <form noValidate onSubmit={this.onSubmit}>
                <TextAreaFieldGroup
                  placeholder="Enter a note"
                  name="note"
                  value={note}
                  rows="5"
                  onChange={this.onChange}
                  error={errors.note}
                />
                <button type="submit" className="btn btn-dark btn-block">
                  Submit
                </button>
                <button
                  type="cancel"
                  className="btn-cancel"
                  onClick={this.hideForm}
                >
                  x
                </button>
              </form>
            ) : (
              ""
            )}

            {isSubmitting ? (
              <video
                autoPlay
                loop
                src="https://media.giphy.com/media/p3P8lFeNeemwcPY00B/giphy.mp4"
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {showThanks ? (
          <div className="thanks-form card card-body">
            <p className="card-text">
              Thanks for sharing your experience about a current location.
              <br />
              <strong>Happy travelling!</strong>
            </p>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

AddLocation.propTypes = {
  addLocation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addLocation }
)(AddLocation);
