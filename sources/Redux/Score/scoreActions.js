import { urlListScore } from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import { SET_LIST_SCORE, SET_SCORE } from "./scoreType";

export function setScore(data) {
    return {
        type: SET_SCORE,
        payload: data,
    };
}

export function getScore(idMateri) {
    return async (dispatch, getState) => {
        dispatch(setScore(defaultInitState));
        try {
            console.log(getState().soalReducer.url);
            const urlBase = getState().initReducer.baseUrl;
            fetch(urlBase + urlListScore + `/${idMateri}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setScore(defaultDoneState(json.data)));
                    } else dispatch(setScore(defaultFailedState(json.message)));
                })
                .catch((err) => {
                    dispatch(setScore(defaultErrorState));
                });
        } catch (err) {
            dispatch(setScore(defaultErrorState));
        }
    };
}

export function setListScore(data) {
    return {
        type: SET_LIST_SCORE,
        payload: data,
    };
}

export function getListScore() {
    return async (dispatch, getState) => {
        dispatch(setListScore(defaultInitState));
        try {
            console.log(getState().soalReducer.url);
            const urlBase = getState().initReducer.baseUrl;

            fetch(urlBase + urlListScore, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setListScore(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setListScore(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    dispatch(setListScore(defaultErrorState));
                });
        } catch (err) {
            dispatch(setListScore(defaultErrorState));
        }
    };
}
