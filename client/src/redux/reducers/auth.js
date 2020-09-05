import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
} from "../actions/types";

import { updateObject } from "../store/utility.js";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
  });
};
const authError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
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
