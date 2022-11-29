import { FETCH_ONE_SCHEDULE } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_ONE_SCHEDULE:
      return action.payload || false;

    default:
      return state;
  }
}
