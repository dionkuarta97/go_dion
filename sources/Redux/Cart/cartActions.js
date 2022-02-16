import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./cartTypes";

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
