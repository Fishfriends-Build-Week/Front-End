import {
  APP_UPDATE,
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL
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
    case FETCH_USER_START:
      return { ...state, isFetchingUser: true, fetchUserError: "" };
    case FETCH_USER_FAIL:
      return {
        ...state,
        isFetchingUser: false,
        fetchUserError: action.payload
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        user: {
          ...action.payload
        }
      };

    case REGISTER_START:
      return { ...state, isRegistering: true, registerError: ""};
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return { ...state, isRegistering: false, loggedIn: true };
    case REGISTER_FAIL:
      return { ...state, isRegistering: false, registerError: action.payload };

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
