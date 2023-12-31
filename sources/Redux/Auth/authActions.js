import {
  urlCheckEmail,
  urlForgotPassword,
  urlLogin,
  urlRegister,
  urlOneSignal,
} from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";
import { getMe, setProfile } from "../Profile/profileActions";
import {
  SET_EMAIL_CHECK,
  SET_FORGOT_PASSWORD,
  SET_LOGIN,
  SET_LOGIN_DATA,
  SET_FIRST_LOGIN,
  SET_REGISTER,
  SET_TOKEN,
  SET_CHANGE_PASSWORD,
  SET_APP_BACKGROUND,
} from "./authTypes";

export function setLoginStatus(status) {
  return {
    type: SET_LOGIN,
    payload: status,
  };
}

export function setFirstLogin(payload) {
  return {
    type: SET_FIRST_LOGIN,
    payload,
  };
}

export const setAppBackground = (payload) => {
  return {
    type: SET_APP_BACKGROUND,
    payload,
  };
};

export function getLogin({ username, password, playerId }) {
  return async (dispatch, getState) => {
    const urlBase = getState().initReducer.baseUrl;

    dispatch(setLoginData(defaultInitState));
    dispatch(setProfile(null));
    dispatch(setToken(null));

    try {
      fetch(urlBase + urlLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setTimeout(() => {
              dispatch(setLoginData(defaultDoneState(json.data)));
            }, 2000);

            dispatch(setLoginStatus(true));
            dispatch(setToken(json.data.token));
            dispatch(setProfile(json.data.user));
            fetch(urlBase + urlOneSignal, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${json.data.token}`,
              },
              body: JSON.stringify({
                player_id: playerId,
              }),
            })
              .then((response) => response.json())
              .then((json) => {});
          } else dispatch(setLoginData(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setLoginData(defaultErrorState));
        });
    } catch (err) {
      dispatch(setLoginData(defaultErrorState));
    }
  };
}

export function setCheckPassword(payload) {
  return {
    type: SET_CHANGE_PASSWORD,
    payload,
  };
}

export function getCheckPassword({ username, password }) {
  return async (dispatch, getState) => {
    const urlBase = getState().initReducer.baseUrl;

    dispatch(setCheckPassword({ loading: true, error: null, valid: false }));
    try {
      fetch(urlBase + urlLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(
              setCheckPassword({ loading: false, error: null, valid: true })
            );
          } else
            dispatch(
              setCheckPassword({ loading: false, error: 401, valid: false })
            );
        })
        .catch((err) => {
          dispatch(
            setCheckPassword({ loading: false, error: 500, valid: false })
          );
        });
    } catch (err) {
      dispatch(setCheckPassword({ loading: false, error: 500, valid: false }));
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

export function setEmailCheck(state) {
  return {
    type: SET_EMAIL_CHECK,
    payload: state,
  };
}

export function getEmailCheck(email) {
  return async (dispatch, getState) => {
    const urlBase = getState().initReducer.baseUrl;

    dispatch(setEmailCheck(defaultInitState));
    try {
      fetch(urlBase + urlCheckEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setEmailCheck(defaultDoneState(json.message)));
          } else dispatch(setEmailCheck(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setEmailCheck(defaultErrorState));
        });
    } catch (err) {
      dispatch(setEmailCheck(defaultErrorState));
    }
  };
}

export function setRegister(state) {
  return {
    type: SET_REGISTER,
    payload: state,
  };
}

export function getRegister(bodyParams) {
  return async (dispatch, getState) => {
    dispatch(setRegister(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyParams,
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setRegister(defaultDoneState(json.data)));
          } else dispatch(setRegister(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setRegister(defaultErrorState));
        });
    } catch (err) {
      dispatch(setRegister(defaultErrorState));
    }
  };
}

export function setForgotPassword(state) {
  return {
    type: SET_FORGOT_PASSWORD,
    payload: state,
  };
}

export function getForgotPassword(email, os) {
  return async (dispatch, getState) => {
    dispatch(setForgotPassword(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;

      fetch(urlBase + urlForgotPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, os: os }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setForgotPassword(defaultDoneState(json.message)));
          } else dispatch(setForgotPassword(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setForgotPassword(defaultErrorState));
        });
    } catch (err) {
      dispatch(setForgotPassword(defaultErrorState));
    }
  };
}

export function hitOneSignal(payload) {
  return async(dispatch, getState);
}

export const uploadFoto = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const urlBase = getState().initReducer.baseUrl;

      fetch(urlBase + "/masterdata/v1/auth/me/avatar", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
          "Content-Type": "multipart/form-data; ",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch(getMe());
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
