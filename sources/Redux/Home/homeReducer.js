import {SET_HOME_MENU, SET_SLIDER_IMAGES} from "./homeTypes";

const initialState = {
    sliderImages: {
        loading: false,
        error: null,
        data: null,
    },
    homeMenu: {
        loading: false,
        error: null,
        data: null,
    },
};

export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SLIDER_IMAGES:
            return {
                ...state,
                sliderImages: action.payload,
            };
        case SET_HOME_MENU:
            return {
                ...state,
                homeMenu: action.payload,
            };
        default:
            return state;
    }
}
