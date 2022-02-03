import {
  defaultDoneState,
  defaultInitState,
  defaultFailedState,
  defaultErrorState,
} from "../helper";

import {
  SET_CHART_TRYOUT,
  SET_DETAIL_TRYOUT,
  SET_LIST_TRYOUT,
  SET_PRODI,
  SET_TYPE_TRYOUT,
} from "./LaporanType";

export function setTypeTryout(payload) {
  return {
    type: SET_TYPE_TRYOUT,
    payload,
  };
}

export function getTypeTryout() {
  return async (dispatch, getState) => {
    try {
      dispatch(setTypeTryout(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;

      const response = await fetch(
        urlBase + "/scoring/v1/report/tryouts/type",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );

      const json = await response.json();
      if (json.status) {
        dispatch(setTypeTryout(defaultDoneState(json.data)));
      } else {
        dispatch(setTypeTryout(defaultFailedState(json.message)));
      }
    } catch (err) {
      dispatch(setTypeTryout(defaultErrorState));
    }
  };
}

export const setListTryout = (payload) => {
  return {
    type: SET_LIST_TRYOUT,
    payload,
  };
};

export const getListTryout = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setListTryout(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase + "/scoring/v1/report/tryouts?type=" + payload,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setListTryout(defaultDoneState(json.data)));
      } else {
        dispatch(setListTryout(defaultFailedState(json.message)));
      }
    } catch (err) {
      dispatch(setListTryout(defaultErrorState));
    }
  };
};

export function setChartTryout(payload) {
  return {
    type: SET_CHART_TRYOUT,
    payload,
  };
}

export function getChartTryout(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setChartTryout(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      let url = "";
      if (payload.type === "uas") {
        url = "/scoring/v1/report/tryouts/chart?type=" + payload.type;
      } else {
        url =
          "/scoring/v1/report/tryouts/chart?type=" +
          payload.type +
          "&prodi=" +
          payload.prodi;
      }
      const response = await fetch(urlBase + url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      });
      const json = await response.json();
      if (json.status) {
        dispatch(setChartTryout(defaultDoneState(json.data)));
      } else {
        dispatch(setChartTryout(defaultFailedState(json.message)));
      }
    } catch (error) {
      dispatch(setChartTryout(defaultErrorState));
    }
  };
}

export function setProdi(payload) {
  return {
    type: SET_PRODI,
    payload,
  };
}

export function setDetailTryout(payload) {
  return {
    type: SET_DETAIL_TRYOUT,
    payload,
  };
}

export function getDetailTryout(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setDetailTryout(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase +
          `/scoring/v1/report/tryouts/${payload._id}/detail?type=${payload.type}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setDetailTryout(defaultDoneState(json.data)));
      } else {
        dispatch(setDetailTryout(defaultFailedState(json.message)));
      }
    } catch (error) {
      dispatch(setDetailTryout(defaultErrorState));
    }
  };
}