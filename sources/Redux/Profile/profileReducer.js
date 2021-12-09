import {
    SET_ME,
    SET_PROFILE,
    SET_STATISTIC,
    SET_UPDATE_PROFILE,
    SET_NEW_PASSWORD,
} from "./profileTypes";

const initialState = {
    me: {
        loading: false,
        error: null,
        data: null,
    },
    profile: null,
    statistic: null,
    updateProfile: {
        loading: false,
        error: null,
        data: null,
    },
    updatePassword: {
        loading: false,
        error: null,
        data: null,
    },
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
        case SET_UPDATE_PROFILE:
            return {
                ...state,
                updateProfile: action.payload,
            };
        case SET_NEW_PASSWORD:
            return {
                ...state,
                updatePassword: action.payload,
            };
        default:
            return state;
    }
}
