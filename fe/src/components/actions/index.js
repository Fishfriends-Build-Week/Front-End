import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// import { getQueriesForElement } from '@testing-library/react';

import { apiSwitcher } from '../../utils/apiSwitcher';
const API = apiSwitcher();

// export const APP_UPDATE = "APP_UPDATE";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const SET_UPDATED_USER_FLAG = "SET_UPDATED_USER_FLAG";

export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const LOGOUT = "LOGOUT";


// //I really don't think there's any need for this. Paul
// export const updateApp = (username) => dispatch => {
//     console.log(`actions: updateApp -> username`, username);

//     if (!username) {
//       username = JSON.stringify(localStorage.getItem("username"), 10);
//     }

//     if (username) {
//       getUser(username);
//       const updates = {loggedIn, username};
//       dispatch({ type: APP_UPDATE, payload: updates});
//     }
// };

export const register = (credentials) => dispatch => {
    console.log(`actions: register -> credentials`, credentials);
    dispatch({ type: REGISTER_START });
    axios
    .post(
        API+"/accounts/register",
        credentials
    )
    .then(res => {
        console.log(res);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        getUser(res.data.username);
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: REGISTER_FAIL, payload: err});
    });
};

export const login = (credentials) => dispatch => {
    console.log(`actions: login -> credentials`, credentials);
    dispatch({type: LOGIN_START});
    axios
    .post(API+"/accounts/login", credentials)
    .then(res => {
        console.log(`actions: login -> response`, res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response}));
};

export const getUser = (username) => dispatch => {
    console.log(`actions: getUser -> username`, username);
    dispatch({ type: FETCH_USER_START });
    axiosWithAuth()
    .get(`accounts/${username}`)
    .then(res => {
        console.log("GET USER: ", res);
        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
        console.log(err.response);
        dispatch({ type: FETCH_USER_FAIL, payload: err });
    });
};

// export const getUserAccounts = () => dispatch => {
//     console.log(`actions: getUserAccounts`);
//     dispatch({ type: FETCH_USER_ACCOUNT_START });
//     axiosWithAuth()
//     .get(`/accounts/username`)
//     .then(res => {
//         dispatch({ type: FETCH_USER_ACCOUNT_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//         dispatch({ type: FETCH_USER_ACCOUNT_FAIL, payload: err.message });
//     });
// };

export const updateUser = (username, updateUser) => dispatch => {
    console.log(`actions: updateUser -> username`, username);
    dispatch({ type: UPDATE_USER_START });
    
    axiosWithAuth()
    .put(`/accounts/${username}`, {username, ...updateUser })
    .then(res => {
        console.log(res);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
        setTimeout(() => {
            dispatch(setUpdatedUserFlag(false));
        }, 6000);
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: UPDATE_USER_FAIL, payload: err.message });
    });
};

export const setUpdatedUserFlag = (flag) => dispatch => {
    console.log(`actions: setUpdatedUserFlag -> flag`, flag);
    dispatch({ type: SET_UPDATED_USER_FLAG, payload: flag });
};

export const deleteUser = (username) => dispatch => {
    console.log(`actions: deleteUser -> username`, username);
    dispatch({ type: DELETE_USER_START});

    axiosWithAuth()
    .delete(`/accounts/${username}`)
    .then(res => {
        console.log(res);
        dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: DELETE_USER_FAIL, payload: err });
    });
};

export const logout = () => dispatch => {
    console.log(`actions: logout`);
    dispatch({ type: LOGOUT });
    window.location.href = '/';
};