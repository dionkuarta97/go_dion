import {SET_MATERI, SET_MATERI_DETAIL} from "./materiTypes";

const initialState = {
    materi: {
        loading: false,
        error: null,
        data: null,
    },
    materiDetail: {
        loading: false,
        error: null,
        data: null,
    },
};

export function materiReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MATERI: {
            return {
                ...state,
                materi: action.payload,
            };
        }
        case SET_MATERI_DETAIL:
            return {
                ...state,
                materiDetail: action.payload,
            };
        default:
            return state;
    }
}
