import { SET_BASEURL } from "./initTypes";

const initialState = {
    baseUrl: "https://apionline.gobimbelonline.net",
};

export function initReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BASEURL:
            return {
                ...state,
                baseUrl: action.payload,
            };
        default:
            return state;
    }
}
