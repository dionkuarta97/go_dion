import { urlBaseScoring, urlListScore } from "../../Services/ApiUrl";
import {
   defaultDoneState,
   defaultErrorState,
   defaultFailedState,
   defaultInitState,
} from "../helper";
import { SET_LIST_SCORE, SET_SCORE } from "./scoreType";

export function setScore(data) {
   return {
      type: SET_SCORE,
      payload: data,
   };
}

export function getScore(payload) {
   return async (dispatch, getState) => {
      dispatch(setScore(defaultInitState));
      try {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + urlBaseScoring + "/scoring/myscore/related", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
            body: JSON.stringify({
               related_to: payload,
            }),
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) {
                  dispatch(setScore(defaultDoneState(json.data)));
               } else dispatch(setScore(defaultFailedState(json.message)));
            })
            .catch((err) => {
               dispatch(setScore(defaultErrorState));
            });
      } catch (err) {
         dispatch(setScore(defaultErrorState));
      }
   };
}

export function setListScore(data) {
   return {
      type: SET_LIST_SCORE,
      payload: data,
   };
}

export function getListScore() {
   return async (dispatch, getState) => {
      dispatch(setListScore(defaultInitState));
      try {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + urlListScore, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) {
                  dispatch(setListScore(defaultDoneState(json.data)));
               } else dispatch(setListScore(defaultFailedState(json.message)));
            })
            .catch((err) => {
               dispatch(setListScore(defaultErrorState));
            });
      } catch (err) {
         dispatch(setListScore(defaultErrorState));
      }
   };
}
