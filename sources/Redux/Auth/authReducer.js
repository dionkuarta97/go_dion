import {
  SET_EMAIL_CHECK,
  SET_FORGOT_PASSWORD,
  SET_LOGIN,
  SET_LOGIN_DATA,
  SET_REGISTER,
  SET_TOKEN,
  SET_CHANGE_PASSWORD,
  SET_FIRST_LOGIN,
  SET_APP_BACKGROUND,
} from "./authTypes";

const initialState = {
  firstLogin: true,
  isLogin: false,
  token: null,
  app_background: null,
  login: {
    loading: false,
    error: null,
    data: null,
  },
  register: {
    loading: false,
    error: null,
    data: null,
  },
  checkEmail: {
    loading: false,
    error: null,
    data: null,
  },
  forgotPassword: {
    loading: false,
    error: null,
    data: null,
  },
  checkPassword: {
    loading: false,
    error: null,
    valid: false,
  },
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_FIRST_LOGIN:
      return {
        ...state,
        firstLogin: action.payload,
      };
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SET_LOGIN_DATA:
      return {
        ...state,
        login: action.payload,
      };
    case SET_EMAIL_CHECK:
      return {
        ...state,
        checkEmail: action.payload,
      };
    case SET_REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case SET_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };
    case SET_CHANGE_PASSWORD:
      return {
        ...state,
        checkPassword: action.payload,
      };
    case SET_APP_BACKGROUND:
      return {
        ...state,
        app_background: action.payload,
      };
    default:
      return state;
  }
}
