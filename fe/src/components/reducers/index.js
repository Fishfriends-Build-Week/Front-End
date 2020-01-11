import {
  // APP_UPDATE,

  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,

  // UPDATE_USER_START,
  // UPDATE_USER_SUCCESS,
  // UPDATE_USER_FAIL,
  
  // SET_UPDATED_USER_FLAG,
  
  // DELETE_USER_START,
  // DELETE_USER_SUCCESS,
  // DELETE_USER_FAIL,

  LOGOUT
} from "../actions";

export const initialState = {
  isLoading: false,
  error: "",

  isRegistering: false,
  registerError: '',

  isLoggingIn: false,
  loggedIn: false,
  loginError: "",

  // userAccount: [
  //   {
  //     id:1,
  //     username:'CountryBoi87',
  //     location: 'Florida Georgia Line',
  //     favBait: 'Spinner jig',
  //     tagLine: 'Fish on!!!',
  //     topFish: '8lbs 2oz'
  //   }
  // ],
  loginInfo: {
    account_id: -1,
    username: '',
    password: ''
  },

  isFetchingUser: false,
  fetchUserError: '',

  isUpdatingUser: false,
  updateUserError: '',
  updateUser: false,

  isDeleting: false,
  deleteError: ''
};

export const reducer = (state = initialState, action) => {
  console.log(`reducer -> action`, action);
  console.log(`reducer -> state`, state);

  switch (action.type) {
    case REGISTER_START:
      return { ...state, isRegistering: true, registerError: ""};
    case REGISTER_SUCCESS:
      localStorage.setItem("username", action.payload.user.username);
      return { ...state, isRegistering: false, loggedIn: true };
    case REGISTER_FAIL:
      return { ...state, isRegistering: false, registerError: action.payload };

    case LOGIN_START:
      return { ...state, isLoggingIn: true, loginError: "" };
    case LOGIN_SUCCESS:
      

      let id = action.payload.loginInfo.account_id;
      localStorage.setItem("account_id", id);

      // Force the username first letter to Upper Case
      let u = action.payload.loginInfo.username;
      u = u.slice(0,1).toUpperCase() + u.slice(1);

      localStorage.setItem("username", u);

      return {
        ...state,
        isLoggingIn: false,
        loggedIn: true,
        loginInfo: {
          ...state.loginInfo,
          account_id: id,
          username: u
        }
      };
    case LOGIN_FAIL:
      return { ...state, loginError: action.payload, isLoggingIn: false };

    case FETCH_USER_START:
      return { ...state, isFetchingUser: true, fetchUserError: "" };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        loginInfo: {
          ...action.payload
        }
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        isFetchingUser: false,
        fetchUserError: action.payload
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("account_id");
      localStorage.removeItem("username");

      return { ...state, loggedIn: false };

    default:
      return state;
  }
};
