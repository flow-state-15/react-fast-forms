import { csrfFetch } from "./csrf";

const SET = "session/setUser";
const REMOVE = "session/removeUser";

export const actionSetUser = (user) => ({
  type: SET,
  user,
});

export const actionRemoveUser = () => ({ type: REMOVE });

export const login = (user) => async (dispatch, getState) => {
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (res.ok) {
    const { user } = await res.json();
    dispatch(actionSetUser(user));
  } else return res;
};

export const signup = (user) => async (dispatch, getState) => {
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (res.ok) {
    const { user } = await res.json();
    dispatch(actionSetUser(user));
  } else return res;
};

export const logout = () => async (dispatch, getState) => {
  const res = await csrfFetch("/api/session", { method: "DELETE" });

  if (res.ok) {
    dispatch(actionRemoveUser());
  } else return res;
};

export const thunkRestoreUser = () => async (dispatch, getState) => {
  const res = await csrfFetch("/api/session");
  const { user } = await res.json();
  dispatch(actionSetUser(user));
};

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET:
      return { ...state, user: action.user };
    case REMOVE:
      return { ...state, user: null };
    default:
      return state;
  }
}
