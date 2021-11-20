import {
    SET_CURRENT_PAYMENT,
    SET_PAYMENT_DETAIL,
    SET_PAYMENT_LIST,
    SET_PAYMENT_METHOD,
    SET_PAYMENT_PROCESS,
    SET_SELECTED_PAYMENT_METHOD,
} from "./paymentTypes";

const initialState = {
    paymentMethod: {
        loading: false,
        error: null,
        data: null,
    },
    selectedPaymentMethod: null,
    paymentProcess: {
        loading: false,
        error: null,
        data: null,
    },
    currentPayment: null,
    paymentList: {
        loading: false,
        error: null,
        data: null,
    },
    paymentDetail: {
        loading: false,
        error: null,
        data: null,
    },
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
        case SET_PAYMENT_PROCESS:
            return {
                ...state,
                paymentProcess: action.payload,
            };
        case SET_CURRENT_PAYMENT:
            return {
                ...state,
                currentPayment: action.payload,
            };
        case SET_PAYMENT_LIST:
            return {
                ...state,
                paymentList: action.payload,
            };
        case SET_PAYMENT_DETAIL:
            return {
                ...state,
                paymentDetail: action.payload,
            };
        default:
            return state;
    }
}
