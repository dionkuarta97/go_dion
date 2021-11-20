import {urlGroupedProduk} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {
    SET_ALL_PRODUK,
    SET_GROUPED_PRODUK,
    SET_PURCHASED_PRODUK,
    SET_TOTAL_PURCHASED_PRODUK,
} from "./produkTypes";

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

export function setAllProduk(state) {
    return {
        type: SET_ALL_PRODUK,
        payload: state,
    };
}

export function getAllProduk(section_id) {
    return async (dispatch, getState) => {
        dispatch(setAllProduk(defaultInitState));
        try {
            fetch(urlGroupedProduk + `/${section_id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        dispatch(setAllProduk(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setAllProduk(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setAllProduk(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setAllProduk(defaultErrorState));
        }
    };
}

export function setTotalPurchasedProduk(state) {
    return {
        type: SET_TOTAL_PURCHASED_PRODUK,
        payload: state,
    };
}

export function getTotalPurchasedProduk(section_id) {
    return async (dispatch, getState) => {
        dispatch(setTotalPurchasedProduk(defaultInitState));
        try {
            fetch(urlGroupedProduk + `/${section_id}/purchased/count`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        dispatch(
                            setTotalPurchasedProduk(
                                defaultDoneState(json.data.total)
                            )
                        );
                    } else
                        dispatch(
                            setTotalPurchasedProduk(
                                defaultFailedState(json.message)
                            )
                        );
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setTotalPurchasedProduk(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setTotalPurchasedProduk(defaultErrorState));
        }
    };
}

export function setPurchasedProduk(state) {
    return {
        type: SET_PURCHASED_PRODUK,
        payload: state,
    };
}

export function getPurchasedproduk(section_id) {
    console.log("Start getting purchased produk");
    return async (dispatch, getState) => {
        dispatch(setPurchasedProduk(defaultInitState));
        try {
            fetch(urlGroupedProduk + `/${section_id}/purchased`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(
                            setPurchasedProduk(
                                defaultDoneState(json.data.total)
                            )
                        );
                    } else
                        dispatch(
                            setPurchasedProduk(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setPurchasedProduk(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setPurchasedProduk(defaultErrorState));
        }
    };
}
