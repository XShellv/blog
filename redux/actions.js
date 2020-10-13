export const actionTypes = {
  SET_USERINFO: "SET_USERINFO",
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN",
  SET_LOADING: "SET_LOADING",
  AUTH_ADMIN: "AUTH_ADMIN",
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function setUserInfo(data) {
  return { type: actionTypes.SET_USERINFO, payload: data };
}

export function authAdmin(data) {
  return { type: actionTypes.AUTH_ADMIN, payload: data };
}

export function setLoading(data) {
  return { type: actionTypes.SET_LOADING, payload: data };
}

export function logout(url) {
  return { type: actionTypes.LOGOUT, payload: url };
}

export function login(url) {
  return { type: actionTypes.LOGIN, url };
}

// export function tickClock(isServer) {
//   return {
//     type: actionTypes.TICK_CLOCK,
//     light: !isServer,
//     ts: Date.now(),
//   };
// }
