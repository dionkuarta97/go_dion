import { SET_BASEURL, SET_TRANS_IOS } from "./initTypes";

export function setBaseurl(url) {
  return {
    type: SET_BASEURL,
    payload: url,
  };
}

export const setTransIos = (payload) => {
  return {
    type: SET_TRANS_IOS,
    payload,
  };
};
