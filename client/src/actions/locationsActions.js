import axios from "axios";
import {
  GET_ERRORS,
  GET_LOCATIONS,
  GET_CURRENT_LOCATION,
  ADD_LOCATION
} from "./types";

//Get All Locations
export const getLocations = () => dispatch => {
  axios
    .get("/api/locations")
    .then(response => {
      const locationSeen = {};
      const notes = response.data.reduce((all, note) => {
        const key = `${note.latitude}${note.longitude}`;
        if (locationSeen[key]) {
          locationSeen[key].otherNotes = locationSeen[key].otherNotes || [];
          locationSeen[key].otherNotes.push(note);
        } else {
          locationSeen[key] = note;
          all.push(note);
        }
        return all;
      }, []);
      dispatch({
        type: GET_LOCATIONS,
        payload: notes
      });
    })
    .catch(err => {
      dispatch({
        type: GET_LOCATIONS,
        payload: null
      });
    });
};

//Get Current Location
export const getCurrentLocation = () => dispatch => {
  axios
    .get("https://ipapi.co/json")
    .then(response => {
      const currentLocation = {
        lat: response.data.latitude,
        lng: response.data.longitude
      };
      dispatch({
        type: GET_CURRENT_LOCATION,
        payload: currentLocation
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_LOCATION,
        payload: null
      });
    });
};

// Add User User
export const addLocation = locationData => dispatch => {
  axios
    .post("/api/locations", locationData)
    .then(response => {
      dispatch({
        type: ADD_LOCATION,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
