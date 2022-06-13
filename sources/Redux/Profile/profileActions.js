import { urlMe, urlUpdateMe } from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";
import {
  SET_ME,
  SET_PROFILE,
  SET_STATISTIC,
  SET_UPDATE_PROFILE,
  SET_NEW_PASSWORD,
} from "./profileTypes";

export function getMe() {
  return async (dispatch, getState) => {
    dispatch(setMe(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlMe, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setMe(defaultDoneState(json.data.user)));
            dispatch(setProfile(json.data.profile));
            dispatch(setStatistic(json.data.statistics));
          } else dispatch(setMe(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setMe(defaultErrorState));
        });
    } catch (err) {
      console.log(err);
      dispatch(setMe(defaultErrorState));
    }
  };
}

export function setProfile(userData) {
  return {
    type: SET_PROFILE,
    payload: userData,
  };
}

export function setStatistic(userData) {
  return {
    type: SET_STATISTIC,
    payload: userData,
  };
}

export function setMe(userData) {
  return {
    type: SET_ME,
    payload: userData,
  };
}

export function setUpdateProfile(userData) {
  return {
    type: SET_UPDATE_PROFILE,
    payload: userData,
  };
}

export function getUpdateProfile(bodyParams) {
  return async (dispatch, getState) => {
    dispatch(setUpdateProfile(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      console.log(bodyParams, "><body");
      fetch(urlBase + urlUpdateMe, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
        body: bodyParams,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);

          if (json.status) {
            console.log(json, ">>>>");
            dispatch(setUpdateProfile(defaultDoneState(json.data)));
            dispatch(setProfile(json.data));
          } else dispatch(setUpdateProfile(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setUpdateProfile(defaultErrorState));
        });
    } catch (err) {
      dispatch(setUpdateProfile(defaultErrorState));
    }
  };
}

export function updatePassword(bodyParams) {
  console.log("update password...");
  return async (dispatch, getState) => {
    // bodyParams['token'] = `Bearer ${getState().authReducer.token}`
    console.log("params : ", bodyParams);
    dispatch(setNewPassword(defaultInitState));
    try {
      fetch("https://apionline.gobimbelonline.net/masterdata/v1/fp/reset", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyParams),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);

          if (json.status) {
            dispatch(setNewPassword(defaultDoneState(json.code)));
            // dispatch(setProfile(json.data));
          } else dispatch(setUpdateProfile(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log("catch err: ", err);
          dispatch(setNewPassword(defaultErrorState));
        });
    } catch (err) {
      console.log("err:", err);
      dispatch(setNewPassword(defaultErrorState));
    }
  };
}

export function setNewPassword(userData) {
  return {
    type: SET_NEW_PASSWORD,
    payload: userData,
  };
}
