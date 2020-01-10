import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { getQueriesForElement } from '@testing-library/react';

export const APP_UPDATE = "APP_UPDATE";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";

export const FETCH_USER_ACCOUNT_START = "FETCH_USER_ACCOUNT_START";
export const FETCH_USER_ACCOUNT_SUCCESS = "FETCH_USER_ACCOUNT_SUCCESS";
export const FETCH_USER_ACCOUNT_FAIL = "FETCH_USER_ACCOUNT_SUCCESS";

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const SET_UPDATED_USER_FLAG = "SET_UPDATED_USER_FLAG";

export const login = credentials => dispatch => {
    dispatch({type: LOGIN_START});
    console.log("Starting login... for: ", credentials);
    axios
    .post("https://fish-friends-build-week.herokuapp.com/accounts/login", credentials)
    .then(res => {
        console.log('LOGIN RESPONSE', res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.response}));
};

export const deleteUser = username => dispatch => {
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

export const setUpdatedUserFlag = flag => dispatch => {
    dispatch({ type: SET_UPDATED_USER_FLAG, payload: flag });
};

export const register = credentials => dispatch => {
    dispatch({ type: REGISTER_START });

    axios
    .post(
        "https://fish-friends-build-week.herokuapp.com/accounts/register",
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

export const getUserAccounts = () => dispatch => {
    dispatch({ type: FETCH_USER_ACCOUNT_START });
    axiosWithAuth()
    .get(`/accounts/usename`)
    .then(res => {
        dispatch({ type: FETCH_USER_ACCOUNT_SUCCESS, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: FETCH_USER_ACCOUNT_FAIL, payload: err.message });
    });
};

export const getUser = username => dispatch => {
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

export const updateApp = () => dispatch => {
    const loggedIn = localStorage.getItem("token") ? true : false;
    const username = JSON.stringify(localStorage.getItem("username"), 10);
    dispatch(getUser(username));
    const updates = {loggedIn, username};
    dispatch({ type: APP_UPDATE, payload: updates});
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT});
};

export const updateUser = (username, updateUser) => dispatch => {
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