import { FETCH_SCHEDULE } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return action.payload;
    default:
      return state;
  }
}
