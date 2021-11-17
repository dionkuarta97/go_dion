import {
    SET_EMAIL_CHECK,
    SET_FORGOT_PASSWORD,
    SET_LOGIN,
    SET_LOGIN_DATA,
    SET_REGISTER,
    SET_TOKEN,
} from "./authTypes";

const initialState = {
    isLogin: false,
    token: null,
    login: {
        loading: false,
        error: null,
        data: null,
    },
    register: {
        loading: false,
        error: null,
        data: null,
    },
    checkEmail: {
        loading: false,
        error: null,
        data: null,
    },
    forgotPassword: {
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
        case SET_LOGIN_DATA:
            return {
                ...state,
                login: action.payload,
            };
        case SET_EMAIL_CHECK:
            return {
                ...state,
                checkEmail: action.payload,
            };
        case SET_REGISTER:
            return {
                ...state,
                register: action.payload,
            };
        case SET_FORGOT_PASSWORD:
            return {
                ...state,
                forgotPassword: action.payload,
            };
        default:
            return state;
    }
}
