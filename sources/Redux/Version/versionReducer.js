import { SET_CHECK_VERSION } from "./versionTypes";

const initialState = {
  androidVersion: "0.1.63",
  iosVersion: "0.1.63",
  androidCode: 43,
  iosCode: 43,
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
