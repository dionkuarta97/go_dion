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
      console.log(os);
      const body = JSON.stringify({
        os: os,
        version:
          os === "ios"
            ? getState().versionReducer.iosCode
            : getState().versionReducer.androidCode,
      });
      const response = await fetch(
        "https://apionline.gobimbelonline.net" + "/masterdata/v1/version/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      const result = await response.json();
      console.log(result, "dada");
      if (result.status) {
        disptach(setCheckVersion({ upToDate: true, message: result.message }));
      } else {
        disptach(setCheckVersion({ upToDate: false, message: result.message }));
      }
    } catch (error) {
      disptach(setCheckVersion(defaultErrorState));
    }
  };
}
