import { ADD_TO_CART } from "../utils/const";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});
