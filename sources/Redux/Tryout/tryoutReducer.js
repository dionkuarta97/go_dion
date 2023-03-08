import { SET_GO_TRYOUT } from "./tryoutTypes";

const initialState = {
  tryoutData: {
    data: null,
    error: null,
    loading: false,
  },
  detailTryout: {
    data: null,
    error: null,
    loading: false,
  },
};

function tryoutReducer(state = initialState, action) {
  if (action.type === SET_GO_TRYOUT) {
    return { ...state, tryoutData: action.payload };
  }
  return state;
}

export default tryoutReducer;
