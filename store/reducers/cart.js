import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
  DELETE_PRODUCT,
} from "../utils/actions";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          pushToken,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          pushToken,
          productPrice
        );
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items }; // we clone the existing items
        delete updatedCartItems[action.productId]; // this will delete the item (which would be a property within the 'items' object)
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.productId].sum;
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
