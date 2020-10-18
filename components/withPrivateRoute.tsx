import React from "react";
import Router from "next/router";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { IState } from "redux/reducer";
import Error from "../pages/error";
import { setStatus } from "redux/actions";

const WithPrivateRoute = (WrappedComponent: any) => {
  const hocComponent: NextPage = ({ ...props }) => {
    const { userInfo, isAdmin } = useSelector((state: IState) => state);
    return <WrappedComponent {...props} />
    // return isAdmin ? (
    //   <WrappedComponent {...props} />
    // ) : (
    //   <Error statusCode={404} />
    // );
  };

  hocComponent.getInitialProps = async (ctx) => {
    const { store } = ctx;
    const { isAdmin } = store.getState();
    if (WrappedComponent.getInitialProps && isAdmin) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return { ...wrappedProps };
    } else {
      ctx.store.dispatch(setStatus(404));
    }
  };

  return hocComponent;
};

export default WithPrivateRoute;
