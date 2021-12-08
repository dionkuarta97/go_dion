import {
    SET_FINAL_ANSWER,
    SET_NUMBER,
    SET_SAVE_ANSWER,
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
            // return {
            //     ...state,
            //     answers: [...state.answers, action.payload],
            // };
            return {
                ...state,
                answers: action.payload,
            };
        default:
            return state;
    }
}
