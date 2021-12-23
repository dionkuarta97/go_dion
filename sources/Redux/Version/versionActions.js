import { SET_CHECK_VERSION } from "./versionTypes"

export function setCheckVersion(payload) {
   return {
      type: SET_CHECK_VERSION,
      payload
   }
}


export function getVersion() {
   return async (disptach, getState) => {
      try {
         const baseUrl = "https://apionline.gobimbelonline.net/scoring/v1"
         const body = JSON.stringify({
            os: "android",
            version: getState().versionReducer.androidCode
         })

         const response = await fetch(baseUrl + "/version/check", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: body
         })
         const result = await response.json()
         console.log(result);
         if (result.status) {
            disptach(setCheckVersion({ upToDate: true, message: result.message }))
         } else {
            disptach(setCheckVersion({ upToDate: false, message: result.message }))
         }
      } catch (error) {
         console.log(error);
      }
   }
}