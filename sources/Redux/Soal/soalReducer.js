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

const initialState = {
  url: null,
  soal: {
    loading: false,
    error: null,
    data: null,
  },
  currentNumber: 1,
  answers: [],
  saveAnswer: {
    loading: false,
    error: null,
    data: null,
  },
  jawaban: null,
  jawabanNon: null,
  saveScore: {
    rawData: [],
    answers: [],
    status: null,
  },
};

export function soalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOAL_URL:
      return {
        ...state,
        url: action.payload,
      };
    case SET_SOAL:
      return {
        ...state,
        soal: action.payload,
      };
    case SET_NUMBER:
      return {
        ...state,
        currentNumber: action.payload,
      };
    case SET_SAVE_ANSWER:
      return {
        ...state,
        saveAnswer: action.payload,
      };
    case SET_FINAL_ANSWER:
      return {
        ...state,
        answers: [action.payload],
      };
    // return {
    //     ...state,
    //     answers: action.payload,
    // };
    case SET_SAVE_SCORE:
      return {
        ...state,
        saveScore: action.payload,
      };
    case SET_JAWABAN:
      return {
        ...state,
        jawaban: action.payload,
      };
    case SET_JAWABAN_NONBLOCKING:
      return {
        ...state,
        jawabanNon: action.payload,
      };
    default:
      return state;
  }
}
