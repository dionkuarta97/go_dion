import { SET_CHECK_VERSION } from "./versionTypes";

const initialState = {
  androidVersion: "0.1.83",
  iosVersion: "0.1.83",
  nowVersion: 46,
  androidCode: 46,
  iosCode: 45,
  checkVersion: {
    upToDate: false,
    message: null,
    error: null,
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
