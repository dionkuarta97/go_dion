import { urlGroupedProduk } from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";
import {
  SET_ALL_PRODUK,
  SET_GROUPED_PRODUK,
  SET_INCLUDES_PRODUK,
  SET_PURCHASED_PRODUK,
  SET_TOTAL_PURCHASED_PRODUK,
  SET_SEARCH_PRODUCT_TITLE,
  SET_LOADING,
  SET_LOADING_DUA,
  SET_TOTAL_DATA,
  SET_REDEEM_CODE,
} from "./produkTypes";

export const setRedeemCode = (payload) => {
  return {
    type: SET_REDEEM_CODE,
    payload,
  };
};

export const getRedeemCode = (payload) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setRedeemCode(defaultInitState));
      const urlBase = getState().initReducer.baseUrl;
      console.log(urlBase + "/masterdata/v1/redeems/code");
      fetch(urlBase + "/masterdata/v1/redeems/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
        body: payload,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json, "jsssadas");
          if (json.status) {
            dispatch(setRedeemCode(defaultDoneState(json.message)));
          } else {
            dispatch(setRedeemCode(defaultFailedState(json.message)));
          }
        })
        .catch((err) => {
          console.log(err, "errr");
          dispatch(setRedeemCode(defaultErrorState));
        });
    });
  };
};

export function setGroupedProduk(state) {
  return {
    type: SET_GROUPED_PRODUK,
    payload: state,
  };
}

export function setTotalData(payload) {
  return {
    type: SET_TOTAL_DATA,
    payload,
  };
}
export function setLoadingDua(payload) {
  return {
    type: SET_LOADING_DUA,
    payload,
  };
}

export function getGroupedProduk() {
  return async (dispatch, getState) => {
    dispatch(setGroupedProduk(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlGroupedProduk, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setGroupedProduk(defaultDoneState(json.data)));
          } else dispatch(setGroupedProduk(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setGroupedProduk(defaultErrorState));
        });
    } catch (err) {
      console.log(err);
      dispatch(setGroupedProduk(defaultErrorState));
    }
  };
}

export function setAllProduk(state) {
  return {
    type: SET_ALL_PRODUK,
    payload: state,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function getAllProduk(section_id, page) {
  return async (dispatch, getState) => {
    console.log("ini jalan");
    if (page === 1) {
      dispatch(setAllProduk(defaultInitState));
    } else dispatch(setLoading(true));
    try {
      const urlBase = getState().initReducer.baseUrl;
      const product = getState().produkReducer.allProduk.data;
      console.log(product);
      console.log(urlBase + urlGroupedProduk + `/${section_id}?page=${page}`);
      fetch(urlBase + urlGroupedProduk + `/${section_id}?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          dispatch(setTotalData(json.includes.total));
          if (json.status) {
            if (page > 1) dispatch(setLoadingDua(true));
            if (page === 1) {
              dispatch(setAllProduk(defaultDoneState(json.data)));
              dispatch(setLoading(false));
            } else if (json.data !== null) {
              dispatch(
                setAllProduk(defaultDoneState([...product, ...json.data]))
              );
            } else {
              dispatch(setLoading(false));
            }
          } else dispatch(setAllProduk(defaultDoneState(product)));
          dispatch(setLoading(false));
          setTimeout(() => {
            dispatch(setLoading(false));
            dispatch(setLoadingDua(false));
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          dispatch(setAllProduk(defaultErrorState));
          setTimeout(() => {
            dispatch(setLoading(false));
            dispatch(setLoadingDua(false));
          }, 1000);
        });
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        dispatch(setLoading(false));
        dispatch(setLoadingDua(false));
      }, 1000);
      dispatch(setAllProduk(defaultErrorState));
      setLoading(false);
    }
  };
}

export function setTotalPurchasedProduk(state) {
  return {
    type: SET_TOTAL_PURCHASED_PRODUK,
    payload: state,
  };
}

export function getTotalPurchasedProduk(section_id) {
  return async (dispatch, getState) => {
    dispatch(setTotalPurchasedProduk(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlGroupedProduk + `/${section_id}/purchased/count`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(
              setTotalPurchasedProduk(defaultDoneState(json.data.total))
            );
          } else
            dispatch(setTotalPurchasedProduk(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setTotalPurchasedProduk(defaultErrorState));
        });
    } catch (err) {
      console.log(err, "<<<< err2");
      dispatch(setTotalPurchasedProduk(defaultErrorState));
    }
  };
}

export function setPurchasedProduk(state) {
  return {
    type: SET_PURCHASED_PRODUK,
    payload: state,
  };
}

export function getPurchasedproduk(section_id) {
  console.log("Start getting purchased produk");
  return async (dispatch, getState) => {
    dispatch(setPurchasedProduk(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlGroupedProduk + `/${section_id}/purchased`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status) {
            dispatch(setPurchasedProduk(defaultDoneState(json.data)));
          } else dispatch(setPurchasedProduk(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setPurchasedProduk(defaultErrorState));
        });
    } catch (err) {
      console.log(err);
      dispatch(setPurchasedProduk(defaultErrorState));
    }
  };
}

export function setIncludesProduk(state) {
  return {
    type: SET_INCLUDES_PRODUK,
    payload: state,
  };
}

export function getIncludesProduk(produkId) {
  return async (dispatch, getState) => {
    dispatch(setIncludesProduk(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlGroupedProduk + `/${produkId}/include`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getState().authReducer.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status) {
            dispatch(setIncludesProduk(defaultDoneState(json.data)));
          } else dispatch(setIncludesProduk(defaultFailedState(json.message)));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setIncludesProduk(defaultErrorState));
        });
    } catch (err) {
      console.log(err);
      dispatch(setIncludesProduk(defaultErrorState));
    }
  };
}

export function setSearchProductTitle(payload) {
  return {
    type: SET_SEARCH_PRODUCT_TITLE,
    payload,
  };
}

export function getSearchProductTitle(payload) {
  return async (dispatch, getState) => {
    dispatch(setSearchProductTitle(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase + "/masterdata/v1/search/product?q=" + payload,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().authReducer.token}`,
          },
        }
      );
      const result = await response.json();
      if (result.status)
        dispatch(setSearchProductTitle(defaultDoneState(result.data)));
      else dispatch(setSearchProductTitle(defaultFailedState(result.message)));
    } catch (err) {
      console.log(err);
      dispatch(setSearchProductTitle(defaultErrorState));
    }
  };
}
