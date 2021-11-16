import {urlLogin} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {setProfile} from "../Profile/profileActions";
import {SET_LOGIN, SET_LOGIN_DATA, SET_TOKEN} from "./authTypes";

export function setLoginStatus(status) {
    return {
        type: SET_LOGIN,
        payload: status,
    };
}

export function getLogin({username, password}) {
    return async (dispatch, getState) => {
        dispatch(setLoginData(defaultInitState));
        try {
            fetch(urlLogin, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        dispatch(setLoginData(defaultDoneState(json.data)));
                        dispatch(setLoginStatus(true));
                        dispatch(setToken(json.data.token));
                        dispatch(setProfile(json.data.user));
                    } else
                        dispatch(
                            setLoginData(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    dispatch(setLoginData(defaultErrorState));
                });
        } catch (err) {
            dispatch(setLoginData(defaultErrorState));
        }
    };
}

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token,
    };
}

export function setLoginData(loginData) {
    return {
        type: SET_LOGIN_DATA,
        payload: loginData,
    };
}
