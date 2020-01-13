import {
  RESET_ERROR_STATE,
  SET_ERROR_STATE,

  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,

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

  API_ACTION_START,
  API_ACTION_SUCCESS,
  API_ACTION_FAIL,

  LOGS_DATA,
  LOCATIONS_DATA,
  BAIT_DATA,
  FISH_DATA,

  LOGOUT
} from "../actions";

export const initialState = {
  isLoading: false,
  isError: false,
  errors: {},

  isRegistering: false,
  registered: false,
  isRegisterError: false,
  registerError: "",

  isLoggingIn: false,
  loggedIn: false,
  isLoginError: false,
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
  deleteError: '',

  logsData: [],
  locationsData: [],
  baitData: [],
  fishData: []
};

export const reducer = (state = initialState, action) => {
  console.log(`reducer -> action`, action);
  console.log(`reducer -> state`, state);

  switch (action.type) {
    case RESET_ERROR_STATE:
      return { ...state,
        isSubmitting: false,
        isLoading: false,
        isError: false,
        errors: {},
        isLoggingIn: false,
        isLoginError: false,
        loginError: "",
        isRegistering: false,
        isRegisterError: false,
        registerError: ""
      };
    case SET_ERROR_STATE:
      return { ...state,
        isSubmitting: action.payload.isSubmitting,
        isLoading: action.payload.isLoading,
        isError: action.payload.isError,
        errors: { ...state.errors,
          passwordError: action.payload.errors.passwordError
        },
        isLoggingIn: action.payload.isLoggingIn,
        isLoginError: action.payload.isLoginError,
        loginError: action.payload.loginError,
        isRegistering: action.payload.isRegistering,
        isRegisterError: action.payload.isRegisterError,
        registerError: action.payload.registerError
      };

    case REGISTER_START:
      return { ...state,
        isLoading: true,
        isRegistering: true,
        registered: false,
        isRegisterError: false,
        registerError: ""
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.loginInfo.username);
      return { ...state,
        isLoading: false,
        isRegistering: false,
        registered: true
      };
    case REGISTER_FAIL:
      return { ...state,
        isLoading: false,
        isRegistering: false,
        isRegisterError: true,
        registerError: action.payload
      };

    case LOGIN_START:
      return { ...state,
        isLoading: true,
        isLoggingIn: true,
        isLoginError: false,
        loginError: ""
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      let id = action.payload.loginInfo.account_id;
      localStorage.setItem("account_id", id);

      // Force the username first letter to Upper Case
      let u = action.payload.loginInfo.username;
      u = u.slice(0,1).toUpperCase() + u.slice(1);

      localStorage.setItem("username", u);

      return { ...state,
        isLoading: false,
        isLoggingIn: false,
        loggedIn: true,
        loginInfo: { ...state.loginInfo,
          account_id: id,
          username: u,
          password: action.payload.loginInfo.password
        }
      };
    case LOGIN_FAIL:
      return { ...state,
        isLoading: false,
        isLoggingIn: false,
        isLoginError: true,
        loginError: action.payload
      };

    case FETCH_USER_START:
      return { ...state,
        isLoading: true,
        isFetchingUser: true,
        fetchUserError: ""
      };
    case FETCH_USER_SUCCESS:
      return { ...state,
        isLoading: false,
        isFetchingUser: false,
        loginInfo: {
          ...action.payload
        }
      };
    case FETCH_USER_FAIL:
      return { ...state,
        isLoading: false,
        isFetchingUser: false,
        fetchUserError: action.payload
      };

    case FETCH_USERS_START:
      return { ...state,
        isLoading: true,
        isFetchingUser: true,
        fetchUserError: ""
      };
    case FETCH_USERS_SUCCESS:
      return { ...state,
        isLoading: false,
        isFetchingUser: false,
        loginInfo: {
          ...action.payload
        }
      };
    case FETCH_USERS_FAIL:
      return { ...state,
        isLoading: false,
        isFetchingUser: false,
        fetchUserError: action.payload
      };

    case API_ACTION_START:
      return { ...state,
        isLoading: true,
        isError: false,
        errors: {}
      };
    case API_ACTION_SUCCESS:
      return { ...state, isLoading: false };
    case API_ACTION_FAIL:
      return { ...state,
        isLoading: false,
        isError: true,
        errors: action.payload
      };

    case LOGS_DATA:
      return { ...state, logsData: action.payload };
    case LOCATIONS_DATA:
      return { ...state, locationsData: action.payload };
    case BAIT_DATA:
      return { ...state, baitData: action.payload };
    case FISH_DATA:
      return { ...state, fishData: action.payload };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("account_id");
      localStorage.removeItem("username");

      return { ...state, loggedIn: false };

    default:
      return state;
  };
};
