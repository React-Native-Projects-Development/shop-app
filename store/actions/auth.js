import { SIGN_UP, LOG_IN } from "../utils/actions";

const token = "AIzaSyCkGQ2Rmz9qes7ahh-qO8-dXLdvIl-xGcU";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${token}
`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: SIGN_UP });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email not found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Password does not match!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: LOG_IN });
  };
};
