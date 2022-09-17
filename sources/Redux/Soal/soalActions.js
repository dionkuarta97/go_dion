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
      console.log(getState().soalReducer.url);
      const urlBase = getState().initReducer.baseUrl;
      console.log(urlBase + getState().soalReducer.url);
      fetch(urlBase + getState().soalReducer.url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(JSON.stringify(json, null, 2), "<<<<<JSON");
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
  console.log("-------------> setFinalAnswer:", array);
  return {
    type: SET_FINAL_ANSWER,
    payload: array,
  };
}

export function setSaveAnswer(state) {
  console.log("-------------> save answer:", state);
  return {
    type: SET_SAVE_ANSWER,
    payload: state,
  };
}

export function saveAnswer(data) {
  console.log("save answer...");
  return async (dispatch, getState) => {
    dispatch(setSaveAnswer(defaultInitState));
    try {
      console.log(JSON.stringify(data, null, 2), "<<<rawData");
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
          console.log(response);
          return response.json();
        })
        .then((json) => {
          console.log(json);
          if (json.status) {
            dispatch(setSaveAnswer(defaultDoneState(json.data)));
          } else dispatch(setSaveAnswer(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setSaveAnswer(defaultErrorState));
        });
    } catch (err) {
      console.log(err);
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
