import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../utils/actions";

export const createProduct = (title, imageUrl, price, description) => ({
  type: CREATE_PRODUCT,
  product: {
    title,
    imageUrl,
    price,
    description,
  },
});

export const updateProduct = (id, title, imageUrl, description) => ({
  type: UPDATE_PRODUCT,
  pId: id,
  product: {
    title,
    imageUrl,
    description,
  },
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});
