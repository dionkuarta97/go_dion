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

const initialState = {
  loading: false,
  loadingDua: false,
  groupedProduk: {
    loading: false,
    error: null,
    data: null,
  },
  allProduk: {
    loading: false,
    error: null,
    data: null,
  },
  totalPurchasedProduk: {
    loading: false,
    error: null,
    data: null,
  },
  purchasedProduk: {
    loading: false,
    error: null,
    data: null,
  },
  includesProduk: {
    loading: false,
    error: null,
    data: null,
  },
  resultSearchProduct: {
    loading: false,
    error: null,
    data: null,
  },
  redeemCode: {
    loading: false,
    error: null,
    data: null,
  },
  totalData: null,
};

export function produkReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPED_PRODUK:
      return {
        ...state,
        groupedProduk: action.payload,
      };
    case SET_ALL_PRODUK:
      return {
        ...state,
        allProduk: action.payload,
      };
    case SET_TOTAL_PURCHASED_PRODUK:
      return {
        ...state,
        totalPurchasedProduk: action.payload,
      };
    case SET_PURCHASED_PRODUK:
      return {
        ...state,
        purchasedProduk: action.payload,
      };
    case SET_INCLUDES_PRODUK:
      return {
        ...state,
        includesProduk: action.payload,
      };
    case SET_SEARCH_PRODUCT_TITLE:
      return {
        ...state,
        resultSearchProduct: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_DUA:
      return {
        ...state,
        loadingDua: action.payload,
      };
    case SET_TOTAL_DATA:
      return { ...state, totalData: action.payload };
    case SET_REDEEM_CODE:
      return { ...state, redeemCode: action.payload };
    default:
      return state;
  }
}
