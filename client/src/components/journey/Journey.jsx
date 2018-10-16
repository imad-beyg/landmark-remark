import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getLocations,
  getCurrentLocation
} from "../../actions/locationsActions";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { DEFAULT_LOCATION_ICON, CURRENT_LOCATION_ICON } from "./LeafletIcons";
import AddLocation from "./AddLocation";

class Journey extends Component {
  state = {
    zoom: 7
  };

  componentWillMount() {
    this.props.getCurrentLocation();
  }

  componentDidMount() {
    this.props.getLocations();
  }

  render() {
    const { zoom } = this.state;
    const { markers, center } = this.props;

    return (
      <section className="map-section h-100">
        <Map
          center={center}
          zoom={zoom}
          zoomControl={false}
          worldCopyJump={true}
          className="h-100"
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} icon={CURRENT_LOCATION_ICON} />

          {markers.map(marker => (
            <Marker
              key={marker._id}
              position={[marker.latitude, marker.longitude]}
              icon={DEFAULT_LOCATION_ICON}
            >
              <Popup>
                <p>
                  <b>{marker.user.email}:</b> {marker.note}
                </p>
                {marker.otherNotes
                  ? marker.otherNotes.map(marker => (
                      <p key={marker._id}>
                        <b>{marker.user.email}:</b> {marker.note}
                      </p>
                    ))
                  : ""}
              </Popup>
            </Marker>
          ))}
        </Map>
        <AddLocation latitude={center.lat} longitude={center.lng} />
      </section>
    );
  }
}

Journey.propTypes = {
  getLocations: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  markers: PropTypes.array.isRequired,
  center: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  markers: state.locations.markers,
  center: state.locations.center
});

export default connect(
  mapStateToProps,
  { getLocations, getCurrentLocation }
)(Journey);
