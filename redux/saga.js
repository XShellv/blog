import axios from "axios";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { actionTypes, authAdmin, setUserInfo } from "./actions";

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(false));
    yield delay(1000);
  }
}

function* logout(data) {
  try {
    const res = yield axios.get(`/logout?url=${data.payload}`);
    yield put(authAdmin(false));
  } catch (err) {
    console.log(err);
  }
}

function* login() {
  try {
    const res = yield axios.get("/prepare-auth");
    yield put(setUserInfo(null));
  } catch (err) {
    console.log(err);
  }
}

function* rootSaga() {
  yield takeEvery(actionTypes.LOGOUT, logout);
  yield takeEvery(actionTypes.LOGIN, login);
}

export default rootSaga;
