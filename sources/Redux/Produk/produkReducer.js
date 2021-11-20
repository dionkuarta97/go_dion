import {
    SET_ALL_PRODUK,
    SET_GROUPED_PRODUK,
    SET_PURCHASED_PRODUK,
    SET_TOTAL_PURCHASED_PRODUK,
} from "./produkTypes";

const initialState = {
    groupedProduk: {
        loading: false,
        error: null,
        data: null,
    },
    allProduk: {
        loading: false,
        error: null,
        data: null,
    },
    totalPurchasedProduk: {
        loading: false,
        error: null,
        data: null,
    },
    purchasedProduk: {
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
        case SET_ALL_PRODUK:
            return {
                ...state,
                allProduk: action.payload,
            };
        case SET_TOTAL_PURCHASED_PRODUK:
            return {
                ...state,
                totalPurchasedProduk: action.payload,
            };
        case SET_PURCHASED_PRODUK:
            return {
                ...state,
                purchasedProduk: action.payload,
            };
        default:
            return state;
    }
}
