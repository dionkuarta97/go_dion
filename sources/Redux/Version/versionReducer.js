import { SET_CHECK_VERSION } from "./versionTypes";

const initialState = {
  androidVersion: "0.1.54",
  iosVersion: "0.0.0",
  androidCode: 34,
  iosCode: 0,
  checkVersion: {
    upToDate: false,
    message: null,
  },
};

export function versionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHECK_VERSION:
      return { ...state, checkVersion: action.payload };
    default:
      return state;
  }
}
