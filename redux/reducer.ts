import { createStore, AnyAction } from "redux";
import { actionTypes } from "./actions";
import { HYDRATE } from "next-redux-wrapper";

export interface IState {
  userInfo: any;
  loading: boolean;
  isAdmin: boolean;
}
const initialState: IState = {
  userInfo: null,
  loading: false,
  isAdmin: false,
};

function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case actionTypes.SET_USERINFO:
      return { ...state, userInfo: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.AUTH_ADMIN:
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
}

export default reducer;
