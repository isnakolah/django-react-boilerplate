import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from "../actions/types";

import { updateObject } from "../store/utility.js";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  error: null,
  loading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const authStart = state => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = state => {
  return updateObject(state, {
    token: localStorage.getItem("token"),
    error: null,
    loading: false,
    isAuthenticated: true,
  });
};
const authError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isAuthenticated: false,
  });
};
const authLogout = state => {
  localStorage.removeItem("token");
  return updateObject(state, {
    token: null,
    isAuthenticated: false,
  });
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_ERROR:
      return authError(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
}
