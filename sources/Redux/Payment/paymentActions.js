import {urlPaymentMethod} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";

import {SET_PAYMENT_METHOD, SET_SELECTED_PAYMENT_METHOD} from "./paymentTypes";

export function setPaymentMethod(state) {
    return {
        type: SET_PAYMENT_METHOD,
        payload: state,
    };
}

export function getPaymentMethod(section_id) {
    return async (dispatch, getState) => {
        dispatch(setPaymentMethod(defaultInitState));
        try {
            fetch(urlPaymentMethod, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        dispatch(setPaymentMethod(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setPaymentMethod(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setPaymentMethod(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setPaymentMethod(defaultErrorState));
        }
    };
}

export function setSelectedPaymentMethod(item) {
    return {
        type: SET_SELECTED_PAYMENT_METHOD,
        payload: item,
    };
}
