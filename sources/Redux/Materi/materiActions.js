import {urlMateri} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {SET_MATERI_DETAIL} from "./materiTypes";

export function setMateriDetail(data) {
    return {
        type: SET_MATERI_DETAIL,
        payload: data,
    };
}

export function getMateriDetail() {
    return async (dispatch, getState) => {
        dispatch(setMateriDetail(defaultInitState));
        try {
            fetch(urlMateri + "/61246aef510acbda463eef8e/detail", {
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
