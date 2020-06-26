import { ADD_TO_CART } from "../utils/actions";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});
