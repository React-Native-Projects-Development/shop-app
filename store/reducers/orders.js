import { ADD_ORDER } from "../utils/actions";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder), // adds a new item to an array and returns a new array that includes this item. this makes the state immutable because we are generating a new array.
      };
    default:
      return state;
  }
};
