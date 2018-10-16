import {
  GET_LOCATIONS,
  GET_CURRENT_LOCATION,
  ADD_LOCATION
} from "../actions/types";

const initialState = {
  center: {
    lat: 50.505,
    lng: -0.09
  },
  zoom: 5,
  markers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        markers: action.payload
      };
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        center: action.payload
      };
    case ADD_LOCATION:
      return {
        ...state
      };

    default:
      return state;
  }
}
