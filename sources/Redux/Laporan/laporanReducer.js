import {
  SET_CHART_TRYOUT,
  SET_DETAIL_TRYOUT,
  SET_LIST_TRYOUT,
  SET_PRODI,
  SET_TYPE_TRYOUT,
} from "./LaporanType";

const initialState = {
  typeTryout: {
    data: null,
    loading: false,
    error: null,
  },
  listTryout: {
    data: null,
    loading: false,
    error: null,
  },
  chartTryout: {
    data: null,
    loading: false,
    error: null,
  },
  detailTryout: {
    data: null,
    loading: false,
    error: null,
  },
  prodi: 1,
};

export function laporanReducer(state = initialState, action) {
  if (action.type === SET_TYPE_TRYOUT) {
    return { ...state, typeTryout: action.payload };
  } else if (action.type === SET_LIST_TRYOUT) {
    return { ...state, listTryout: action.payload };
  } else if (action.type === SET_CHART_TRYOUT) {
    return { ...state, chartTryout: action.payload };
  } else if (action.type === SET_PRODI) {
    return { ...state, prodi: action.payload };
  } else if (SET_DETAIL_TRYOUT === action.type) {
    return { ...state, detailTryout: action.payload };
  }
  return state;
}
