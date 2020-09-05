import axios from "axios";

import { AUTH_START, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from "./types";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = token => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/accounts/login", { username, password })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        checkAuthTimeout(3600);
      })
      .catch(err => {
        dispatch(authError(err));
      });
  };
};

export const authSignup = (username, email, password, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("/accounts/login/registration", {
        username,
        email,
        password,
        password2,
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        checkAuthTimeout(3600);
      })
      .catch(err => {
        dispatch(authError(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
