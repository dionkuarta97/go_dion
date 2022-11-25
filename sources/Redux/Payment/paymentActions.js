import {
  urlPayment,
  urlPaymentMethod,
  urlPaymentProcess,
} from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";

import {
  SET_CURRENT_PAYMENT,
  SET_INDEX_ACTIVE,
  SET_PAYMENT_DETAIL,
  SET_PAYMENT_LIST,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_PROCESS,
  SET_SELECTED_PAYMENT_METHOD,
} from "./paymentTypes";

export function setPaymentMethod(state) {
  return {
    type: SET_PAYMENT_METHOD,
    payload: state,
  };
}

export function getPaymentMethod(section_id) {
  return async (dispatch, getState) => {
    dispatch(setPaymentMethod(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlPaymentMethod, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setPaymentMethod(defaultDoneState(json.data)));
          } else dispatch(setPaymentMethod(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setPaymentMethod(defaultErrorState));
        });
    } catch (err) {
      dispatch(setPaymentMethod(defaultErrorState));
    }
  };
}

export function setSelectedPaymentMethod(item) {
  return {
    type: SET_SELECTED_PAYMENT_METHOD,
    payload: item,
  };
}

export function setPaymentProcess(state) {
  return {
    type: SET_PAYMENT_PROCESS,
    payload: state,
  };
}

export function getPaymentProcess(merge) {
  return async (dispatch, getState) => {
    if (getState().paymentReducer.selectedPaymentMethod !== null)
      try {
        dispatch(setPaymentProcess(defaultInitState));
        const bodyParams = JSON.stringify({
          merge: merge,
          provider: getState().paymentReducer.selectedPaymentMethod.name,
          payment_type: getState().paymentReducer.selectedPaymentMethod.method,
          products: getState().cartReducer.carts.data,
        });

        console.log(JSON.stringify(JSON.parse(bodyParams), null, 2));
        const urlBase = getState().initReducer.baseUrl;
        fetch(urlBase + urlPaymentProcess, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
          body: bodyParams,
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status) {
              dispatch(setPaymentProcess(defaultDoneState(json.data)));
            } else
              dispatch(setPaymentProcess(defaultFailedState(json.message)));
          })
          .catch((err) => {
            console.log(err);
            dispatch(setPaymentProcess(defaultErrorState));
          });
      } catch (err) {
        console.log(err);
        dispatch(setPaymentProcess(defaultErrorState));
      }
  };
}

export const getPaymentApple = (product) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const urlBase = getState().initReducer.baseUrl;
      const bodyParams = JSON.stringify({
        provider: "apple",
        payment_type: "apple_pay",
        products: [product],
      });

      fetch(urlBase + urlPaymentProcess, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
        body: bodyParams,
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export function setCurrentPayment(data) {
  return {
    type: SET_CURRENT_PAYMENT,
    payload: data,
  };
}

export function setPaymentList(state) {
  return {
    type: SET_PAYMENT_LIST,
    payload: state,
  };
}

export function getPaymentList(status) {
  return async (dispatch, getState) => {
    dispatch(setPaymentList(defaultInitState));

    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlPayment + `?status=${status}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setPaymentList(defaultDoneState(json.data)));
          } else dispatch(setPaymentList(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setPaymentList(defaultErrorState));
        });
    } catch (err) {
      dispatch(setPaymentList(defaultErrorState));
    }
  };
}

export const setIndexActive = (payload) => {
  return {
    type: SET_INDEX_ACTIVE,
    payload,
  };
};

export function setPaymentDetail(state) {
  return {
    type: SET_PAYMENT_DETAIL,
    payload: state,
  };
}

export function getPaymentDetail(orderId) {
  return async (dispatch, getState) => {
    dispatch(setPaymentDetail(defaultInitState));

    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlPayment + `/status?order_id=${orderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setPaymentDetail(defaultDoneState(json.data)));
          } else dispatch(setPaymentDetail(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setPaymentDetail(defaultErrorState));
        });
    } catch (err) {
      dispatch(setPaymentDetail(defaultErrorState));
    }
  };
}

export const batalTranksaksi = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const urlBase = getState().initReducer.baseUrl;

      fetch(urlBase + urlPayment + `/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(JSON.stringify(json, null, 2));
          if (json.status) {
            resolve("sukses");
          } else reject(json.message);
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
          reject("gagal");
        });
    });
  };
};
