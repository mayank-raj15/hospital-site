import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import activitiesReducer from "./activitiesReducer";
import authReducer from "./authReducer";
import doctorsReducer from "./doctorsReducer";
import attendanceReducer from "./attendanceReducer";
import scheduleReducer from "./scheduleReducer";
import userDetailsReducer from "./userDetailsReducer";

export default combineReducers({
  auth: authReducer,
  doctors: doctorsReducer,
  activities: activitiesReducer,
  attendanceList: attendanceReducer,
  scheduleList: scheduleReducer,
  userDetails: userDetailsReducer,
  form: reduxForm,
});
