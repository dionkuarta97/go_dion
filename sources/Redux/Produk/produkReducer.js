import {SET_GROUPED_PRODUK} from "./produkTypes";

const initialState = {
    groupedProduk: {
        loading: false,
        error: null,
        data: null,
    },
};

export function produkReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GROUPED_PRODUK:
            return {
                ...state,
                groupedProduk: action.payload,
            };
        default:
            return state;
    }
}
