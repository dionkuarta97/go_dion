import { urlQuests } from "../../Services/ApiUrl";
import {
   defaultDoneState,
   defaultErrorState,
   defaultFailedState,
   defaultInitState,
} from "../helper";
import {
   SET_FINAL_ANSWER,
   SET_JAWABAN,
   SET_JAWABAN_NONBLOCKING,
   SET_NUMBER,
   SET_SAVE_ANSWER,
   SET_SAVE_SCORE,
   SET_SOAL,
   SET_SOAL_URL,
} from "./soalTypes";

export function setSoalUrl(url) {
   return {
      type: SET_SOAL_URL,
      payload: url,
   };
}

export function setSaveScore(payload) {
   return {
      type: SET_SAVE_SCORE,
      payload,
   };
}

export function setSoal(data) {
   return {
      type: SET_SOAL,
      payload: data,
   };
}

export function getSoal() {
   return async (dispatch, getState) => {
      dispatch(setSoal(defaultInitState));
      try {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + getState().soalReducer.url, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) {
                  dispatch(setSoal(defaultDoneState(json.data)));
               } else dispatch(setSoal(defaultFailedState(json.message)));
            })
            .catch((err) => {
               dispatch(setSoal(defaultErrorState));
            });
      } catch (err) {
         dispatch(setSoal(defaultErrorState));
      }
   };
}

export function setNumber(number) {
   return {
      type: SET_NUMBER,
      payload: number,
   };
}

export function setFinalAnswer(array) {
   return {
      type: SET_FINAL_ANSWER,
      payload: array,
   };
}

export function setSaveAnswer(state) {
   return {
      type: SET_SAVE_ANSWER,
      payload: state,
   };
}

export function saveAnswer(data) {
   return async (dispatch, getState) => {
      dispatch(setSaveAnswer(defaultInitState));
      try {
         const urlBase = getState().initReducer.baseUrl;
         fetch(urlBase + urlQuests + "/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
            body: JSON.stringify(data),
         })
            .then((response) => {
               return response.json();
            })
            .then((json) => {
               if (json.status) {
                  dispatch(setSaveAnswer(defaultDoneState(json.data)));
               } else dispatch(setSaveAnswer(defaultFailedState(json.message)));
            })
            .catch((err) => {
               dispatch(setSaveAnswer(defaultErrorState));
            });
      } catch (err) {
         dispatch(setSaveAnswer(defaultErrorState));
      }
   };
}

export const setJawaban = (payload) => {
   return {
      type: SET_JAWABAN,
      payload,
   };
};

export const setJawabanNon = (payload) => {
   return {
      type: SET_JAWABAN_NONBLOCKING,
      payload,
   };
};
