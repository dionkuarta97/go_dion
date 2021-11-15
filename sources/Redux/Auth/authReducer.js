import { SET_LOGIN, SET_LOGIN_DATA } from "./authTypes";

const initialState = {
    isLogin: false,
    user: {
        loading: false,
        error: null,
        data: null,
    },
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            };

        case SET_LOGIN_DATA: {
            return {
                ...state,
                user: action.payload,
            };
        }
        default:
            return state;
    }
}
