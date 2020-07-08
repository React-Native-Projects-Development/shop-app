import { LOG_IN, SIGN_UP } from "../utils/actions";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
