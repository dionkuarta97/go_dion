import { SET_CHECK_VERSION } from "./versionTypes";

//** yang harus di ubah androidVersion dan iosVersion, harus sama dengan yang aktif */

const initialState = {
   androidVersion: "0.1.115",
   iosVersion: "0.1.115",
   nowVersion: 47,
   androidCode: 48,
   iosCode: 47,
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
