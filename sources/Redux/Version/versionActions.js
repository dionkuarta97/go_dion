import { defaultErrorState } from "../helper";
import { SET_CHECK_VERSION } from "./versionTypes";

export function setCheckVersion(payload) {
  return {
    type: SET_CHECK_VERSION,
    payload,
  };
}

export function getVersion(os) {
  return async (disptach, getState) => {
    try {
      const body = JSON.stringify({
        os: os,
        code:
          os === "android"
            ? getState().versionReducer.androidVersion
            : getState().versionReducer.iosVersion,
      });
      const urlBase = getState().initReducer.baseUrl;
      console.log(urlBase);
      const response = await fetch(urlBase + "/masterdata/v1/version/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      const result = await response.json();
      console.log(result, "dada");

      disptach(
        setCheckVersion({
          upToDate: result.data.status,
          message: result.message,
        })
      );
    } catch (error) {
      disptach(setCheckVersion(defaultErrorState));
    }
  };
}
