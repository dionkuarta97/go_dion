import { urlQuests } from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {
    SET_FINAL_ANSWER,
    SET_NUMBER,
    SET_SAVE_ANSWER,
    SET_SOAL,
    SET_SOAL_URL,
} from "./soalTypes";

export function setSoalUrl(url) {
    return {
        type: SET_SOAL_URL,
        payload: url,
    };
}

export function setSoal(data) {
    return {
        type: SET_SOAL,
        payload: data,
    };
}

export function getSoal() {
    return async (dispatch, getState) => {
        dispatch(setSoal(defaultInitState));
        try {
            console.log(getState().soalReducer.url);
            const urlBase = getState().initReducer.baseUrl;
            fetch(urlBase + getState().soalReducer.url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setSoal(defaultDoneState(json.data)));
                    } else dispatch(setSoal(defaultFailedState(json.message)));
                })
                .catch((err) => {
                    dispatch(setSoal(defaultErrorState));
                });
        } catch (err) {
            dispatch(setSoal(defaultErrorState));
        }
    };
}

export function setNumber(number) {
    return {
        type: SET_NUMBER,
        payload: number,
    };
}

export function setFinalAnswer(array) {
    console.log("-------------> setFinalAnswer:", array)
    return {
        type: SET_FINAL_ANSWER,
        payload: array,
    };
}

export function setSaveAnswer(state) {
    console.log("-------------> save answer:", state)
    return {
        type: SET_SAVE_ANSWER,
        payload: state,
    };
}

export function saveAnswer(status) {
    console.log("save answer...")
    return async (dispatch, getState) => {
        dispatch(setSaveAnswer(defaultInitState));
        try {
            const bodyParams = JSON.stringify({
                related_to: getState().soalReducer.soal.data.related_to,
                raw_data: getState().soalReducer.soal.data.sessions,
                answers: getState().soalReducer.answers,
                status: status,
            });
            console.log("=== Save Answers ===")
            console.log(bodyParams)
            console.log("=== Save Answers: eof ===")
            const urlBase = getState().initReducer.baseUrl;
            fetch(urlBase + urlQuests + "/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
                body: bodyParams,
            })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((json) => {
                    console.log(json);
                    if (json.status) {
                        dispatch(setSaveAnswer(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setSaveAnswer(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    dispatch(setSaveAnswer(defaultErrorState));
                });
        } catch (err) {
            dispatch(setSaveAnswer(defaultErrorState));
        }
    };
}
