import { SIGN_UP } from "../utils/actions";

export const signup = (email, password) => {
  const token = "AIzaSyCkGQ2Rmz9qes7ahh-qO8-dXLdvIl-xGcU";
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
      throw new Error("Something went wrong...");
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: SIGN_UP });
  };
};
