import { DELETE_PRODUCT } from "../utils/actions";

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});
