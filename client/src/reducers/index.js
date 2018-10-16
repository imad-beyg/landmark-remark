import { combineReducers } from "redux";
import authReducer from "./authReducer";
import locationsReducer from "./locationsReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  locations: locationsReducer,
  errors: errorReducer
});
