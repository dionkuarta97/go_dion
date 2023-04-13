import {
   defaultDoneState,
   defaultErrorState,
   defaultFailedState,
   defaultInitState,
} from "../helper";
import {
   ADD_TO_CART,
   CLEAR_CART,
   REMOVE_FROM_CART,
   SET_CARTS,
} from "./cartTypes";

export function addToCart(item) {
   return {
      type: ADD_TO_CART,
      payload: item,
   };
}

export function removeFromCart(item) {
   return {
      type: REMOVE_FROM_CART,
      payload: item,
   };
}

export function clearCart() {
   return {
      type: CLEAR_CART,
   };
}

export const setCarts = (payload) => {
   return {
      type: SET_CARTS,
      payload,
   };
};

export const getCarts = () => {
   return async (dispatch, getState) => {
      try {
         dispatch(setCarts(defaultInitState));
         const urlBase = getState().initReducer.baseUrl;
         const response = await fetch(urlBase + "/masterdata/v1/carts", {
            method: "GET",
            headers: {
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
         });

         const json = await response.json();
         if (json.status) {
            dispatch(setCarts(defaultDoneState(json.data)));
         } else {
            dispatch(setCarts(defaultFailedState(json.message)));
         }
      } catch (err) {
         dispatch(setCarts(defaultErrorState));
      }
   };
};

export const addCart = (payload) => {
   return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + "/masterdata/v1/carts/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
            body: JSON.stringify({
               product_id: payload,
            }),
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) resolve("sukses");
               else reject(json.message);
            })
            .catch((err) => {
               reject("Terjadi kesalahan pada server");
            })
            .finally(() => dispatch(getCarts()));
      });
   };
};

export const deleteCart = (payload) => {
   return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + "/masterdata/v1/carts/" + payload, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) resolve("sukses");
               else reject(json.message);
            })
            .catch((err) => {
               reject("Terjadi kesalahan pada server");
            })
            .finally(() => dispatch(getCarts()));
      });
   };
};

export const deleteAllCart = () => {
   return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
         const urlBase = getState().initReducer.baseUrl;

         fetch(urlBase + "/masterdata/v1/carts", {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${getState().authReducer.token}`,
            },
         })
            .then((response) => response.json())
            .then((json) => {
               if (json.status) resolve("sukses");
               else reject(json.message);
            })
            .catch((err) => {
               reject("Terjadi kesalahan pada server");
            })
            .finally(() => dispatch(getCarts()));
      });
   };
};
