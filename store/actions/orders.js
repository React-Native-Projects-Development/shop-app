import { ADD_ORDER } from "../utils/actions";

export const addOrder = (cartItems, totalAmount) => ({
  type: ADD_ORDER,
  orderData: {
    items: cartItems,
    amount: totalAmount,
  },
});
