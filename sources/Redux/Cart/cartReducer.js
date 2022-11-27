import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_CARTS,
} from "./cartTypes";

const initialState = {
  cart: [],
  carts: {
    data: null,
    error: null,
    loading: false,
  },
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((val) => val._id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case SET_CARTS:
      return {
        ...state,
        carts: action.payload,
      };
    default:
      return state;
  }
}
