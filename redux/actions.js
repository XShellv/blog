export const actionTypes = {
  SET_USERINFO: "SET_USERINFO",
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN",
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

export function logout() {
  return { type: actionTypes.LOGOUT };
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
