import axios from "axios";
import { FETCH_USER, FETCH_DOCTORS } from "./types";

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
