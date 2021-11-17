import {urlMe} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {SET_ME, SET_PROFILE, SET_STATISTIC} from "./profileTypes";

export function getMe() {
    return async (dispatch, getState) => {
        dispatch(setMe(defaultInitState));
        try {
            fetch(urlMe, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getState().authReducer.token}`,
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);

                    if (json.status) {
                        dispatch(setMe(defaultDoneState(json.data.user)));
                        dispatch(setProfile(json.data.profile));
                        dispatch(setStatistic(json.data.statistics));
                    } else dispatch(setMe(defaultFailedState(json.message)));
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(setMe(defaultErrorState));
                });
        } catch (err) {
            console.log(err);
            dispatch(setMe(defaultErrorState));
        }
    };
}

export function setProfile(userData) {
    return {
        type: SET_PROFILE,
        payload: userData,
    };
}

export function setStatistic(userData) {
    return {
        type: SET_STATISTIC,
        payload: userData,
    };
}

export function setMe(userData) {
    return {
        type: SET_ME,
        payload: userData,
    };
}
