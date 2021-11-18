import {urlGroupedProduk} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {SET_GROUPED_PRODUK} from "./produkTypes";

export function setGroupedProduk(state) {
    return {
        type: SET_GROUPED_PRODUK,
        payload: state,
    };
}

export function getGroupedProduk() {
    return async (dispatch, getState) => {
        dispatch(setGroupedProduk(defaultInitState));
        try {
            fetch(urlGroupedProduk, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);

                    if (json.status) {
                        dispatch(setGroupedProduk(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setGroupedProduk(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setGroupedProduk(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setGroupedProduk(defaultErrorState));
        }
    };
}
