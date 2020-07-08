import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
} from "../utils/actions";
import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shop-app-73043.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      // send to custom analytics server
      throw error;
    }
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    // any async code you want!

    try {
      const response = await fetch(
        "https://rn-shop-app-73043.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
          }),
        }
      );

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        product: {
          id: resData.name,
          title,
          imageUrl,
          price,
          description,
        },
      });
    } catch (error) {}
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    try {
      await fetch(
        `https://rn-shop-app-73043.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );
      dispatch({
        type: UPDATE_PRODUCT,
        pId: id,
        product: {
          title,
          imageUrl,
          description,
        },
      });
    } catch (error) {}
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      await fetch(
        `https://rn-shop-app-73043.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE",
        }
      );

      dispatch({
        type: DELETE_PRODUCT,
        productId,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
