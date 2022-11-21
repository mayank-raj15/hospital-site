import axios from "axios";
import { FETCH_USER, FETCH_DOCTORS, FETCH_ACTIVITIES } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const submitRole = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/admin/role", values);
  history.push("/appointments");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchDoctors = () => async (dispatch) => {
  const res = await axios.get("/api/doctors");

  dispatch({ type: FETCH_DOCTORS, payload: res.data });
};

export const updateProfile = (values) => async (dispatch) => {
  const res = await axios.post("/api/profile", values);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchActivities = () => async (dispatch) => {
  const res = await axios.get("/api/activities");

  dispatch({ type: FETCH_ACTIVITIES, payload: res.data });
};

export const updateStatus = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.post("/api/schedule/status", values);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateSchedule = (values) => async (dispatch) => {
  const res = await axios.post("/api/schedule/days", values);
  dispatch({ type: FETCH_USER, payload: res.data });
};
