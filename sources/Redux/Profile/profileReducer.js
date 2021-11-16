import {SET_ME, SET_PROFILE, SET_STATISTIC} from "./profileTypes";

const initialState = {
    me: {
        loading: false,
        error: null,
        data: null,
    },
    profile: null,
    statistic: null,
};

export function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ME:
            return {
                ...state,
                me: action.payload,
            };
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case SET_STATISTIC:
            return {
                ...state,
                statistic: action.payload,
            };

        default:
            return state;
    }
}
