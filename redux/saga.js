import axios from "axios";
import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { actionTypes, setUserInfo } from "./actions";

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(false));
    yield delay(1000);
  }
}

function* logout() {
  try {
    const res = yield axios.post("/logout");
    yield put(setUserInfo(null));
  } catch (err) {
    console.log(err);
  }
}

function* login(url) {
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
