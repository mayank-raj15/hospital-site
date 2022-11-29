import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import activitiesReducer from "./activitiesReducer";
import authReducer from "./authReducer";
import doctorsReducer from "./doctorsReducer";
import attendanceReducer from "./attendanceReducer";
import scheduleListReducer from "./sheduleListReducer";
import userDetailsReducer from "./userDetailsReducer";
import scheduleReducer from "./scheduleReducer";
import appointmentsReducer from "./appointmentsReducer";

export default combineReducers({
  auth: authReducer,
  doctors: doctorsReducer,
  activities: activitiesReducer,
  attendanceList: attendanceReducer,
  scheduleList: scheduleListReducer,
  userDetails: userDetailsReducer,
  schedule: scheduleReducer,
  appointments: appointmentsReducer,
  form: reduxForm,
});
