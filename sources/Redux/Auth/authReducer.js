import {SET_LOGIN, SET_LOGIN_DATA, SET_TOKEN} from "./authTypes";

const initialState = {
    isLogin: false,
    token: null,
    login: {
        loading: false,
        error: null,
        data: null,
    },
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            };
        case SET_LOGIN_DATA: {
            return {
                ...state,
                login: action.payload,
            };
        }
        default:
            return state;
    }
}
