import {SET_PAYMENT_METHOD, SET_SELECTED_PAYMENT_METHOD} from "./paymentTypes";

const initialState = {
    paymentMethod: {
        loading: false,
        error: null,
        data: null,
    },
    selectedPaymentMethod: null,
};

export function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case SET_SELECTED_PAYMENT_METHOD:
            return {
                ...state,
                selectedPaymentMethod: action.payload,
            };
        default:
            return state;
    }
}
