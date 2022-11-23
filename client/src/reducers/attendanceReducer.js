import { FETCH_ATTENDANCE } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_ATTENDANCE:
      return action.payload;
    default:
      return state;
  }
}
