import {
  APP_UPDATE,
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS
} from "../actions";

export const initialState = {
  isLoggingIn: false,
  loggedIn: false,
  loginError: "",
  userData: {}
};

export const reducer = (state = initialState, action) => {
  console.log("reducer action:", action);
  console.log("reducer state:", state);

  switch (action.type) {
    case APP_UPDATE:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        userData: { ...state.user,
          // account_id: action.payload.account_id,
          username: action.payload.username }
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return { ...state, loggedIn: false };
    case LOGIN_FAIL:
      return { ...state, loginError: action.payload, isLoggingIn: false };
    case LOGIN_START:
      return { ...state, isLoggingIn: true, loginError: "" };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("id", action.payload.user.account_id);
      localStorage.setItem("username", action.payload.user.username);
      return {
        ...state,
        isLoggingIn: false,
        loggedIn: true,
        userData: {
          ...state.user,
          // account_id: action.payload.user.account_id,
          username: action.payload.user.username
        }
      }; //TODO: Set user data from payload.
    default:
      return state;
  }
};
