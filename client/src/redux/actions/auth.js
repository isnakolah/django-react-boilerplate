import axios from "axios";

import { AUTH_START, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from "./types";

const authSuccessResponse = (res, dispatch) => {
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("expirationDate", expirationDate);
  dispatch(authSuccess(res));
  checkAuthTimeout(3600);
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = res => {
  return {
    type: AUTH_SUCCESS,
    token: res.data.token,
    payload: res.data,
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => dispatch => {
  // Dispatch the auth start
  dispatch(authStart());
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      authSuccessResponse(res, dispatch);
    })
    .catch(err => {
      dispatch(authError(err));
    });
};

// Register User
export const authRegister = (username, email, password) => dispatch => {
  dispatch(authStart());
  const body = JSON.stringify({ username, email, password });
  console.log(body);

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      authSuccessResponse(res, dispatch);
    })
    .catch(err => {
      dispatch(authError(err));
    });
};

export const authLogout = () => (dispatch, getState) => {
  axios.post("/api/auth/logout/", null, tokenConfig(getState)).then(res => {
    dispatch(logout());
  });
};

export const authCheckState = () => (dispatch, getState) => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    dispatch(authLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(authLogout());
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
