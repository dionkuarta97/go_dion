import { SET_BASEURL } from "./initTypes";

const initialState = {
    baseUrl: null,
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
