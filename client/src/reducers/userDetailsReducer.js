import { FETCH_USER_DETAILS } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return action.payload || false;

    default:
      return state;
  }
}
