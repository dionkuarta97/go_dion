import { SET_LIST_SCORE, SET_SCORE } from "./scoreType";

const initialState = {
    score: {
        loading: false,
        error: null,
        data: null,
    },
    listScore: {
        loading: false,
        error: null,
        data: null,
    },
};

export function scoreReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SCORE:
            return {
                ...state,
                score: action.payload,
            };
        case SET_LIST_SCORE:
            return {
                ...state,
                listScore: action.payload,
            };
        default:
            return state;
    }
}
