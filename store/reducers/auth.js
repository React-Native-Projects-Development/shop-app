import { AUTHENTICATE } from "../utils/actions";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
