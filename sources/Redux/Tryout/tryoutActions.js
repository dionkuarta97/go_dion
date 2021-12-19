import { SET_GO_TRYOUT } from "./tryoutTypes";
import { defaultDoneState, defaultErrorState, defaultFailedState, defaultInitState } from "../helper";

export function setGoTryout(payload) {
  return {
    type: SET_GO_TRYOUT,
    payload,
  };
}

export function getGoTryout(payload) {
  return async (dispatch, getState) => {
    dispatch(setGoTryout(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(urlBase + "/masterdata/v1/tryouts?status=" + payload, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      });
      const result = await response.json();
      if (result.status) dispatch(setGoTryout(defaultDoneState(result.data)));
      else dispatch(setGoTryout(defaultFailedState(result.message)));
    } catch (err) {
      console.log(err);
      dispatch(setGoTryout(defaultErrorState));
    }
  };
}
