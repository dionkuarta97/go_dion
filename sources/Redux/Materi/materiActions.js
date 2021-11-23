import {urlMateri} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {SET_MATERI, SET_MATERI_DETAIL} from "./materiTypes";

export function setMateri(data) {
    return {
        type: SET_MATERI,
        payload: data,
    };
}

export function getMateri() {
    return async (dispatch, getState) => {
        dispatch(setMateri(defaultInitState));
        try {
            fetch(urlMateri, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setMateri(defaultDoneState(json.data)));
                    } else
                        dispatch(setMateri(defaultFailedState(json.message)));
                })
                .catch((err) => {
                    dispatch(setMateri(defaultErrorState));
                });
        } catch (err) {
            dispatch(setMateri(defaultErrorState));
        }
    };
}

export function setMateriDetail(data) {
    return {
        type: SET_MATERI_DETAIL,
        payload: data,
    };
}

export function getMateriDetail(materiId) {
    console.log(materiId);
    return async (dispatch, getState) => {
        dispatch(setMateriDetail(defaultInitState));
        try {
            fetch(urlMateri + `/${materiId}/detail`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setMateriDetail(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setMateriDetail(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    dispatch(setMateriDetail(defaultErrorState));
                });
        } catch (err) {
            dispatch(setMateriDetail(defaultErrorState));
        }
    };
}